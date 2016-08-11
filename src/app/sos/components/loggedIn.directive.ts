import { Directive } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({ selector: '[loggedIn]' })
export class LoggedInDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.updateView(this.authService.isLoggedIn());
    this.authService.logInChangesEvent.subscribe(res => {
      this.updateView(res);
    });
  }

  private updateView(loggedIn: boolean) {
    if (loggedIn) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
