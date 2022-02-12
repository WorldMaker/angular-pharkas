# Pharkas

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

I hate Angular and this library is my attempt to corral Angular into something honest, performant, and useful to work in. A lot of the
boilerplate here (versus say React Hooks) is entirely Angular's fault because it uses experimental decorators (which it shouldn't) and
because it does all that "compile-time" reflection and hates meta-programming. I've tried my best to keep the boilerplate and the type
safety as best as I can get it (in Typescript).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
