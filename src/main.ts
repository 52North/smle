/*
 * Providers provided by Angular
 */
import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import 'jquery';

const ENV_PROVIDERS: any[] = [];

if ('production' === process.env.ENV) {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {Application} from './app/app';
import {DescriptionRepository} from './app/services/DescriptionRepository';
import {InMemoryDescriptionRepository} from './app/services/InMemoryDescriptionRepository';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(Application, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(DescriptionRepository, { useClass: InMemoryDescriptionRepository }),
  ]).catch((err: any) => console.error(err));
});
