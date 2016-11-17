import { Input, Output, EventEmitter,OnInit } from '@angular/core';
import { DescriptionConfig } from '../../../services/config/DescriptionConfig';
import { Type } from '@angular/core/src/facade/lang';
import { BaseComponent } from './BaseComponent';

declare var jQuery: any;

export class ChildMetadata {
  private _componentType: Type;
  private _model: any;
  private _config: DescriptionConfig;

  public get componentType(): Type {
    return this._componentType;
  }

  public get model(): any {
    return this._model;
  }

  public get config(): DescriptionConfig{
    return this._config;
  }

  constructor(componentType: Type, model: any, config: DescriptionConfig) {
    this._componentType = componentType;
    this._model = model;
    this._config = config;
  }
}

export abstract class TypedModelComponent<T> extends BaseComponent implements OnInit{
  @Input()
  public model: T;
  @Input()
  public config: DescriptionConfig;
  @Input()
  public isShowAll: boolean = false;

  @Output()
  public openAsChild: EventEmitter<ChildMetadata> = new EventEmitter<ChildMetadata>();
  @Output()
  public modelChange: EventEmitter<T> = new EventEmitter<T>();

  private _storeProfileModel:T;
  protected abstract createModel(): T;

  protected extendModel(): void {
      jQuery.extend(this.model, this._storeProfileModel);
  }

  protected openNewChild(childMetadata: ChildMetadata) {
    this.openAsChild.emit(childMetadata);
  }
   ngOnInit(): void {
       this._storeProfileModel= Object.assign({},this.model);
   }
}
