# Angular-Pharkas-Leaflet

This library provides Angular base component for working with [Leaflet](https://leafletjs.com), based on
the [angular-pharkas](https://worldmaker.net/angular-pharkas) Component Framework.

It's benefits are:

- Zone free
  - `ChangeDetectionStrategy.OnPush` disables Angular's more active change detection which is unnecessary
    around vanilla controls like Leaflet
- Observable driven-ish
  - Leaflet itself is inescapably imperative, but this wrapper uses Observables for lifecycle which makes
    it easier to think in Observables when working with Leaflet
- Resize aware
  - Uses `ResizeObserver` to watch container size changes and notifies Leaflet, which is useful
    for smarter updating in complex reflowing CSS layouts such as CSS Grid

## Usage

Import `PharkasLeafletModule` and use `LeafletMapComponent` as a replacement base component like
`PharkasComponent`. The `this.useMap()` "hook" takes Leaflet options and returns and `Observable<LeafletMap>`.

A basic example:

```ts
@Component({
  // …
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyExampleComponent extends LeafletMapComponent<MyExampleComponent> {
  constructor(ref: ChangeDetectorRef, element: ElementRef) {
    super(ref, element)

    const exampleLayer = new L.GeoJSON()

    const map = this.useMap({
      layers: [exampleLayer],
    })
  }
}
```

An example of using a `bindEffect` with `combineLatest` to perform an imperative effect on the map based
on an input Observable:

```ts
@Component({
  // …
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyExampleComponent extends LeafletMapComponent<MyExampleComponent> {
  @Input() set zoomControlPosition(
    value: L.ControlPosition | Observable<L.ControlPosition>
  ) {
    this.setInput('zoomControlPosition', value)
  }

  constructor(ref: ChangeDetectorRef, element: ElementRef) {
    super(ref, element)

    const exampleLayer = new L.GeoJSON()

    const map = this.useMap({
      layers: [exampleLayer],
    })

    var zoomControlPosition = this.useInput('zoomControlPosition')

    this.bindEffect(
      combineLatest([zoomControlPosition, map]),
      ([position, map]) => {
        map.zoomControl.remove()
        L.control.zoom({ position }).addTo(map)
      }
    )
  }
}
```
