import {Input} from '@angular/core';
import {Configuration} from '../../../services/config/Configuration';

export abstract class TypedModelComponent<T> {
    @Input()
    public model: T;
    @Input()
    public config: Configuration;
    @Input()
    public isShowAll: boolean = false;

    protected abstract createModel(): T;

    protected extendModel(): void {
        jQuery.extend(this.model, this.createModel());
    }
}
