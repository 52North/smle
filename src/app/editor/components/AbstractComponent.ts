import {Input, ComponentResolver, ViewContainerRef} from '@angular/core';
import {EditorComponent} from './EditorComponent';

export abstract class AbstractComponent<T> extends EditorComponent {
    @Input()
    public model:T;

    constructor(componentResolver:ComponentResolver, viewContainerRef:ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    public onReset():void {
        this.closeChild();
        for (let prop in this.model) {
            delete this.model[prop]
        }
        this.extendModel();
    }

    protected abstract createModel():T;
}
