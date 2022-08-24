import { InjectionToken } from '@angular/core'
import * as H from 'highcharts'
import HighchartsStock from 'highcharts/modules/stock'

HighchartsStock(H)

export const Highcharts = H

export const HIGHCHARTS = new InjectionToken<typeof Highcharts>('highcharts')
