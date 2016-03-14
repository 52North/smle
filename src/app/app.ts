/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from 'angular2/core';
import { RouteConfig, Router } from 'angular2/router';
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
