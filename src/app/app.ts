/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from 'angular2/core';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { RouteConfig, Router } from 'angular2/router';
import { APP_PROVIDERS } from './providers';
import { FORM_PROVIDERS, COMMON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { APP_DIRECTIVES } from './directives';
import { ROUTE_CONFIG } from './routes';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [
    ...FORM_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...APP_PROVIDERS
  ],
  directives: [
    ...ROUTER_DIRECTIVES,
    ...CORE_DIRECTIVES,
    ...FORM_DIRECTIVES,
    ...APP_DIRECTIVES,
  ],
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  styles: [require('./app.scss')],
  template: require('./app.html'),
})
@RouteConfig(ROUTE_CONFIG)
export class Application { }
