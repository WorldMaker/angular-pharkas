import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, scan, shareReplay } from 'rxjs/operators'
import { tag } from 'rxjs-spy/operators'

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

const alternativeNames = ['Abra', 'Bloop', 'Cat', 'Doge', 'Eek']

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private readonly alternatives: Observable<Map<string, number>>

  constructor() {
    // Model: a set of alternatives are being compared (by say price) and updates come in with regular adjustments
    this.alternatives = randomObservable.pipe(
      // a random price adjustment for a random alternatives
      map(
        (rnd) =>
          [
            alternativeNames[Math.floor(rnd * alternativeNames.length)],
            (Math.random() - 0.5) * 0.15,
          ] as const
      ),
      // update a combine map of all current "prices"
      scan((state, [name, adjustment]) => {
        const current = state.get(name) ?? 0.5
        const next = current + adjustment
        const clamped = Math.min(Math.max(next, 0), 1)
        return state.set(name, clamped)
      }, new Map(alternativeNames.map((name) => [name, 0.5]))),
      tag('alternatives-model'),
      shareReplay(1)
    )
  }

  getAlternatives() {
    return this.alternatives
  }
}
