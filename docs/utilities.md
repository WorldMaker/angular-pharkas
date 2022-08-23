# Utilities

Small shared Observables in Angular wrapper tools.

# `observeResize`

The utility function `observeResize(element: ElementRef)` in the module `angular-pharkas/observe-resize`
takes an Angular `ElementRef` and returns an `Observable<ResizeObserverEntry[]>` from a `ResizeObserver`
attached to the DOM element of the given reference.

Despite having `Observer` in the name `ResizeObserver` just needs a light wrapper as an RxJS `Observable`.
