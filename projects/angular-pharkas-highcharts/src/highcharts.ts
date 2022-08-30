import { InjectionToken } from '@angular/core'
import * as _Highcharts from 'highcharts'
import HighchartsStock from 'highcharts/modules/stock'

// ES Module imports are immutable proxies, so we need a mutable shallow clone
const H = {
  ..._Highcharts,
}
HighchartsStock(H)

export const Highcharts: typeof _Highcharts = H

export const HIGHCHARTS = new InjectionToken<typeof _Highcharts>('highcharts')
