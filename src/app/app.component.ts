import { ChangeDetectorRef, Component } from '@angular/core'
import { timer } from 'rxjs'
import { map } from 'rxjs/operators'
import { PharkasComponent } from 'angular-pharkas'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends PharkasComponent<AppComponent> {
  title = 'pharkas'
  testing = timer(0, 3).pipe(
    map(value => `Testing ${value}`)
  )

  handleClick: (data: [MouseEvent]) => void

  constructor(ref: ChangeDetectorRef) {
    super(ref)

    this.handleClick = this.createCallback('handleClick')

    const click = this.useCallback('handleClick')

    this.bindEffect(click, ([[mouseEvent]]) => console.log('test component clicked', mouseEvent))
  }
}
