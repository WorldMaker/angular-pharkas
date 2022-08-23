import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
} from '@angular/core'
import { observeResize } from 'angular-pharkas/observe-resize'
import { PharkasComponent } from 'angular-pharkas'
import { Map as LeafletMap } from 'leaflet'
import { combineLatest, merge, Observable, of } from 'rxjs'
import { tag } from 'rxjs-spy/operators'
import { debounceTime, delay, shareReplay, switchMap } from 'rxjs/operators'

const setMap = Symbol('map state setter')
const mapState = Symbol('map state')

@Component({
  template: '⚠ Base Component Template',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeafletMapComponent<
  TViewModel extends LeafletMapComponent<TViewModel>
> extends PharkasComponent<TViewModel> {
  readonly [setMap]: (mapState: Observable<L.Map>) => void
  private readonly [mapState]: Observable<L.Map>
  private mapBound = false

  constructor(ref: ChangeDetectorRef, private element: ElementRef) {
    super(ref)

    this[setMap] = this.createCallback(setMap)
    this[mapState] = this.useCallback(setMap).pipe(
      switchMap(([map]) => map),
      tag('leaflet-map-state'),
      shareReplay(1)
    )

    const resize = combineLatest([
      this[mapState],
      merge(of([]).pipe(delay(3000 /* ms */)), observeResize(element)),
    ]).pipe(debounceTime(150 /* ms */))

    this.bindEffect(resize, ([mapInstance, entries]) => {
      mapInstance.invalidateSize()
      // HACK: The above doesn't always work because "size didn't change"; the below private call to what invalidateSize *should* do is not recommended long term
      ;(mapInstance as any)._onResize()
    })
  }

  protected useMap(options: L.MapOptions) {
    if (this.mapBound) {
      // This isn't strictly necessary, things should work right if multiple "useMap" calls happen, but it's a perf leak
      throw new Error('Map state is already set')
    }
    this.mapBound = true
    const map = new Observable<L.Map>((observer) => {
      const mapInstance = new LeafletMap(this.element.nativeElement, options)
      observer.next(mapInstance)
      return () => {
        mapInstance.remove()
      }
    })
    this[setMap](map)
    return this[mapState]
  }
}
