import { InjectionToken } from '@angular/core'
import * as HPrime from 'highcharts'
import HighchartsStock from 'highcharts/modules/stock'

// ES Module imports are immutable proxies, so we need a mutable shallow clone
const H = {
  ...HPrime,
}
HighchartsStock(H)

export const Highcharts = H

export const HIGHCHARTS = new InjectionToken<typeof Highcharts>('highcharts')
