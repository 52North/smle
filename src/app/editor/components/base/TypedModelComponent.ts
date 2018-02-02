import { EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DescriptionConfig } from '../../../services/config/DescriptionConfig';
import { BaseComponent } from './BaseComponent';
import { ChildMetadata, ChildMetadataOptions } from './ChildMetadata';

declare var jQuery: any;

export abstract class TypedModelComponent<T>
    extends BaseComponent implements OnInit {

    @Input()
    public model: T;

    @Input()
    public config: DescriptionConfig;

    @Input()
    public isShowAll = false;

    @Input()
    public componentOptions: ChildMetadataOptions;

    @Output()
    public openAsChild: EventEmitter<ChildMetadata<any>> = new EventEmitter<ChildMetadata<any>>();

    @Output()
    public modelChange: EventEmitter<T> = new EventEmitter<T>();

    private _storeProfileModel: T;
    protected abstract createModel(): T;

    protected extendModel(): void {
        jQuery.extend(this.model, this._storeProfileModel);
    }

    public openNewChild(childMetadata: ChildMetadata<any>) {
        this.openAsChild.emit(childMetadata);
    }

    ngOnInit(): void {
        this._storeProfileModel = Object.assign({}, this.model);
    }
}
