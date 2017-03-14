import {
    Component,
    Input,
    ViewChild,
    ComponentFactoryResolver,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    Type,
    Output,
    EventEmitter
} from '@angular/core';
import { HostDirective } from './host.directive';
import { ChildMetadata } from './ChildMetadata';
import { TypedModelComponent } from './TypedModelComponent';

@Component({
    selector: 'dynamic-element',
    template: `<template host></template>`
})
export class DynamicElementComponent implements OnDestroy, OnChanges {
    @Input()
    public item: ChildMetadata<any>;

    @Input()
    public componentType: Type<any>;

    @Input()
    public model: any;

    @Input()
    public config: any;

    @Input()
    public isShowAll: boolean = false;

    @Output()
    public openAsChild: EventEmitter<ChildMetadata<any>> = new EventEmitter<ChildMetadata<any>>();

    @ViewChild(HostDirective)
    public listItemHost: HostDirective;

    public publicsubscription: any;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.model) {
            this.loadComponent();
        }
        if (changes.isShowAll) {
            this.loadComponent();
        }
    }

    public ngOnDestroy() {
    }

    public loadComponent() {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.componentType);
        let viewContainerRef = this.listItemHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        let model;
        if (Array.isArray(this.model)) {
            if (this.model.length === 0) {
                model = (new this.componentType()).createModel();
                this.model.push(model);
                (<TypedModelComponent<any>>componentRef.instance).model = model;
            } else {
                (<TypedModelComponent<any>>componentRef.instance).model = this.model[0];
            }
        } else {
            (<TypedModelComponent<any>>componentRef.instance).model = this.model;
        }
        (<TypedModelComponent<any>>componentRef.instance).config = this.config;
        (<TypedModelComponent<any>>componentRef.instance).isShowAll = this.isShowAll;
        (<TypedModelComponent<any>>componentRef.instance).openAsChild.subscribe((childMetadata) => {
            this.openAsChild.emit(childMetadata);
        });
    }

}
