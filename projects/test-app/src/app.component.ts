import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core'
import { timer } from 'rxjs'
import { map } from 'rxjs/operators'
import { PharkasComponent } from 'angular-pharkas'
import { Observable } from 'rxjs'
import { BlurhashDescription } from 'angular-pharkas-blurhash'
import { ModelService } from './model.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends PharkasComponent<AppComponent> {
  readonly testing = timer(0, 3).pipe(map((value) => `Testing ${value}`))
  readonly images: Observable<BlurhashDescription & { attribution: string }>
  get attribution() {
    return this.bindable<string>('attribution')
  }

  handleClick: (data: [MouseEvent]) => void

  constructor(ref: ChangeDetectorRef, service: ModelService) {
    super(ref)

    this.handleClick = this.createCallback('handleClick')

    const click = this.useCallback('handleClick')

    this.bindEffect(click, ([[mouseEvent]]) =>
      console.log('test component clicked', mouseEvent)
    )

    this.images = service.getImages().pipe(
      map((image) => ({
        ...image,
        width: '100%',
        height: 'auto',
        canvasHeight: image.canvasHeight ?? (image.height as number),
        canvasWidth: image.canvasWidth ?? (image.width as number),
      }))
    )
    this.bind(
      'attribution',
      this.images.pipe(map(({ attribution }) => attribution)),
      ''
    )
  }
}
