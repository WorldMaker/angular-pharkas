import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core"
import { Observable } from "rxjs"
import { PharkasComponent } from "angular-pharkas"

@Component({
  selector: 'app-pharkas-test',
  template: `<p (click)="handleClick($event)">Hello {{ testDisplay }}</p>`
})
export class PharkasTestComponent extends PharkasComponent<PharkasTestComponent> {
  // *** Inputs ***
  @Input() set test(value: string | Observable<string>) { this.setInput('test', value) }

  // *** Outputs ***
  @Output() readonly mickey = new EventEmitter<[MouseEvent]>()

  // *** Template Bindings ***
  get testDisplay() { return this.bindable<string>('testDisplay') }
  get unboundDisplay() { return this.bindable<string>('unboundDisplay') }

  // *** Callbacks ***
  handleClick: (e: MouseEvent) => void

  constructor(ref: ChangeDetectorRef) {
    super(ref)

    // Show the test input in testDisplay
    const testInput = this.useInput('test')
    this.bind('testDisplay', testInput, 'World')

    // Bind DOM click to Output Mickey via callback handleClick
    this.handleClick = this.createCallback('handleClick')
    const click = this.useCallback('handleClick')
    this.bindOutput(this.mickey, click)

    // Dumb console log test of handleClick
    this.bindEffect(click, ([mouseEvent]) => console.log('clicked', mouseEvent))

    this.wire()

    console.log(this)
  }
}
