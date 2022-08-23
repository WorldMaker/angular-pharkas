import { ElementRef } from '@angular/core'
import { Observable } from 'rxjs'

export function observeResize(element: ElementRef) {
  return new Observable<any[]>((observer) => {
    const resizeObserver = new ResizeObserver((entries) => {
      observer.next(entries)
    })

    resizeObserver.observe(element.nativeElement)

    return () => {
      if (resizeObserver) {
        resizeObserver.unobserve(element.nativeElement)
      }
    }
  })
}
