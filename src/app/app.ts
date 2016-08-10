/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';
import { AuthComponent } from './sos/components/auth.component';
import { AuthService } from './sos/components/auth.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [],
  directives: [AuthComponent],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [...BS_MODAL_PROVIDERS],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
export class Application {
  constructor(
    public modal: Modal,
    viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    modal.defaultViewContainer = viewContainer;
  }
}
