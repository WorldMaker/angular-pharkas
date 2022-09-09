import { Injectable } from '@angular/core'
import { BlurhashDescription } from 'angular-pharkas-blurhash'
import { of } from 'rxjs'
import { concat } from 'rxjs'
import { Observable } from 'rxjs'
import { tag } from 'rxjs-spy/operators'
import {
  delay,
  distinctUntilChanged,
  filter,
  map,
  scan,
  shareReplay,
  switchMap,
} from 'rxjs/operators'
import { images } from './unsplash-examples'

// This is a crazy, intentionally cold observable that provides random numbers at random intervals
const randomObservable = new Observable<number>((observer) => {
  let done = false
  let timer: any
  const createRandomTimer = () =>
    setTimeout(() => {
      observer.next(Math.random())
      if (!done) {
        timer = createRandomTimer()
      }
    }, Math.random() * 1.5 /* s */ * 1000 /* ms */)
  timer = createRandomTimer()
  return () => {
    done = true
    clearTimeout(timer)
  }
})

const slowRandomObservable = new Observable<number>((observer) => {
  let done = false
  let timer: any
  const createRandomTimer = () =>
    setTimeout(() => {
      observer.next(Math.random())
      if (!done) {
        timer = createRandomTimer()
      }
    }, Math.random() * 15 /* s */ * 1000 /* ms */)
  timer = createRandomTimer()
  return () => {
    done = true
    clearTimeout(timer)
  }
})

const alternativeNames = ['Abra', 'Bloop', 'Cat', 'Doge', 'Eek']

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private readonly alternatives: Observable<Map<string, number>>
  private readonly images: Observable<
    BlurhashDescription & { attribution: string }
  >

  constructor() {
    // Model: a set of alternatives are being compared (by say price) and updates come in with regular adjustments
    this.alternatives = randomObservable.pipe(
      // a random price adjustment for a random alternatives, resembling almost a "stock ticker"
      map(
        (rnd) =>
          [
            alternativeNames[Math.floor(rnd * alternativeNames.length)],
            (Math.random() - 0.5) * 0.15,
          ] as const
      ),
      tag('alternatives-data'),
      // our model state is a combined map of all current "prices"
      scan((state, [name, adjustment]) => {
        const current = state.get(name) ?? 0.5
        const next = current + adjustment
        const clamped = Math.min(Math.max(next, 0), 1)
        return state.set(name, clamped)
      }, new Map(alternativeNames.map((name) => [name, 0.5]))),
      tag('alternatives-model'),
      shareReplay(1)
    )

    // Model: a random image is viewed over time, but sometimes the images are unavailable or load extremely slow
    this.images = slowRandomObservable.pipe(
      // pick a random image
      map((rnd) => images[Math.floor(rnd * images.length)]),
      distinctUntilChanged(),
      switchMap((image) => {
        switch (Math.floor(Math.random() * 3)) {
          case 0: // plain load
            return of(image)
          case 1: // unavailable
            return of({ ...image, imageSrc: '' })
          case 2: // slow load
          default:
            return concat(
              of({ ...image, imageSrc: '' }),
              of(image).pipe(delay(Math.random() * 10 /* s */ * 1000 /* ms */))
            )
        }
      }),
      tag('images-model'),
      shareReplay(1)
    )
  }

  getAlternatives() {
    return this.alternatives
  }

  getImages() {
    return this.images
  }
}
