import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { configPromise } from './app/configuration';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Promise.all([configPromise]).then((config: any) => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
