import {Input} from '@angular/core';
import {Configuration} from '../../../services/config/Configuration';
import {ConfigurableComponent} from './ConfigurableComponent';

export abstract class TypedModelComponent<T> extends ConfigurableComponent {
    @Input()
    public model: T;
    @Input()
    public config: Configuration;

    protected abstract createModel(): T;

    protected extendModel(): void {
        jQuery.extend(this.model, this.createModel());
    }
}
