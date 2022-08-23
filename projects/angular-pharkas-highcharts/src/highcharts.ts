import { InjectionToken } from '@angular/core'
import * as Highcharts from 'highcharts'
import HighchartsStock from 'highcharts/modules/stock'

HighchartsStock(Highcharts)

export default Highcharts

export const HIGHCHARTS = new InjectionToken<typeof Highcharts>('highcharts')
