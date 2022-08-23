import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  Optional,
} from '@angular/core'
import { observeResize } from 'angular-pharkas/observe-resize'
import { PharkasComponent } from 'angular-pharkas'
import { combineLatest, merge, Observable, of } from 'rxjs'
import { debounceTime, delay, first, switchMap } from 'rxjs/operators'
import Highcharts, { HIGHCHARTS } from './highcharts'

@Component({
  selector: 'pharkas-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent extends PharkasComponent<ChartComponent> {
  @Input() set options(value: Observable<Highcharts.Options>) {
    this.setInput('options', value)
  }
  @Input() set oneToOne(value: boolean | Observable<boolean>) {
    this.setInput('oneToOne', value)
  }

  constructor(ref: ChangeDetectorRef, host: ElementRef, @Optional() @Inject(HIGHCHARTS) highcharts?: typeof Highcharts) {
    super(ref)

    const options = this.useInput('options')

    const chart = options.pipe(
      first(),
      switchMap((options) => {
        return new Observable<Highcharts.Chart>((observer) => {
          const chart: Highcharts.Chart = (highcharts ?? Highcharts).chart(
            host.nativeElement,
            options,
            (chart: Highcharts.Chart) => observer.next(chart)
          )
          return () => chart.destroy()
        })
      })
    )

    const resize = combineLatest([
      chart,
      merge(of([]).pipe(delay(3000 /* ms */)), observeResize(host)),
    ]).pipe(debounceTime(150 /* ms */))

    this.bindEffect(resize, ([chart]) => {
      chart.reflow()
    })

    const oneToOne = this.useInput('oneToOne', false)

    this.bindEffect(
      combineLatest([options, chart, oneToOne]),
      ([options, chart, oneToOne]) => {
        chart.update(options, true, oneToOne)
      }
    )
  }
}
