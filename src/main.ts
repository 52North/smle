import { ReflectiveInjector, Injectable, OpaqueToken, Injector, NgModule } from '@angular/core';
import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';
import { getAppModule } from './app/app.module';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {
  Http, CookieXSRFStrategy, XSRFStrategy, RequestOptions, BaseRequestOptions,
  ResponseOptions, BaseResponseOptions, XHRBackend, BrowserXhr, Response
} from '@angular/http';


function getHttp(): Http {
  class NoopCookieXSRFStrategy extends CookieXSRFStrategy {
    configureRequest(request) { }
  }

  let providers = [
    {
      provide: Http, useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new Http(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    BrowserXhr,
    XHRBackend,
    { provide: RequestOptions, useClass: BaseRequestOptions },
    { provide: ResponseOptions, useClass: BaseResponseOptions },
    { provide: XSRFStrategy, useValue: new NoopCookieXSRFStrategy() },
  ];
  return ReflectiveInjector.resolveAndCreate(providers).get(Http);
}

export function main() {
  getHttp().get('./config.json').toPromise()
    .then((res: Response) => {
      let conf = res.json();
      browserDynamicPlatform().bootstrapModule(getAppModule(conf));
    })
    .catch(error => { console.error(error); });
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
