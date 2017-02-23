import { Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DescriptionConfig } from '../../../services/config/DescriptionConfig';
import { BaseComponent } from './BaseComponent';
import { ChildMetadata } from './ChildMetadata';

declare var jQuery: any;

export abstract class TypedModelComponent<T>
    extends BaseComponent implements OnInit {

    @Input()
    public model: T;

    @Input()
    public config: DescriptionConfig;

    @Input()
    public isShowAll: boolean = false;

    @Output()
    public openAsChild: EventEmitter<ChildMetadata<any>> = new EventEmitter<ChildMetadata<any>>();

    @Output()
    public modelChange: EventEmitter<T> = new EventEmitter<T>();

    private _storeProfileModel: T;
    protected abstract createModel(): T;

    protected extendModel(): void {
        jQuery.extend(this.model, this._storeProfileModel);
    }

    protected openNewChild(childMetadata: ChildMetadata<any>) {
        this.openAsChild.emit(childMetadata);
    }

    ngOnInit(): void {
        this._storeProfileModel = Object.assign({}, this.model);
    }
}
