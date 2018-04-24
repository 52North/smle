import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { configPromise } from './app/configuration';
import { ingestionConfigPromise } from './app/ingestion/ingestion.config.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Promise.all([configPromise, ingestionConfigPromise]).then((config: any) => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
