import { ChangeDetectorRef } from '@angular/core'
import { throwError } from 'rxjs'
import { PharkasComponent } from '../src/pharkas.component'

describe('blinkenlights work', () => {
  it('notifies on template error', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      get test() {
        return this.bindable<string>('test')
      }

      constructor(ref: ChangeDetectorRef) {
        super(ref)

        this.bindImmediate('test', throwError('Example Error'), 'Default Value')
      }
    }

    const exampleInstance = new MyExampleComponent(null!)
    exampleInstance.ngOnInit()

    // Template binding itself should still work otherwise Angular throws a fit
    expect(exampleInstance.test).toEqual('Default Value')
    expect(exampleInstance.pharkasTemplateError).toBeTruthy()

    exampleInstance.ngOnDestroy()
  })

  it('notifies on side effect error', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      constructor(ref: ChangeDetectorRef) {
        super(ref)

        const someObservable = throwError('Example Error')

        this.bindImmediateEffect(someObservable, (item) =>
          console.log('example side effect', item)
        )
      }
    }

    const exampleInstance = new MyExampleComponent(null!)
    exampleInstance.ngOnInit()

    expect(exampleInstance.pharkasEffectError).toBeTruthy()

    exampleInstance.ngOnDestroy()
  })
})
