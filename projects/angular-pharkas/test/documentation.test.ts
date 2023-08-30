// *** Documentation Tests ***
// Test that the examples in the README and Guides work. If one of these tests breaks:
// 1. Update the documentation accordingly
// 2. Consider that a semver major break

import { ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core'
import { combineLatest, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { PharkasComponent } from '../src/pharkas.component'

describe('works as documented in README', () => {
  it('can subclass a basic empty component', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      constructor(ref: ChangeDetectorRef) {
        super(ref)
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
  })

  it('can have an input', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      @Input() set testInput(value: Observable<string>) {
        this.setInput('testInput', value)
      }

      constructor(ref: ChangeDetectorRef) {
        super(ref)

        const testInput = this.useInput('testInput')

        // Use testInput to build observable pipelines…
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
  })

  it('can have a fallback input', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      @Input() set testInput(value: string | Observable<string>) {
        this.setInput('testInput', value)
      }

      constructor(ref: ChangeDetectorRef) {
        super(ref)

        const testInput = this.useInput('testInput', 'Hello World')

        // Use testInput to build observable pipelines…
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
  })

  it('can have an input with service class default', () => {
    class SomeService {
      readonly getSomeObservable = jest.fn(() => of('Hello World'))
    }

    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      @Input() set testInput(value: Observable<string>) {
        this.setInput('testInput', value)
      }

      get test() {
        return this.bindable<string>('test')
      }

      constructor(ref: ChangeDetectorRef, service: SomeService) {
        super(ref)

        const testInput = this.useInput('testInput', () =>
          service.getSomeObservable()
        )

        this.bind('test', testInput, 'Default Value')
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const serviceInstance = new SomeService()
    const exampleInstance = new MyExampleComponent(null!, serviceInstance)
    expect(exampleInstance).toBeTruthy()

    exampleInstance.ngOnInit()

    expect(serviceInstance.getSomeObservable).toBeCalled()
    expect(exampleInstance.test).toEqual('Hello World')

    exampleInstance.ngOnDestroy()
  })

  it('can have a template binding', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      @Input() set testInput(value: string | Observable<string>) {
        this.setInput('testInput', value)
      }

      get testDisplay() {
        return this.bindable<string>('testDisplay')
      }

      constructor(ref: ChangeDetectorRef) {
        super(ref)

        const testInput = this.useInput('testInput', 'Hello World')

        this.bind('testDisplay', testInput, 'Default Value')
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
    expect(exampleInstance.testDisplay).toEqual('Hello World')
  })

  it('can have a suspense binding', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      constructor(ref: ChangeDetectorRef) {
        super(ref)

        const suspense = of(true)

        this.bindSuspense(suspense)
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
    expect(exampleInstance.pharkasSuspense).toBeTruthy()
  })

  it('can define a callback', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      // Type only, no implementation:
      readonly testCallback: (e: MouseEvent, somethingElse: string) => void

      constructor(ref: ChangeDetectorRef) {
        super(ref)

        // create the implementation
        this.testCallback = this.createCallback('testCallback')
        // get an observable of the callback calls: Observable<[MouseEvent, string]>
        const testCallback = this.useCallback('testCallback')

        // Use the observable to build pipelines, eventually bind it to something…
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
    expect(exampleInstance.testCallback).toBeDefined()
  })

  it('can bind a side effect', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      // Type only, no implementation:
      readonly testCallback: (e: MouseEvent, somethingElse: string) => void

      constructor(ref: ChangeDetectorRef) {
        super(ref)

        // create the implementation
        this.testCallback = this.createCallback('testCallback')
        // get an observable of the callback calls: Observable<[MouseEvent, string]>
        const testCallback = this.useCallback('testCallback')

        this.bindEffect(testCallback, ([e, somethingElse]) => {
          console.log('testCallback called', somethingElse, e)
        })
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
    expect(exampleInstance.testCallback).toBeDefined()
  })

  it('can have an output', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      @Output() readonly testOutput = new EventEmitter<string>()

      constructor(ref: ChangeDetectorRef) {
        super(ref)

        const someObservable = of('Testing')

        this.bindOutput(this.testOutput, someObservable)
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
    expect(exampleInstance.testOutput).toBeDefined()
  })
})

describe('works as documented in guides', () => {
  it('can handle bag in box sub-component as split input/output', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      get test() {
        return this.bindable<string>('test')
      }
      readonly handleTestChange: (value: string) => void

      constructor(ref: ChangeDetectorRef) {
        super(ref)

        this.handleTestChange = this.createCallback('handleTestChange')
        const testChange = this.useCallback('handleTestChange')

        const someObservable = combineLatest([testChange, of('Testing')]).pipe(
          map(([[test], testValue]) => {
            return `${testValue} ${test}`
          })
        )

        this.bind('test', someObservable, 'Default Value')
      }
    }

    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
    expect(exampleInstance.test).toEqual('Default Value')
    expect(exampleInstance.handleTestChange).toBeDefined()
  })

  it('can define bag in box input/output if absolutely necessary', () => {
    class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
      @Input() set test(value: string | Observable<string>) {
        this.setInput('test', value)
      }
      @Output() readonly testChange = new EventEmitter<string>()

      constructor(ref: ChangeDetectorRef) {
        super(ref)
        const test = this.useInput('test')
        this.bindOutput(this.testChange, test)
      }
    }
    expect(MyExampleComponent).toBeDefined()

    const exampleInstance = new MyExampleComponent(null!)
    expect(exampleInstance).toBeTruthy()
    expect(exampleInstance.testChange).toBeDefined()
  })
})
