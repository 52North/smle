import { EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

import { DescriptionConfig } from '../../../services/config/DescriptionConfig';
import { BaseComponent } from './BaseComponent';
import { ChildMetadata, ChildMetadataOptions } from './ChildMetadata';

declare var jQuery: any;

export abstract class TypedModelComponent<T> extends BaseComponent implements OnInit, OnChanges {

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
    private extendedModel = false;
    protected abstract createModel(): T;

    protected extendModel(): void {
        jQuery.extend(this.model, this._storeProfileModel);
        this.extendedModel = true;
    }

    public openNewChild(childMetadata: ChildMetadata<any>) {
        this.openAsChild.emit(childMetadata);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.extendedModel) {
            this._storeProfileModel = cloneDeep(this.model);
            this.extendedModel = false;
        }
    }

    ngOnInit(): void {
        this._storeProfileModel = cloneDeep(this.model);
    }
}
