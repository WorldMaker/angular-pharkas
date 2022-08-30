import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { create } from 'rxjs-spy'

import { AppModule } from './app.module'
import { environment } from '../environments/environment'

if (environment.production) {
  enableProdMode()
}

// since this is a demo site for showing of RxJS flow, always enable rxjs-spy
// note that in a real app, you probably only want rxjs-spy enabled in debug builds
const spy = create()

platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZone: 'noop' })
  .catch((err: any) => console.error(err))
