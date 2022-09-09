import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core'
import { PharkasComponent } from 'angular-pharkas'
import { decode } from 'blurhash'
import { combineLatest, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { BlurhashDescription } from './model'

// Default to 16x9 assuming most photos are "typical widescreen"
const defaultBlurhashCanvasWidth = 160
const defaultBlurhashCanvasHeight = 90

@Component({
  selector: 'pharkas-blurhash',
  template: `<div
    style="background-size: 100% 100%"
    [style.width]="widthStyle"
    [style.height]="heightStyle"
    [style.backgroundImage]="blurhashUrl"
  >
    <img
      loading="lazy"
      style="width: 100%; height: 100%; object-fit: cover;"
      [src]="imageSrc"
      [alt]="imageAlt"
    />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlurhashComponent extends PharkasComponent<BlurhashComponent> {
  @Input() set image(value: Observable<BlurhashDescription>) {
    this.setInput('image', value)
  }

  get imageSrc() {
    return this.bindable<string>('imageSrc')
  }
  get imageAlt() {
    return this.bindable<string>('imageAlt')
  }
  get widthStyle() {
    return this.bindable<string>('widthStyle')
  }
  get heightStyle() {
    return this.bindable<string>('heightStyle')
  }
  get blurhashUrl() {
    return this.bindable<string>('blurhashUrl')
  }

  constructor(ref: ChangeDetectorRef) {
    super(ref)

    const image = this.useInput('image')

    this.bind(
      'widthStyle',
      image.pipe(
        map(({ width }) => (typeof width === 'number' ? `${width}px` : width))
      ),
      '100%'
    )

    this.bind(
      'heightStyle',
      image.pipe(
        map(({ height }) =>
          typeof height === 'number' ? `${height}px` : height
        )
      ),
      '100%'
    )

    this.bind('imageSrc', image.pipe(map(({ imageSrc }) => imageSrc)), '')

    this.bind('imageAlt', image.pipe(map(({ imageAlt }) => imageAlt)), '')

    const blurhashUrl = image.pipe(
      switchMap((image) => {
        return new Observable<string>((observer) => {
          let blurhashCancelled = false
          let blurhashBlobUrl: string | undefined = undefined

          const width =
            image.canvasWidth ??
            (typeof image.width === 'number'
              ? image.width
              : defaultBlurhashCanvasWidth)
          const height =
            image.canvasHeight ??
            (typeof image.height === 'number'
              ? image.height
              : defaultBlurhashCanvasHeight)

          // decode hash
          const pixels = decode(
            image.blurhash,
            width,
            height,
            image.blurhashPunch ?? 1
          )

          // use a temporary canvas to create a blob from the decoded pixels
          // TODO: Is there a mimetype to go straight to blob?
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const context = canvas.getContext('2d')
          const imageData = context!.createImageData(width, height)
          imageData.data.set(pixels)
          context!.putImageData(imageData, 0, 0)
          canvas.toBlob((blob) => {
            if (!blob) {
              return
            }
            if (blurhashCancelled) {
              return
            }
            if (blurhashBlobUrl) {
              URL.revokeObjectURL(blurhashBlobUrl)
            }
            blurhashBlobUrl = URL.createObjectURL(blob)
            observer.next(`url("${blurhashBlobUrl}")`)
          })

          return () => {
            blurhashCancelled = true
            if (blurhashBlobUrl) {
              URL.revokeObjectURL(blurhashBlobUrl)
            }
          }
        })
      })
    )
    this.bind('blurhashUrl', blurhashUrl, '')
  }
}
