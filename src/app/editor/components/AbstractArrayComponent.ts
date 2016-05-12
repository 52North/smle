import { EditorComponent } from './EditorComponent';
import { Input, OnInit, Output, EventEmitter } from '@angular/core';

export abstract class AbstractArrayComponent<T> {

  @Input()
  public model: T[];
  
  public editing: boolean = true;

  public onReset(): void {
    this.model.length = 0;
    jQuery.extend(this.model, this.createModel());
  }

  protected abstract createModel(): T[];
}
