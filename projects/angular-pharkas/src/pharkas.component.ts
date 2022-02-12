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
  isObservable,
  Observable,
  of,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs'
import { map, mergeAll, share, tap, throttleTime } from 'rxjs/operators'

const subscription = Symbol('subscription')
const props = Symbol('props')

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

  constructor(private ref: ChangeDetectorRef) {}

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

  /**
   * (Last Resort!) Bind an observable to a side effect
   *
   * **Does not** notify Angular of possible template binding changes
   * @param observable Observable
   * @param effect Side effect
   */
  protected bindEffect<T>(
    observable: Observable<T>,
    effect: (item: T) => void
  ) {
    this[subscription].add(
      observable.subscribe({
        next: effect,
      })
    )
  }

  /**
   * Wire the template (completes default bindings)
   * @returns Primary template display observable
   */
  protected wire() {
    const subjects: BehaviorSubject<unknown>[] = []
    const displays: Observable<unknown>[] = []
    for (const prop of this[props].values()) {
      if (prop.type == 'display' && !prop.immediate) {
        subjects.push(prop.subject)
        displays.push(prop.observable)
      }
    }
    if (displays.length) {
      const displayObservable = combineLatest(displays).pipe(
        map((values) => {
          for (let i = 0; i < values.length; i++) {
            subjects[i].next(values[i])
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
