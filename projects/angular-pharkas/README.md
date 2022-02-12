# Angular-Pharkas

> Pharkas, Freddy Pharkas. / Frontier Pharmacist bourgeoisie — The Ballad of Freddy Pharkas (Frontier Pharmacist)

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

## Code scaffolding

Run `ng generate component component-name --project angular-pharkas` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project angular-pharkas`.

> Note: Don't forget to add `--project angular-pharkas` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build angular-pharkas` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build angular-pharkas`, go to the dist folder `cd dist/angular-pharkas` and run `npm publish`.

## Running unit tests

Run `ng test angular-pharkas` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
