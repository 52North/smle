/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  Router,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS
} from 'angular2/router';

import {
  FORM_PROVIDERS,
  COMMON_DIRECTIVES,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES
} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {ROUTES} from './routes';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [
    ...FORM_PROVIDERS,
    ...ROUTER_PROVIDERS
  ],
  directives: [
    ...ROUTER_DIRECTIVES,
    ...CORE_DIRECTIVES,
    ...FORM_DIRECTIVES,
    RouterActive],
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  styles: [require('./app.scss')],
  template: require('./app.html'),
})
@RouteConfig(ROUTES)
export class Application { }
