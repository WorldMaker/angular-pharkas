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
  from,
  isObservable,
  merge,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs'
import { debounceTime, map, mergeAll, observeOn, share } from 'rxjs/operators'

const subscription = Symbol('subscription')
const props = Symbol('props')
const state = Symbol('state')
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

interface PharkasComponentState<T> extends Observable<T> {
  [pharkas]: boolean
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
  private [state]: WeakMap<
    PharkasComponentState<unknown>,
    BehaviorSubject<unknown>
  > = new WeakMap()

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
        bound = true
        if (isObservable(value)) {
          this[subscription].add(bindSubject(value, subject))
        } else {
          subject.next(value)
        }
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
    this[subscription].add(bindSubject(observable, subject))
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
    this[subscription].add(bindSubject(observable, subject))
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
        error: (error: any) =>
          console.error('Error in effect observation', error),
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
        error: (error: any) =>
          console.error('Error in effect observation', error),
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
