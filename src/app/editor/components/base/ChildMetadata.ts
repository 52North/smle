import { Type } from '@angular/core';
import { DescriptionConfig } from '../../../services/config/DescriptionConfig';

export class ChildMetadata<T> {
    private _componentType: Type<T>;
    private _model: any;
    private _config: DescriptionConfig;

    public get componentType(): Type<T> {
        return this._componentType;
    }

    public get model(): any {
        return this._model;
    }

    public get config(): DescriptionConfig {
        return this._config;
    }

    constructor(componentType: Type<T>, model: any, config: DescriptionConfig) {
        this._componentType = componentType;
        this._model = model;
        this._config = config;
    }
}
