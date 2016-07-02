import {Input, Output, EventEmitter} from '@angular/core';
import {Configuration} from '../../../services/config/Configuration';
import {Type} from '@angular/core/src/facade/lang';

export class ChildMetadata {
    private _componentType: Type;
    private _model: any;
    private _config: Configuration;

    public get componentType(): Type {
        return this._componentType;
    }

    public get model(): any {
        return this._model;
    }

    public get config(): Configuration {
        return this._config;
    }

    constructor(componentType: Type, model: any, config: Configuration) {
        this._componentType = componentType;
        this._model = model;
        this._config = config;
    }
}

export abstract class TypedModelComponent<T> {
    @Input()
    public model: T;
    @Input()
    public config: Configuration;
    @Input()
    public isShowAll: boolean = false;

    @Output()
    public openAsChild: EventEmitter<ChildMetadata> = new EventEmitter<ChildMetadata>();

    protected abstract createModel(): T;

    protected extendModel(): void {
        jQuery.extend(this.model, this.createModel());
    }
}
