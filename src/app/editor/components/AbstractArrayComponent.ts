import {AbstractEditorComponent} from './AbstractEditorComponent';
import {Input, ViewContainerRef, ComponentResolver} from '@angular/core';

export abstract class AbstractArrayComponent<T> extends AbstractEditorComponent {
    @Input()
    public model: T[];

    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    public onReset(): void {
        this.model.length = 0;
        this.extendModel();
        this.closeChild();
    }

    public onAdd() {
        this.model.push(this.createEntry());
    }

    public onRemove(index: number) {
        this.closeChildWithModel(this.model[index]);
        this.model.splice(index, 1);
    }

    protected abstract createModel(): T[];

    protected abstract createEntry(): T;

}
