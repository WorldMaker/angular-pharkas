import { InjectionToken, NgModule } from '@angular/core'
import * as Highcharts from 'highcharts'
import { ChartComponent } from './chart.component'
import { StockChartComponent } from './stock-chart.component'

@NgModule({
  declarations: [ChartComponent, StockChartComponent],
  exports: [ChartComponent, StockChartComponent],
})
export class AngularPharkasHighchartsModule {}
