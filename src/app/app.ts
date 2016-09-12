/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
//import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap';

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
  viewProviders: [],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
export class Application {
  constructor(viewContainer: ViewContainerRef) {
    //modal.defaultViewContainer = viewContainer;
  }
}
