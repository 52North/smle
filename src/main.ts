import { provide, enableProdMode } from 'angular2/core';
import { bootstrap, ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { Application } from './app/app';
import { APP_PROVIDERS } from './app/providers';

const ENV_PROVIDERS: any[] = [];

if ('production' === process.env.ENV) {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

import 'jquery';
import 'bootstrap-loader';

function main() {
  bootstrap(Application, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...APP_PROVIDERS
  ]).catch((err: any) => console.error(err));
}

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', main);

/*
 * Modified for using hot module reload
 */

// typescript lint error 'Cannot find name "module"' fix
declare let module: any;

// activate hot module reload
if (module.hot) {
  main();
  module.hot.accept();
}
