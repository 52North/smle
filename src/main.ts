import { Application } from './app/app';
import { APP_PROVIDERS } from './app/providers';
import { APP_DIRECTIVES } from './app/directives';
import * as browser from '@angular/platform-browser';
import * as browserDynamic from '@angular/platform-browser-dynamic';
import * as ngCore from '@angular/core';
import { APP_ROUTER_PROVIDERS } from './app/routes';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';


const APPLICATION_PROVIDERS = [
  ...HTTP_PROVIDERS,
  ...APP_ROUTER_PROVIDERS,
  ...FORM_PROVIDERS,
  ...APP_PROVIDERS,
  ngCore.provide(LocationStrategy, { useClass: HashLocationStrategy })
];

const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
  ...APP_DIRECTIVES
];

const APPLICATION_PIPES = [

];

if ('production' === ENV) {
  ngCore.enableProdMode();
//  APPLICATION_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS_PROD_MODE); // TODO check how to fix
} else {
  APPLICATION_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS);
}

export function main() {
  return browserDynamic.bootstrap(Application, [
    ...APPLICATION_PROVIDERS,
    ngCore.provide(ngCore.PLATFORM_DIRECTIVES, { useValue: APPLICATION_DIRECTIVES, multi: true }),
    ngCore.provide(ngCore.PLATFORM_PIPES, { useValue: APPLICATION_PIPES, multi: true })
  ]).catch((err: any) => console.error(err));
}

function bootstrapDomReady() {
  // bootstrap after document is ready
  return document.addEventListener('DOMContentLoaded', main);
}

if ('development' === ENV) {
  // activate hot module reload
  if (HMR) {
    if (document.readyState === 'complete') {
      main();
    } else {
      bootstrapDomReady();
    }
    module.hot.accept();
  } else {
    bootstrapDomReady();
  }
} else {
  bootstrapDomReady();
}
