import {Type} from '@angular/core/src/facade/lang';
import {ViewContainerRef, ComponentResolver, ComponentRef} from '@angular/core';

export abstract class AbstractEditorComponent {
    public model;

    private parentComponent: AbstractEditorComponent;
    private childComponentRef: ComponentRef<AbstractEditorComponent>;

    constructor(private componentResolver: ComponentResolver, private viewContainerRef: ViewContainerRef) {
    }

    protected extendModel(): void {
        jQuery.extend(this.model, this.createModel());
    }

    protected abstract createModel(): any;

    protected get hasChild(): boolean {
        return !!this.childComponentRef;
    }

    protected get hasParent(): boolean {
        return !!this.parentComponent;
    }

    protected openNewChild(componentType: Type, model: any) {
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
