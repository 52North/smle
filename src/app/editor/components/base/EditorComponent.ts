import { ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TypedModelComponent } from './TypedModelComponent';
import { ChildMetadata } from '../base';
import { NestedChildMetadata } from './NestedChildMetadata';
import { NestedCardComponent } from '../basic/NestedCardComponent';

export abstract class EditorComponent<T> extends TypedModelComponent<T> {
    private parentComponent: EditorComponent<any>;
    private childComponentRef: ComponentRef<EditorComponent<any>>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) {
        super();
    }

    public onReset(): void {
        this.closeChild();
        for (let prop in this.model) {
            if (this.model[prop]) delete this.model[prop];
        }
        this.extendModel();
    }

    protected get hasChild(): boolean {
        return !!this.childComponentRef;
    }

    protected get hasParent(): boolean {
        return !!this.parentComponent;
    }

    protected openNewChild(childMetadata: ChildMetadata<any>) {
        let model = childMetadata.model;
        let componentType = childMetadata.componentType;
        let config = childMetadata.config;

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
        this.childComponentRef.instance.parentComponent = this;
        if (childMetadata instanceof NestedChildMetadata) {
            (<NestedCardComponent> this.childComponentRef.instance).componentType = childMetadata.contentType;
            (<NestedCardComponent> this.childComponentRef.instance).title = childMetadata.title;
        }
    }

    protected close() {
        if (this.childComponentRef) {
            this.childComponentRef.instance.close();
        }

        if (this.parentComponent) {
            this.parentComponent.destroyChild();
        }
    }

    protected closeChildWithModel(model: any) {
        if (model === this.getActiveChildModel() && model) {
            this.closeChild();
        }
    }

    protected closeChild() {
        if (this.childComponentRef) {
            this.childComponentRef.instance.close();
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
