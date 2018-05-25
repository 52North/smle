import { AfterContentInit, Component, ComponentFactoryResolver, Type, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ChildMetadataOptions } from '../../editor/components/base/ChildMetadata';
import { HostDirective } from '../../editor/components/base/host.directive';
import { DescriptionConfig } from '../../services/config/DescriptionConfig';

@Component({
  selector: 'app-modal-component-opener',
  templateUrl: './modal-component-opener.component.html',
  styleUrls: ['./modal-component-opener.component.scss']
})
export class ModalComponentOpenerComponent implements AfterContentInit {

  public componentType: Type<any>;
  public model: any;
  public config: DescriptionConfig;
  public options: ChildMetadataOptions;
  public title: string;

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
    componentRef.instance.componentOptions = this.options;
    this.title = componentRef.instance.title;
  }

  public close() {
    this.activeModel.close();
  }

}
