import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
export class Application {
  constructor(viewContainer: ViewContainerRef) {
  }
}
