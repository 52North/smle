import { AfterContentInit, Component, ComponentFactoryResolver, Type, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HostDirective } from '../../editor/components/base/host.directive';

@Component({
  selector: 'app-modal-component-opener',
  templateUrl: './modal-component-opener.component.html',
  styleUrls: ['./modal-component-opener.component.scss']
})
export class ModalComponentOpenerComponent implements AfterContentInit {

  public componentType: Type<any>;
  public model: any;
  public config: any;

  @ViewChild(HostDirective)
  public listItemHost: HostDirective;

  constructor(
    protected activeModel: NgbActiveModal,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterContentInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
    const viewContainerRef = this.listItemHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    if (Array.isArray(this.model)) {
      componentRef.instance.model = this.model[0];
    } else {
      componentRef.instance.model = this.model;
    }
    componentRef.instance.config = this.config;
  }

  public close() {
    this.activeModel.close();
  }

}
