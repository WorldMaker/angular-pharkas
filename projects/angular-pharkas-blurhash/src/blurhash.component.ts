import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core'
import { PharkasComponent } from 'angular-pharkas'
import { decode } from 'blurhash'
import { combineLatest, Observable } from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'

const inputDebounceTime = 100 /* ms */

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
      [src]="imageSrcView"
      [alt]="imageAltView"
    />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlurhashComponent extends PharkasComponent<BlurhashComponent> {
  @Input() set width(value: number | string | Observable<number | string>) {
    this.setInput('width', value)
  }
  @Input() set height(value: number | string | Observable<number | string>) {
    this.setInput('height', value)
  }
  @Input() set blurhash(value: string | Observable<string>) {
    this.setInput('blurhash', value)
  }
  @Input() set blurhashPunch(value: number | Observable<number>) {
    this.setInput('blurhashPunch', value)
  }
  @Input() set imageSrc(value: string | Observable<string>) {
    this.setInput('imageSrc', value)
  }
  @Input() set imageAlt(value: string | Observable<string>) {
    this.setInput('imageAlt', value)
  }

  get imageSrcView() {
    return this.bindable<string>('imageSrcView')
  }
  get imageAltView() {
    return this.bindable<string>('imageAltView')
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

    const width = this.useInput('width')

    this.bind(
      'widthStyle',
      width.pipe(
        map((width) => (typeof width === 'number' ? `${width}px` : width))
      ),
      '100%'
    )

    const height = this.useInput('height')

    this.bind(
      'heightStyle',
      height.pipe(
        map((height) => (typeof height === 'number' ? `${height}px` : height))
      ),
      '100%'
    )

    const imageSrc = this.useInput('imageSrc')
    this.bind('imageSrcView', imageSrc, '')

    const imageAlt = this.useInput('imageAlt')
    this.bind('imageAltView', imageAlt, '')

    const blurhash = this.useInput('blurhash')
    const blurhashPunch = this.useInput('blurhashPunch', 1)

    const blurhashUrl = combineLatest([
      blurhash,
      blurhashPunch,
      width,
      height,
    ]).pipe(
      debounceTime(inputDebounceTime),
      switchMap(([blurhash, punch, widthInput, heightInput]) => {
        return new Observable<string>((observer) => {
          let blurhashCancelled = false
          let blurhashBlobUrl: string | undefined = undefined

          const width =
            typeof widthInput === 'number'
              ? widthInput
              : defaultBlurhashCanvasWidth
          const height =
            typeof heightInput === 'number'
              ? heightInput
              : defaultBlurhashCanvasHeight

          // decode hash
          const pixels = decode(blurhash, width, height, punch)

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
            observer.complete()
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
