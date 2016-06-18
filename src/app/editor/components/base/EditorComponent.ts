import {Type} from '@angular/core/src/facade/lang';
import {ViewContainerRef, ComponentResolver, ComponentRef} from '@angular/core';
import {Configuration} from '../../../services/config/Configuration';
import {TypedModelComponent} from './TypedModelComponent';

export abstract class EditorComponent<T> extends TypedModelComponent<T> {
    private parentComponent: EditorComponent<any>;
    private childComponentRef: ComponentRef<EditorComponent<any>>;

    constructor(private componentResolver: ComponentResolver, private viewContainerRef: ViewContainerRef) {
        super();
    }

    public onReset(): void {
        this.closeChild();
        for (let prop in this.model) {
            delete this.model[prop];
        }
        this.extendModel();
    }

    protected get hasChild(): boolean {
        return !!this.childComponentRef;
    }

    protected get hasParent(): boolean {
        return !!this.parentComponent;
    }

    protected openNewChild(componentType: Type, model: any, config: Configuration) {
        if (this.childComponentRef &&
            this.childComponentRef.componentType === componentType &&
            this.childComponentRef.instance.model === model) {
            return;
        }

        if (this.childComponentRef) {
            this.childComponentRef.instance.close();
        }

        this.componentResolver.resolveComponent(componentType).then((componentFactory) => {
            this.childComponentRef = this.viewContainerRef.createComponent(componentFactory);
            this.childComponentRef.instance.model = model;
            this.childComponentRef.instance.config = config;
            this.childComponentRef.instance.parentComponent = this;
        });
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

    private getActiveChildModel(): any {
        return this.childComponentRef ? this.childComponentRef.instance.model : null;
    }

    protected closeChild() {
        if (this.childComponentRef) {
            this.childComponentRef.instance.close();
        }
    }

    private destroyChild() {
        this.childComponentRef.destroy();
        this.childComponentRef = null;
    }
}
