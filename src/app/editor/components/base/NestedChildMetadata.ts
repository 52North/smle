import { Type } from '@angular/core';
import { DescriptionConfig } from '../../../services/config/DescriptionConfig';
import { ChildMetadata } from './ChildMetadata';

export class NestedChildMetadata<T> extends ChildMetadata<T> {

    private _contentType: Type<any>;

    private _title: string;

    constructor(componentType: Type<T>, contentType: Type<any>, title: string, model: any, config: DescriptionConfig) {
        super(componentType, model, config);
        this._contentType = contentType;
        this._title = title;
    }

    public get title(): string {
        return this._title;
    }

    public get contentType(): Type<any> {
        return this._contentType;
    }
}
