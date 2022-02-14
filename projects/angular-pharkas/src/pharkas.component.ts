import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  isDevMode,
  OnDestroy,
} from '@angular/core'
import {
  animationFrameScheduler,
  BehaviorSubject,
  combineLatest,
  from,
  isObservable,
  Observable,
  of,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs'
import {
  map,
  mergeAll,
  share,
  subscribeOn,
  tap,
  throttleTime,
} from 'rxjs/operators'

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
  direct?: boolean // observable is direct from subject
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
export class PharkasComponent<TViewModel> implements OnDestroy {
  private [subscription] = new Subscription()
  private [props]: Map<keyof TViewModel, PharkasProp<unknown>> = new Map()
  private [state]: WeakMap<
    PharkasComponentState<unknown>,
    BehaviorSubject<unknown>
  > = new WeakMap()

  constructor(private ref: ChangeDetectorRef) {}

  //#region *** Inputs ***

  private createInput<T>(name: string): PharkasInput<T> {
    const subject = new ReplaySubject<Observable<T>>()
    let bound = false
    return {
      type: 'input',
      name,
      next: (value: T | Observable<T>) => {
        if (bound && isDevMode()) {
          console.warn(
            `Rebound input ${name}; rebinding acts as a merge may impact performance or indicate a mistake, good observables don't change`
          )
        }
        if (isObservable(value)) {
          bound = true
          subject.next(value)
        } else {
          if (isDevMode()) {
            console.warn(
              `Non-observable input to ${name}; consider using an Observable`
            )
          }
          subject.next(of(value))
        }
      },
      observable: subject.asObservable().pipe(mergeAll(), share()),
    }
  }

  private getOrCreateInput<T>(name: keyof TViewModel): PharkasInput<T> {
    let input = this[props].get(name) as PharkasProp<T> | undefined
    if (input && input.type === 'input') {
      return input
    } else if (input) {
      throw new Error(`${name} is not an input: ${input.type}`)
    }
    input = this.createInput<T>(name as string)
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
    const input = this.getOrCreateInput<U>(name)
    input.next(value)
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
    U extends T extends Observable<infer V> ? V : T
  >(name: P, defaultValue?: U): Observable<U> {
    if (this[props].has(name)) {
      const prop = this[props].get(name) as PharkasProp<U>
      if (prop.type == 'input') {
        if (isDevMode()) {
          console.warn(`Possible multiple uses of input ${name}`)
        }
        return (prop as PharkasInput<U>).observable
      } else {
        throw new Error(`${name} is not an input: ${prop.type}`)
      }
    }

    const input = this.createInput<U>(name as string)
    this[props].set(name, input as PharkasInput<unknown>)
    if (defaultValue !== undefined) {
      input.next(of(defaultValue))
    }
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
      observable
        .pipe(
          tap({
            next: () => this.ref.detectChanges(),
          })
        )
        .subscribe(subject)
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
    this[subscription].add(observable.subscribe(eventEmitter))
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
    const subject = new Subject()
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

  //#region *** Local Component State ***

  /**
   * Use a bit of local component state
   * @param defaultValue Default value
   * @returns State observable
   */
  protected useState<T>(defaultValue: T): PharkasComponentState<T> {
    const subject = new BehaviorSubject<T>(defaultValue)
    const observable = subject.asObservable() as PharkasComponentState<T>
    // using the meta symbol for "is bound yet"
    observable[pharkas] = false
    // stash the behavior subject for later binding; stash it locally only instead of in the observable to keep local state truly local
    this[state].set(observable, subject as BehaviorSubject<unknown>)
    return observable
  }

  /**
   * Use a bit of local component state that is also automatically bound to a view property
   *
   * Beware this may lead to imperative state leaks. It may indicate a place you don't need intermediate
   * state and can just bind an observable with a more direct `bind` than a `bindState`.
   * @param name
   * @param defaultValue
   */
  protected useViewState<P extends keyof TViewModel, T extends TViewModel[P]>(
    name: P,
    defaultValue: T
  ): PharkasComponentState<T> {
    if (this[props].has(name)) {
      throw new Error(`${name} is already bound`)
    }
    const localState = this.useState(defaultValue)
    this[props].set(name, {
      type: 'display',
      name,
      subject: this[state].get(localState)!,
      observable: localState,
      direct: true,
      immediate: false,
    } as PharkasProp<unknown>)
    return localState
  }

  /**
   * Use a bit of local component state that is also automatically immmediatedly bound to a view property
   *
   * Beware this may lead to imperative state leaks. It may indicate a place you don't need intermediate
   * state and can just bind an observable with a more direct `bind` than a `bindState`.
   * @param name
   * @param defaultValue
   */
  protected useImmediateViewState<
    P extends keyof TViewModel,
    T extends TViewModel[P]
  >(name: P, defaultValue: T): PharkasComponentState<T> {
    if (this[props].has(name)) {
      throw new Error(`${name} is already bound`)
    }
    const localState = this.useState(defaultValue)
    const subject = this[state].get(localState)!
    this[subscription].add(
      localState
        .pipe(
          tap({
            next: () => this.ref.detectChanges(),
          })
        )
        .subscribe(subject)
    )
    this[props].set(name, {
      type: 'display',
      name,
      subject,
      observable: localState,
      immediate: true,
    } as PharkasProp<unknown>)
    return localState
  }

  /**
   * Bind an observable to a State
   *
   * Beware of accidental circular bindings, consider `bindStateReducer` for dependent states
   * @param localState Local component state
   * @param observable Observable
   */
  protected bindState<T>(
    localState: PharkasComponentState<T>,
    observable: Observable<T>
  ) {
    if (localState[pharkas] && isDevMode()) {
      console.warn(
        'State is already bound; consider using bindMultiStateReducer instead'
      )
    }
    const subject = this[state].get(localState)
    if (subject) {
      this[subscription].add(observable.subscribe(subject))
      localState[pharkas] = true
    } else {
      throw new Error('Unknown local component state')
    }
  }

  /**
   * Bind an observable to a dependent State
   *
   * To help avoid circular bindings, provides a reduction from current state to dependent state
   * @param localState Local component state
   * @param observable Observable
   * @param reducer Reducer of current state, observed value to dependent state
   */
  protected bindStateReducer<T, U>(
    localState: PharkasComponentState<T>,
    observable: Observable<U>,
    reducer: (stateValue: T, obsValue: U) => T
  ) {
    if (localState[pharkas] && isDevMode()) {
      console.warn(
        'State is already bound; consider using a single bindMultiStateReducer instead'
      )
    }
    const subject = this[state].get(localState) as BehaviorSubject<T>
    if (subject) {
      this[subscription].add(
        observable
          .pipe(map((value) => reducer(subject.value, value)))
          .subscribe(subject)
      )
      localState[pharkas] = true
    } else {
      throw new Error('Unknown local component state')
    }
  }

  /**
   * Bind multiple observables to a reduced dependent local component state
   *
   * This is your "redux pattern". It's best to prefer to observe lots of small state rather than
   * one big ball of state, but here's the tool if you need it.
   * @param localState Local component state
   * @param observables Observables
   * @param reducer Reducer of current state, observed value to dependent state
   */
  protected bindMultiStateReducer<T, U>(
    localState: PharkasComponentState<T>,
    observables: Observable<U>[],
    reducer: (stateValue: T, obsValue: U) => T
  ) {
    if (localState[pharkas] && isDevMode()) {
      console.warn(
        'State is already bound; consider using bindMultiStateReducer instead'
      )
    }
    const subject = this[state].get(localState) as BehaviorSubject<T>
    if (subject) {
      this[subscription].add(
        from(observables)
          .pipe(
            mergeAll(),
            map((value) => reducer(subject.value, value))
          )
          .subscribe(subject)
      )
      localState[pharkas] = true
    } else {
      throw new Error('Unknown local component state')
    }
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
      observable.pipe(subscribeOn(animationFrameScheduler)).subscribe({
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

  /**
   * Wire the template (completes default bindings)
   * @returns Primary template display observable
   */
  protected wire() {
    const subjects: Array<BehaviorSubject<unknown> | null> = []
    const displays: Observable<unknown>[] = []
    for (const prop of this[props].values()) {
      if (prop.type == 'display' && !prop.immediate) {
        subjects.push(prop.direct ? null : prop.subject)
        displays.push(prop.observable)
      }
    }
    if (displays.length) {
      const displayObservable = combineLatest(displays).pipe(
        map((values) => {
          for (let i = 0; i < values.length; i++) {
            subjects[i]?.next(values[i])
          }
          return values
        }),
        throttleTime(0, animationFrameScheduler),
        share()
      )
      this[subscription].add(
        displayObservable.subscribe({
          next: () => {
            this.ref.detectChanges()
          },
          error: (error: any) => {
            console.error('Error in template bindings', error)
            for (const subject of subjects) {
              if (subject) {
                subject.error(error)
              }
            }
          },
          complete: () => {
            if (isDevMode()) {
              console.warn('Template bindings completed')
            }
            for (const subject of subjects) {
              if (subject) {
                subject.complete()
              }
            }
          },
        })
      )
      return displayObservable
    }
    return of([])
  }

  ngOnDestroy() {
    this[subscription].unsubscribe()
  }
}
