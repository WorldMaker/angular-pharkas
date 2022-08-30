import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core'
import { PharkasComponent } from 'angular-pharkas'
import * as Highcharts from 'highcharts'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { tag } from 'rxjs-spy/operators'
import { ModelService } from './model.service'

@Component({
  selector: 'app-pharkas-test-chart',
  template: `<pharkas-chart [options]="options"></pharkas-chart>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PharkasTestChartComponent extends PharkasComponent<PharkasTestChartComponent> {
  @Input() set alternatives(value: Observable<Map<string, number>>) {
    this.setInput('alternatives', value)
  }

  readonly options: Observable<Highcharts.Options>

  constructor(ref: ChangeDetectorRef, service: ModelService) {
    super(ref)

    const alternatives = this.useInput('alternatives', () =>
      service.getAlternatives()
    )

    // base chart options: Highcharts does some reference equality checks and mutations for optimizations,
    // so we start with a basic mutable instance, though we try to keep all mutation to the observable
    // that follows
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Alternatives',
      },
      xAxis: [
        {
          categories: ['Loading'],
        },
      ],
      yAxis: {
        max: 1,
        min: 0,
      },
      series: [
        {
          name: 'Alternatives',
          data: [],
        } as any,
      ],
    }

    this.options = alternatives.pipe(
      map((altsMap) => {
        // this is awkward because highcharts types are awkward and I'm too lazy to solve it currently
        ;(chartOptions.xAxis as any)[0].categories = [...altsMap.keys()]
        ;(chartOptions.series as any)[0].data = [...altsMap.values()]
        return chartOptions
      }),
      tag('alternatives-chart-options')
    )
  }
}
