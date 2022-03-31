import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  isDevMode,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  animationFrameScheduler,
  BehaviorSubject,
  isObservable,
  merge,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs'
import { debounceTime, observeOn, share } from 'rxjs/operators'

const subscription = Symbol('subscription')
const props = Symbol('props')
const pharkas = Symbol('pharkas meta')

interface PharkasInput<T> {
  type: 'input'
  name: string
  next: (obs: T | Observable<T>) => void
  observable: Observable<T>
}

interface PharkasDisplay<T> {
  type: 'display'
  name: string
  subject: BehaviorSubject<T>
  observable: Observable<T>
  immediate: boolean
}

interface PharkasCallback<T> {
  type: 'callback'
  name: string
  subject: Subject<T>
  observable: Observable<T>
}

type PharkasProp<T> = PharkasInput<T> | PharkasDisplay<T> | PharkasCallback<T>

interface PharkasMeta {
  templateError: boolean
  immediateTemplateError: boolean
  effectError: boolean
}

function bindSubject<T>(observable: Observable<T>, subject: Subject<T>) {
  // Zone's monkey patching of RxJS breaks the obvious binding (observable.subscribe(subject))
  // as RxJS doesn't think it "safe" so we need to do this the hard way to support migrating
  // out of Zone apps
  return observable.subscribe({
    next: (value: T) => subject.next(value),
    error: (err: any) => subject.error(err),
    complete: () => subject.complete(),
  })
}

function bindInputSubject<T>(
  name: string,
  observable: Observable<T>,
  subject: Subject<T>,
  isRebound: boolean
) {
  // Input behavior should be a merge, and inputs should not likely complete in the lifespan
  // of the component, so ignore (but warn) input observable completion
  return observable.subscribe({
    next: (value: T) => subject.next(value),
    error: (err: any) => subject.error(err),
    complete: () => {
      if (isDevMode() && !isRebound) {
        console.warn(`Input ${name} completed`)
      }
    },
  })
}

function bindTemplateSubject<T>(
  name: string,
  observable: Observable<T>,
  subject: Subject<T>
) {
  // Template behavior should ignore errors because throwing errors in template variable getters
  // causes Angular to just give up and fallbacks like `pharkasTemplateStopped` don't work.
  // Because we already have fallbacks like `pharkasTemplateStopped` we can just ignore errors
  // now. Because the general warning doesn't know which specific template variables are
  // affected, we can add specific warnings here.
  return observable.subscribe({
    next: (value: T) => subject.next(value),
    error: (err: any) => {
      if (isDevMode()) {
        console.warn(`Template binding ${name} error`, err)
      }
      // do nothing
    },
    complete: () => {
      if (isDevMode()) {
        console.warn(`Template binding ${name} completed`)
      }
      subject.complete()
    },
  })
}

/**
 * Pharkas Base Component
 *
 * PharkasComponent is a base component for "Observables only" zone-free,
 * AsyncPipe-free, auto-subscription managing components. It takes some
 * inspirations from ReactiveUI (.NET) and React's Hook components.
 */
@Component({
  template: '⚠ Base Component Template',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PharkasComponent<TViewModel> implements OnInit, OnDestroy {
  private [subscription] = new Subscription()
  private [props]: Map<keyof TViewModel, PharkasProp<unknown>> = new Map()
  private [pharkas]: PharkasMeta = {
    effectError: false,
    immediateTemplateError: false,
    templateError: false,
  }

  //#region *** Blinkenlights ***

  /**
   * An error has been observed in any observable applied to `bind`, `bindImmediate`,
   * `bindEffect`, or `bindEffectImmediate`.
   */
  public get pharkasError() {
    return (
      this[pharkas].templateError ||
      this[pharkas].immediateTemplateError ||
      this[pharkas].effectError
    )
  }
  /**
   * An error has been observed in any observable applied to `bindEffect` or
   * `bindEffectImmediate`.
   */
  public get pharkasEffectError() {
    return this[pharkas].effectError
  }
  /**
   * An error has been observed in any observable applied to `bind`. Change detection
   * has *stopped* for all `bind` bound template observables.
   */
  public get pharkasTemplateStopped() {
    return this[pharkas].templateError
  }
  /**
   * An error has been observed in any observable applied to `bindImmediate`.
   */
  public get pharkasImmediateTemplateError() {
    return this[pharkas].immediateTemplateError
  }
  /**
   * An error has been observed in any observable applied to `bind` or `bindImmediate`.
   */
  public get pharkasTemplateError() {
    return this[pharkas].templateError || this[pharkas].immediateTemplateError
  }

  //#endregion

  constructor(private ref: ChangeDetectorRef) {}

  //#region *** Inputs ***

  private createInput<T, U extends T>(
    name: string,
    defaultValue?: U
  ): PharkasInput<T> {
    const subject = new ReplaySubject<T>(1)
    if (defaultValue !== undefined) {
      subject.next(defaultValue)
    }
    let bound = false
    return {
      type: 'input',
      name,
      next: (value: T | Observable<T>) => {
        if (bound && isDevMode()) {
          console.warn(
            `Rebound input ${name}; rebinding acts as a merge and may impact performance or indicate a mistake,
             if it changes it should be an observable and good observables don't change`
          )
        }
        if (isObservable(value)) {
          this[subscription].add(bindInputSubject(name, value, subject, bound))
        } else {
          subject.next(value)
        }
        bound = true
      },
      observable: subject.asObservable(),
    }
  }

  private getOrCreateInput<
    P extends keyof TViewModel,
    T extends TViewModel[P],
    U extends T extends Observable<infer V> ? V : T,
    TDefault extends U
  >(name: P, defaultValue?: TDefault): PharkasInput<U> {
    let input = this[props].get(name) as PharkasProp<U> | undefined
    if (input && input.type === 'input') {
      return input
    } else if (input) {
      throw new Error(`${name} is not an input: ${input.type}`)
    }
    input = this.createInput<U, TDefault>(name as string, defaultValue)
    this[props].set(name, input as PharkasInput<unknown>)
    return input
  }

  /**
   * Set an input value
   * @param name Name of input
   * @param value value
   */
  protected setInput<
    P extends keyof TViewModel,
    T extends TViewModel[P],
    U extends T extends Observable<infer V> ? V : T
  >(name: P, value: U | Observable<U>) {
    const prop = this[props].get(name)
    if (prop?.type === 'input') {
      prop.next(value)
    } else if (prop) {
      throw new Error(`Tried to setInput on a ${prop.type} property`)
    } else {
      console.warn(`Tried to set input on an uncreated input`)
    }
  }

  /**
   * Observe an `@Input()` built with `this.setInput`
   * @param name Name of input
   * @param defaultValue Default value
   * @returns Observable
   */
  protected useInput<
    P extends keyof TViewModel,
    T extends TViewModel[P],
    U extends T extends Observable<infer V> ? V : T,
    TDefault extends U
  >(name: P, defaultValue?: TDefault): Observable<U> {
    const input = this.getOrCreateInput<P, T, U, TDefault>(name, defaultValue)
    return input.observable
  }

  //#endregion

  //#region *** Display Bindings ***

  /**
   * Get the value of a bindable (template binding)
   * @param name Name of bindable
   * @returns value
   */
  protected bindable<T>(name: keyof TViewModel): T {
    const prop = this[props].get(name) as PharkasProp<T> | undefined
    if (prop?.type === 'display') {
      return prop.subject.value
    } else if (prop) {
      throw new Error(`${name} is bound as ${prop.type}`)
    }
    throw new Error(`Unbound ${name}`)
  }

  /**
   * Bind an observable to a bindable (template binding)
   *
   * Default bound observation is combined and throttled to requestAnimationFrame for smooth template updates.
   * @param name Name of bindable
   * @param observable Observable to bind to
   * @param defaultValue Default value
   */
  protected bind<P extends keyof TViewModel, T extends TViewModel[P]>(
    name: P,
    observable: Observable<T>,
    defaultValue: T
  ) {
    if (this[props].has(name)) {
      throw new Error(`${name} is already bound`)
    }
    const subject = new BehaviorSubject(defaultValue)
    this[subscription].add(
      bindTemplateSubject(name.toString(), observable, subject)
    )
    this[props].set(name, {
      type: 'display',
      name,
      subject,
      observable,
      immediate: false,
    } as PharkasProp<unknown>)
  }

  /**
   * Bind an observable immediately to a bindable (template binding)
   *
   * Immediate bindings are neither combined nor throttled.
   * @param name
   * @param observable
   * @param defaultValue
   */
  protected bindImmediate<P extends keyof TViewModel, T extends TViewModel[P]>(
    name: P,
    observable: Observable<T>,
    defaultValue: T
  ) {
    if (this[props].has(name)) {
      throw new Error(`${name} is already bound`)
    }
    const subject = new BehaviorSubject(defaultValue)
    this[subscription].add(
      bindTemplateSubject(name.toString(), observable, subject)
    )
    this[props].set(name, {
      type: 'display',
      name,
      subject,
      observable,
      immediate: true,
    } as PharkasProp<unknown>)
  }

  //#endregion

  /**
   * Bind an observable to an `@Output()`.
   * @param eventEmitter Output
   * @param observable Observable
   */
  protected bindOutput<T>(
    eventEmitter: EventEmitter<T>,
    observable: Observable<T>
  ) {
    this[subscription].add(bindSubject(observable, eventEmitter))
  }

  //#region *** Callbacks ***

  /**
   * Create a callback function
   * @param name Name of callback
   * @returns Callback function
   */
  protected createCallback<
    P extends keyof TViewModel,
    T extends TViewModel[P],
    U extends T extends (...args: infer V) => void ? T : never
  >(name: P): U {
    if (this[props].has(name)) {
      throw new Error(`${name} is already bound`)
    }
    const subject = new ReplaySubject(1)
    this[props].set(name, {
      type: 'callback',
      name,
      subject,
      observable: subject.asObservable(),
    } as PharkasProp<unknown>)
    return ((...args: any) => subject.next(args)) as U
  }

  /**
   * Get an observable of calls to the callback function
   * @param name Name of callback
   * @returns Observable
   */
  protected useCallback<
    P extends keyof TViewModel,
    T extends TViewModel[P],
    U extends T extends (...args: infer V) => void ? V : never
  >(name: P): Observable<U> {
    const prop = this[props].get(name) as PharkasProp<U>
    if (prop?.type === 'callback') {
      return prop.observable
    } else if (prop) {
      throw new Error(`${name} is bound as ${prop.type}`)
    }
    throw new Error(`Uncreated callback ${name}`)
  }

  //#endregion

  //#region *** Last Resort Side Effects ***

  /**
   * (Last Resort!) Bind an observable to a side effect
   *
   * **Does not** notify Angular of possible template binding changes. Does try to schedule to requestAnimationFrame.
   * @param observable Observable
   * @param effect Side effect
   */
  protected bindEffect<T>(
    observable: Observable<T>,
    effect: (item: T) => void
  ) {
    this[subscription].add(
      observable.pipe(observeOn(animationFrameScheduler)).subscribe({
        next: effect,
        error: (error: any) => {
          console.error('Error in effect observation', error)
          this[pharkas].effectError = true
          this.ref.detectChanges()
        },
        complete: () => {
          if (isDevMode()) {
            console.warn('Effect completed')
          }
        },
      })
    )
  }

  /**
   * (Truly the Last Resort!) Bind an observable immediately to a side effect
   *
   * **Does not** notify Angular of possible template binding changes.
   * @param observable Observable
   * @param effect Side effect
   */
  protected bindImmediateEffect<T>(
    observable: Observable<T>,
    effect: (item: T) => void
  ) {
    this[subscription].add(
      observable.subscribe({
        next: effect,
        error: (error: any) => {
          console.error('Error in effect observation', error)
          this[pharkas].effectError = true
          this.ref.detectChanges()
        },
        complete: () => {
          if (isDevMode()) {
            console.warn('Effect completed')
          }
        },
      })
    )
  }

  //#endregion

  ngOnInit(): void {
    const observables: Observable<unknown>[] = []
    for (const prop of this[props].values()) {
      if (prop.type === 'display') {
        if (prop.immediate) {
          this[subscription].add(
            prop.subject.subscribe({
              next: () => this.ref.detectChanges(),
              error: (error) => {
                console.error(
                  `Error in immediate template binding "${prop.name}"`,
                  error
                )
                this[pharkas].immediateTemplateError = true
                this.ref.detectChanges()
              },
              complete: () => {
                if (isDevMode()) {
                  console.warn(
                    `Immediate template binding "${prop.name}" completed`
                  )
                }
              },
            })
          )
        } else {
          observables.push(prop.subject.asObservable())
        }
      }
    }
    if (observables.length) {
      const displayObservable = merge(...observables).pipe(
        debounceTime(0, animationFrameScheduler),
        share()
      )
      this[subscription].add(
        displayObservable.subscribe({
          next: () => {
            this.ref.detectChanges()
          },
          error: (error: any) => {
            console.error('Error in template bindings', error)
            this[pharkas].templateError = true
            this.ref.detectChanges()
          },
          complete: () => {
            if (isDevMode()) {
              console.warn('Template bindings completed')
            }
          },
        })
      )
    }
  }

  ngOnDestroy() {
    this[subscription].unsubscribe()
  }
}
