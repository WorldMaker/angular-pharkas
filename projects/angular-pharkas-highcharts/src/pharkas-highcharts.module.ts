import { NgModule } from '@angular/core'
import { ChartComponent } from './chart.component'
import { StockChartComponent } from './stock-chart.component'

@NgModule({
  declarations: [ChartComponent, StockChartComponent],
  exports: [ChartComponent, StockChartComponent],
})
export class PharkasHighchartsModule {}
