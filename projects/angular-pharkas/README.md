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
- If it changes, it should be an observable
- If it needs to update the view somehow, it needs to bind to something
  - But also, not all binds update the view
- The more words in a Pharkas function the more of an edge case it is intended to serve, try the "defaults" first
- Observables, observables, observables; stop the escape hatches!

## Angular Inputs

The Angular Input pattern:

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

## Angular Outputs

The Angular Output pattern:

```ts
@Component({
  // …
})
export class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
  @Output() readonly testOutput = EventEmitter<string>()

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

## Template Bindings (View Variables, Display Slots, Whatever You Call Them)

The template binding pattern:

```ts
@Component({
  // …
})
export class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
  get testDisplay { return this.bindable<string>('testDisplay') }

  constructor(ref: ChangeDetectorRef) {
    super(ref)

    // Build some observables…

    this.bind('testDisplay', someObservable, 'Default Value')
  }
}
```

This pattern, like Inputs, needs a bunch of redundant property names, sorry.

Template variables are `get` only. Set them by binding an Observable to them.

**Don't** use the getter imperatively in your own code. You bound the observable, use the Observable.

## Callbacks

The callback pattern:

```ts
@Component({
  // …
})
export class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
  // Type only, no implementation:
  testCallback: (e: MouseEvent, somethingElse: string) => void

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

## Local Component State

The basic local component state pattern:

```ts
@Component({
  // …
})
export class MyExampleComponent extends PharkasComponent<MyExampleComponent> {
  constructor(ref: ChangeDetectorRef) {
    super(ref)

    // Build an observable you need to use a local state

    // create the state observable
    const testState = this.useState('test')
    this.bindState(testState, someObservable)

    // Use the testState observable to build pipelines, eventually bind it to something…
  }
}
```

It's not a "real" component framework if it doesn't give you fancy state management tools. You
may not need "State observables" in real world, though! State observables can help with some
"tricky" use-before-defined pipelines, but in many cases you may be able to find simpler
observable pipelines and more direct `this.bind()` instead.

These local component state management tools are explicitly for locally manipulated state only.
(Binds will intentionally not work outside of the current component.) There is intentionally no
imperative escape hatch here like using a raw `BehaviorSubject<T>`.

In following the Create/Use/Bind pattern, note that binds occur after creation (implicitly via
`useState`), so beware the risk of creating circular bindings with infinite loops. In part this
is the reason for state observables to exist, where you have almost circular dependencies, but
not quite exactly circular dependencies.

Try a bind that takes a Reducer if you directly need the current state to make dependent states.

### "View" States

If you are binding a state directly to the view/template, for instance, for debugging there are
`this.useViewState()` calls that fit the `get` only `this.bindable()` pattern and serve as the
bind for those properties, saving you an additional bind (and, under the hood, saving you an
additional `BehaviorSubject<T>` in memory).

Note that a reliance on `this.useViewState()` may imply that the Observable should just be
`this.bind()` instead, without the overhead of intermediate "State" observables.

`useState` looks somewhat like React's, but unlike React because we have observables, changes to
state observables (via `bindState` and friends) do not trigger view updates. You'll get view
updates when you eventually bind to a template binding. `useViewState` however is such a bind
and all state changes will trigger Angular change detection checks.

### Dependent States

The "Reducer" set of binds take a reducer involving the current state, the current observation,
and returns the new state.

The "Reducer" binds are quite convenient and likely a strong reason intermediate "State observables"
may feel useful.

Keep in mind that any "Reducer" state bind you could also likely build as a more direct observable
pipeline with an RxJS scan operator.

#### `bindMultiStateReducer`

This is your "I need a redux-like" approach in a box. Merge an array of observables and reduce
them to a single state.

You may not need this, but it is a familiar looking hammer and their may be a lot of nails in
your domain.

As with all "state" logic, you can also just build similar pipelines with the right
combination/merge operators and a scan operator.

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
manually.

## "Smart" Bindings By Default

By default many Pharkas bindings are scheduled around `requestAnimationFrame`. This helps
give smoother feeling performance, and avoids Angular's `detectChanges()` work and rerendering
templates faster than the browser can possibly render them.

Some things you may need to make sure get to the DOM ASAP, such as user inputs when strongly
managing the DOM. (If you were to build a "push" alternative to Angular's ReactiveForms,
for instance.) In such cases there are "Immediate" variants of bindings. You may not need them,
and the defaults should do what you need in most cases.
