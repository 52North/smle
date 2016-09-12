import { Input, Output, EventEmitter } from '@angular/core';
import { DescriptionConfig } from '../../../services/config/DescriptionConfig';
import { Type, ConcreteType } from '@angular/core/src/facade/lang';
import { BaseComponent } from './BaseComponent';

declare var jQuery: any;

export class ChildMetadata<T> {
  private _componentType: ConcreteType<T>;
  private _model: any;
  private _config: DescriptionConfig;

  public get componentType(): ConcreteType<T> {
    return this._componentType;
  }

  public get model(): any {
    return this._model;
  }

  public get config(): DescriptionConfig {
    return this._config;
  }

  constructor(componentType: ConcreteType<T>, model: any, config: DescriptionConfig) {
    this._componentType = componentType;
    this._model = model;
    this._config = config;
  }
}

export abstract class TypedModelComponent<T> extends BaseComponent {
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

  protected abstract createModel(): T;

  protected extendModel(): void {
    jQuery.extend(this.model, this.createModel());
  }

  protected openNewChild(childMetadata: ChildMetadata<any>) {
    this.openAsChild.emit(childMetadata);
  }
}
