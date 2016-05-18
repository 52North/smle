/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { ROUTE_CONFIG } from './routes';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [],
  directives: [],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./app.scss')],
  template: require('./app.html'),
})
@RouteConfig(ROUTE_CONFIG)
export class Application { }
