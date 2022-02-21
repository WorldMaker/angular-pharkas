# Guides

Further patterns, practices and how to information.

## Consuming Angular "Bi-Directional" `[()]` Input/Output Bindings

In Angular the `bag-in-box` template operator `[()]` is an easily deconstructed
short-hand for `[inputName]` and `(inputNameChanged)`. In a Pharkas component
the easiest pattern to follow is to split the shortcut syntax into its deconstructed
form and then use typical Pharkas bindings for the input and output separately.

Taking an example component such as:

```html
<example-component [(test)]="<need to bind this>"></example-component>
```

It is an easy split to:

```html
<example-component [test]="test" (testChange)="testChange"></example-component>
```

At which point you bind them as you would expect following the usual patterns:

```ts
@Component({
// …
  template: `<example-component [test]="test" (testChange)="handleTestChange"></example-component>`
})
export class MyExample extends PharkasComponent<MyExample> {
  get test { return this.bindable<string>('test') }
  handleTestChange: (value: string) => void

  constructor(ref: ChangeDetectorRef) {
    super(ref)

    this.handleTestChange = this.createCallback('handleTestChange')
    const testChange = this.useCallback('handleTestChange')

    const someObservable = combineLatest([testChange, /* … */]).pipe(
      map(([test], /* … */) => { /* … */ })
    )

    this.bind('test', someObservable)
  }
}
```

!> Something to watch out for here is that circular loop in binding `someObservable` and the
potential for accidental infinite loops. This isn't a Pharkas specific concern, but a
general concern of these bidirectional bindings in Angular that Pharkas makes much more
obvious.

## Creating an Angular "Bi-directional" `[()]` Input/Output Binding

?> _General advice:_ **Don't.** Beyond the general advice to try to avoid Angular Outputs anyway,
and focus on one-way data flows for sanity's sake, a specific need for a "bi-directional"
binding may imply that the observed state truly belongs somewhere else in the component
hierarchy. However, it is clear when migrating existing components that this API may
need to be maintained until a larger rewrite can better encapsulate data state in the
component hierarchy.

The pattern for creating an input and an output binding together (which can be used by the
"bag-in-box" binding template shortcut `[()]`) is the same as doing both individually with
the output having `Change` suffixed.

An extremely simple example:

```ts
@Component({
  // …
})
export class MyExample extends PharkasComponent<MyExample> {
  @Input() set test(value: string | Observable<string>) {
    this.setInput('test', value)
  }
  @Output() readonly testChange = EventEmitter()

  constructor(ref: ChangeDetectorRef) {
    super(ref)
    const test = this.useInput('test')
    this.bindOutput(this.testChange, test)
  }
}
```

!> Beware this is obviously a circular loop and dangerous. This is not Pharkas' fault, but
Angular's.
