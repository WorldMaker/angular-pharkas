import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Observable } from 'rxjs'
import { PharkasComponent } from 'angular-pharkas'
import { scan } from 'rxjs/operators'

@Component({
  selector: 'app-pharkas-test',
  template: `<div
    class="notification"
    (click)="handleClick($event)"
    [class.is-warning]="highlighted"
  >
    Hello {{ testDisplay }}
  </div>`,
})
export class PharkasTestComponent extends PharkasComponent<PharkasTestComponent> {
  // *** Inputs ***

  @Input() set test(value: string | Observable<string>) {
    this.setInput('test', value)
  }

  // *** Outputs ***
  @Output() readonly mickey = new EventEmitter<[MouseEvent]>()

  // *** Template Bindings ***
  get testDisplay() {
    return this.bindable<string>('testDisplay')
  }
  get unboundDisplay() {
    return this.bindable<string>('unboundDisplay')
  }
  get highlighted() {
    return this.bindable<boolean>('highlighted')
  }

  // *** Callbacks ***
  handleClick: (e: MouseEvent) => void

  constructor(ref: ChangeDetectorRef) {
    super(ref)

    // Show the test input in testDisplay
    const testInput = this.useInput('test', 'World')
    this.bind('testDisplay', testInput, 'World')

    // Bind DOM click to Output Mickey via callback handleClick
    this.handleClick = this.createCallback('handleClick')
    const click = this.useCallback('handleClick')
    this.bindOutput(this.mickey, click)

    // Simple "state" logic to toggle a highlight on click
    this.bind(
      'highlighted',
      click.pipe(scan((acc) => !acc, false as boolean)),
      false
    )

    // Dumb console log test of handleClick
    this.bindEffect(click, ([mouseEvent]) => console.log('clicked', mouseEvent))

    console.log(this)
  }
}
