import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { PharkasBlurhashModule } from 'angular-pharkas-blurhash'
import { PharkasHighchartsModule } from 'angular-pharkas-highcharts'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PharkasTestChartComponent } from './pharkas-test-chart.component'
import { PharkasTestComponent } from './pharkas-test.component'

@NgModule({
  declarations: [AppComponent, PharkasTestComponent, PharkasTestChartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PharkasBlurhashModule,
    PharkasHighchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
