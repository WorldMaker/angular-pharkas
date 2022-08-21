import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TestScheduler } from 'rxjs/testing'
import { PharkasComponent } from '../src/pharkas.component'

/**
 * Simple example Pharkas subcomponent with a single Input wired to a single template display bindable
 */
class SimpleTemplateComponent extends PharkasComponent<SimpleTemplateComponent> {
  /* @Input() */ set testInput(value: Observable<string>) {
    this.setInput('testInput', value)
  }

  get testDisplay() {
    return this.bindable<string>('testDisplay')
  }

  constructor() {
    super(null!) // For testing, don't bother with ChangeDetectorRef

    const testInput = this.useInput('testInput')
    this.bind('testDisplay', testInput, 'init')
  }
}

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected)
})

describe('template bindings', () => {
  it('binds at animation time', () => {
    testScheduler.run((helpers) => {
      // ;(helpers as any).animate('          ---x---x---x')
      const input = helpers!.cold<string>('a---d--b-c--')
      // const expectedResults = '            ---a---b---c'
      const expectedResults = 'c'

      const testComponent = new SimpleTemplateComponent()
      testComponent.testInput = input
      const templateOutput = testComponent.pharkasChangeNotifications.pipe(
        map(() => testComponent.testDisplay)
      )
      testComponent.ngOnInit()

      helpers.expectObservable(templateOutput).toBe(expectedResults)

      testComponent.ngOnDestroy()
    })
  })
})
