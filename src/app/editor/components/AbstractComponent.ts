import {Input, ComponentResolver, ViewContainerRef} from '@angular/core';
import {AbstractEditorComponent} from './AbstractEditorComponent';

export abstract class AbstractComponent<T> extends AbstractEditorComponent {
    @Input()
    public model: T;

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
