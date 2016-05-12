
import { Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditorComponent } from './EditorComponent';

export abstract class AbstractComponent<T> {
  @Input()
  public model: T;

  public editing: boolean = true;
  
  public onReset(): void {
    for (let prop in this.model) { delete this.model[prop] }
    jQuery.extend(this.model, this.createModel());
  }

  protected abstract createModel(): T;
}
