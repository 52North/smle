import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';

import { NestedCardComponent } from '../basic/NestedCardComponent';
import { ChildMetadata } from './ChildMetadata';
import { NestedChildMetadata } from './NestedChildMetadata';
import { TypedModelComponent } from './TypedModelComponent';

export abstract class EditorComponent<T> extends TypedModelComponent<T> {
    private parentComponent: EditorComponent<any>;
    private childComponentRef: ComponentRef<EditorComponent<any>>;
    public abstract title: string;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) {
        super();
    }

    public onReset(): void {
        this.closeChild();
        for (const prop in this.model) {
            if (this.model[prop]) { delete this.model[prop]; }
        }
        this.extendModel();
    }

    public get hasChild(): boolean {
        return !!this.childComponentRef;
    }

    public close() {
        if (this.childComponentRef) {
            this.childComponentRef.instance.close();
        }

        if (this.parentComponent) {
            this.parentComponent.destroyChild();
        }
    }

    public closeChild() {
        if (this.childComponentRef) {
            this.childComponentRef.instance.close();
        }
    }

    public openNewChild(childMetadata: ChildMetadata<any>) {
        const model = childMetadata.model;
        const componentType = childMetadata.componentType;
        const config = childMetadata.config;

        if (this.childComponentRef &&
            this.childComponentRef.componentType === componentType &&
            this.childComponentRef.instance.model === model) {
            return;
        }

        if (this.childComponentRef) {
            this.childComponentRef.instance.close();
        }

        const component = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.childComponentRef = this.viewContainerRef.createComponent(component);
        this.childComponentRef.instance.model = model;
        this.childComponentRef.instance.config = config;
        this.childComponentRef.instance.componentOptions = childMetadata.options;
        this.childComponentRef.instance.parentComponent = this;
        if (childMetadata instanceof NestedChildMetadata) {
            (this.childComponentRef.instance as NestedCardComponent).componentType = childMetadata.contentType;
            (this.childComponentRef.instance as NestedCardComponent).title = childMetadata.title;
        }
    }

    public get hasParent(): boolean {
        return !!this.parentComponent;
    }

    protected closeChildWithModel(model: any) {
        if (model === this.getActiveChildModel() && model) {
            this.closeChild();
        }
    }

    private getActiveChildModel(): any {
        return this.childComponentRef ? this.childComponentRef.instance.model : null;
    }

    private destroyChild() {
        this.childComponentRef.destroy();
        this.childComponentRef = null;
    }
}
