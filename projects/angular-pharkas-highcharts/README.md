# Angular-Pharkas-Highcharts

This library provides an Observable-First, Zone-Free wrapper for the Vanilla JS library
[Highcharts](https://www.highcharts.com). It is nearly a drop-in replacement for
[highcharts-angular](https://www.npmjs.com/package/highcharts-angular) built with the
[angular-pharkas](https://worldmaker.net/angular-pharkas) component framework.

It's key benefits are:

- `Observable<Highcharts.Options>` driven
  - Simpler API with no more "updateFlag" "bag-in-box" input/output compared to `highcharts-angular`
- Zone-Free
  - `ChangeDetectionStrategy.OnPush` tells Angular that it doesn't need to work to detect any template changes
    in this vanilla control (Highcharts knows what to do)
- Resize aware
  - Uses `ResizeObserver` to watch container size changes and notifies Highcharts, which is useful
    for smarter updating in complex reflowing CSS layouts such as CSS Grid

## The Inevitable Angular Compatibility Chart

| Library version | Supported Angular |
| --------------- | ----------------- |
| 3.0.0           | Angular 15        |
| <=2.0.1         | Angular 13        |

## Usage

Import `PharkasHighchartsModule` and use either `<pharkas-chart>` or `<pharkas-stockchart>` components
as needed.

Both components differ only in the Highcharts constructor function used (`chart()` and `stockChart()`
respectively) and otherwise share the same API:

```html
<pharkas-chart [options]="optionsObservable" [oneToOne]="false"></pharkas-chart>
```

`[options]` is required and must be an `Observable<Highcharts.Options>`. There is no other update signal,
the chart is refreshed on observations of new options.

`[oneToOne]` is optional and may be an `Observable<boolean>` or a one-time `boolean`. It defaults to `false`.

With respect to `highcharts-angular`: There is no `[(update)]` as everything is left to Observable
observation. `[constructorType]` was moved to the top-level choice of component name. There is no
`[chartCallback]` as everything in Highcharts can be accomplished in `Highcharts.Options` without an imperative
escape hatch. `[runOutsideAngular]` is unnecessary as `ChangeDetectionStrategy.OnPush` removes much of the need
for Angular's Zone. `[Highcharts]` is dependency injected, see below.

### Highcharts modules and defaults configuration

Additional Highcharts configuration may be done with Angular Dependency Injection. By default, these
components only install the Stock Charts module into Highcharts.

You can configure other modules and/or default options by using the `HIGHCHARTS` injection token.

For instance to install the drill-down module, somewhere in your app (likely in your app's root module):

```ts
import { HIGHCHARTS } from 'angular-pharkas-highcharts'
import * as Highcharts from 'highcharts'
import Drilldown from 'highcharts/modules/drilldown'
import StockChart from 'highcharts/modules/stock'

// ES Module imports are immutable proxies, so we need a mutable shallow clone
const H = {
  ...Highcharts,
}

Drilldown(H)
StockChart(H)

const highchartsProvider = { provide: HIGHCHARTS, useValue: H }
// add highchartsProvider to the providers: [] of your NgModule
```
