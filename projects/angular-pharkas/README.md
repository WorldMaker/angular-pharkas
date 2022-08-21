# Angular-Pharkas

> Pharkas, Freddy Pharkas. / Frontier Pharmacist bourgeoisie — The Ballad of Freddy Pharkas (Frontier Pharmacist)

It could stand for Powerful Hooks for Angular ReactiveX Components, Attributes, and States. It could, but it probably doesn’t.

The `angular-pharkas` library is a wild, frontier pharmacist approach to building Angular components, in that it is all about that RX:

- "Observable only"
  - No Subjects leaking out of this API!
  - No intentional imperative escape hatches
- Zone-free
  - Observables are already, always `push` no reason for any "change detection" strategy than "OnPush"
  - Zone-free means no need for `zone.js`: noop that bloated crud
- `AsyncPipe`-free
  - `AsyncPipe` is great, but who needs `| async` everywhere in your templates when that _should_ have been the default? It's especially
    unnecessary when "Observable only"
- Managed subscriptions
  - No `ngOnit` and `ngOnDestroy` dances, the last `ngOnDestroy` you'll ever need is the automatic one in the BaseComponent
  - "Smarter" subscriptions by default
    - Template binding change "pushes" are throttled to requestAnimationFrame for smooth as magic views

It is inspired by ReactiveUI (.NET), the Hooks of React, and rx-angular, but it is also none of those.

## The Inevitable Angular Compatibility Chart

| Pharkas version | Supported Angular |
| --------------- | ----------------- |
| 4.0.0           | Angular 13        |
| <=3.0.0         | Angular 11        |

## Start a Component

A basic empty component starts like this:

```ts
@Component({
  selector: 'app-my-example',
  template: 'Example Template', // or templateUrl or whatever
  // …
  // if in a mixed project with Zone.JS, you can be sure to tell Angular you don't need it
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
  constructor(ref: ChangeDetectorRef) {
    super(ref)
  }
}
```

The generic argument to `PharkasComponent` gives you type safe magic when you need to provide property names, and is a sign
of where the redundancies start to get good types and also fit inside Angular's box for how a component needs to look.

Need to pass the `ChangeDetectorRef` from Angular's DI because where we are going, we need no Zone.

## General Flow, Tips and Tricks

The general flow for a Pharkas-based component is (Create)/Use/Bind:

1. Create a resource, if necessary
2. Use that resource to get an observable of changes to it
3. Bind observables to resources that need to observe them

Create isn't always needed, many "use hooks" will create things implicitly.

In general:

- If everything is Observable throwing `$` on everything is tedious
  - This probably isn't the right sort of saloon for throwing all those dollar bills around, partner
- If it changes, it should be an observable
- If it needs to update the view somehow, it needs to bind to something
  - But also, not all binds update the view
- The more words in a Pharkas function the more of an edge case it is intended to serve, try the "defaults" first
- Observables, observables, observables; stop the escape hatches!
- Avoid using `this` as much as possible
- Use `readonly` for Observables or other template bindings that should not change

## Angular Inputs

The Angular Input pattern, for anything and everything that might possibly move or change:

```ts
@Component({
  // …
})
export class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
  @Input() set testInput(value: Observable<string>) {
    this.setInput('testInput', value)
  }

  constructor(ref: ChangeDetectorRef) {
    super(ref)

    const testInput = this.useInput('testInput', 'Hello World')

    // Use testInput to build observable pipelines…
  }
}
```

Inputs are `set` only, no `get`. To use the input you must use `useInput` to get an Observable. No imperative escape
hatch here!

Good Inputs themselves are Observable of changes and you should encourage your consumers to also use Observables. Also
good Observables shouldn't be bound more than once and you'll see a warning in the console in Dev Builds if a consumer
does that.

But sometimes you need backward compatibility with older consuming components and `setInput` has your back also
supporting that if you need it:

```ts
export class … {
  @Input() set testInput(value: string | Observable<string>) {
    this.setValue('testInput', value)
  }
}
```

It will give you console warnings in development builds for non-Observable inputs.

Also, yeah the string property names and duplication isn't great, but we are working with what Angular gives us.

## Template Bindings (View Variables, Display Slots, Whatever You Call Them)

The template binding pattern:

```ts
@Component({
  // …
})
export class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
  get testDisplay() {
    return this.bindable<string>('testDisplay')
  }

  constructor(ref: ChangeDetectorRef) {
    super(ref)

    // Build some observables…

    this.bind('testDisplay', someObservable, 'Default Value')
  }
}
```

This pattern, like Inputs, needs a bunch of redundant property names, sorry.

Template variables are `get` only. Set them by binding an Observable to them.

**Don't** use the getter imperatively in your own code. You bound the observable, observe the
Observable.

### "Smart" Bindings By Default

By default many Pharkas bindings are scheduled around `requestAnimationFrame`. This helps
give smoother feeling performance, and avoids Angular's `detectChanges()` work and rerendering
templates faster than the browser can possibly render them.

Some things you may need to make sure get to the DOM ASAP, such as user inputs when strongly
managing the DOM. (If you were to build a "push" alternative to Angular's ReactiveForms,
for instance.) In such cases there are "Immediate" variants of bindings. You may not need them,
and the defaults should do what you need in most cases.

### Error Blinkenlights

Pharkas provides a set of blinkenlights (lights intended to blink a status) for very basic error
status indication. These are "last chance error reporting" blinkenlights for generic error
situations when any observable provided to `bind` or `bindEffect` or an "Immediate" variant of
such has thrown an error.

It is encouraged to move error detection and avoidance strategies such as retries up into your
observable pipelines themselves, but sometimes you need a last chance way to detect that the
worst has happened, the component may be stopped/stuck, and in that case render some sort of
frowny face 😟.

## Callbacks

Callbacks are very useful for everything from consuming output bindings of other Angular controls to
events from non-Angular components to stashing local state in an easy to call to update manner.

The callback pattern:

```ts
@Component({
  // …
})
export class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
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
```

Note that callbacks on their own do not update view state. Only binding an observable downstream
somewhere to a template binding/display property will do that.

## "Last Resort" Side Effects

When all else fails and you absolutely must subscribe to do a side effect:

```ts
this.bindEffect(observable, (value) => {
  /* side effect */
})
```

`bindEffect` is a last resort when you absolutely must subscribe a side effect to something.
It's an escape from the comfy observable management of Pharkas. (Though not a true escape
to imperative code either, Pharkas still manages the subscription on your behalf and any
escape hatches you build on the class with effects are your problem to manage, Pharkas is
still not leaking RxJS Subjects here.)

`bindEffect` does not call Angular change detection on its own, and you may need to do it
manually, but don't do that, figure out out move that stuff to `bindable` and observables
you can `bind` instead.

## Angular Outputs

The Angular Output pattern:

```ts
@Component({
  // …
})
export class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
  @Output() readonly testOutput = new EventEmitter<string>()

  constructor(ref: ChangeDetectorRef) {
    super(ref)

    // Build some observables…

    this.bindOutput(this.testOutput, someObservable)
  }
}
```

`EventEmitter<T>` is the only class Angular supports for outputs. It is an _awful_ class, leaking `BehaviorSubject<T>` APIs
and is an inescapable imperative escape hatch that shouldn't exist in the core of the framework, much less be the only way
to do this, but here we are.

Don't use the `EventEmitter<T>` directly, **ever**. Only use `this.bindOutput()`.

`readonly` is a useful Typescript type hint to keep us from doing _some_ stupid things with it such as breaking our bindings,
at least.
