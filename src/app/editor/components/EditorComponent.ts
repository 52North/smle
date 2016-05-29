import {Type} from '@angular/core/src/facade/lang';
import {ViewContainerRef, ComponentResolver, ComponentRef} from '@angular/core';

export abstract class EditorComponent {
    public model;
    private previousComponent:EditorComponent;
    private nextComponentRef:ComponentRef<EditorComponent>;

    constructor(private componentResolver:ComponentResolver,
                private viewContainerRef:ViewContainerRef) {
    }

    protected extendModel():void {
        jQuery.extend(this.model, this.createModel());
    }

    protected abstract createModel():any;

    protected openNewItem(componentType:Type, model:any) {
        this.componentResolver.resolveComponent(componentType).then((componentFactory)=> {
            this.nextComponentRef = this.viewContainerRef.createComponent(componentFactory);
            this.nextComponentRef.instance.model = model;
            this.nextComponentRef.instance.previousComponent = this;
        });
    }

    protected close() {
        if (this.nextComponentRef) {
            this.nextComponentRef.instance.close();
        }

        if (this.previousComponent) {
            this.previousComponent.closeNext();
        }
    }

    private closeNext() {
        this.nextComponentRef.destroy();
        this.nextComponentRef = null;
    }
}