import {Input, ComponentResolver, ViewContainerRef} from '@angular/core';
import {EditorComponent} from './EditorComponent';
import {Configuration} from '../../../services/config/Configuration';

export abstract class TypedModelComponent<T> extends EditorComponent {
    @Input()
    public model: T;
    @Input()
    public config: Configuration;

    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    public onReset(): void {
        this.closeChild();
        for (let prop in this.model) {
            delete this.model[prop];
        }
        this.extendModel();
    }

    protected abstract createModel(): T;
}
