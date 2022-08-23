import { ChangeDetectorRef, ElementRef, Input } from '@angular/core'
import * as L from 'leaflet'
import { Observable, combineLatest } from 'rxjs'
import { LeafletMapComponent } from '../src/leaflet-map.component'

describe('works as documented in README', () => {
  it('constructs a basic example', () => {
    class MyExampleComponent extends LeafletMapComponent<MyExampleComponent> {
      constructor(ref: ChangeDetectorRef, element: ElementRef) {
        super(ref, element)

        const exampleLayer = new L.GeoJSON()

        const map = this.useMap({
          layers: [exampleLayer],
        })
      }
    }
    expect(MyExampleComponent).toBeDefined()
  })

  it('constructs an example with bindEffect', () => {
    class MyExampleComponent extends LeafletMapComponent<MyExampleComponent> {
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
    expect(MyExampleComponent).toBeDefined()
  })
})
