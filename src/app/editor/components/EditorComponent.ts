
import { Input, OnInit, Output, EventEmitter } from '@angular/core';

export abstract class EditorComponent {
  @Input()
  public model;
  
  editing: boolean;

  public abstract onReset(): void;
  
//  public onReset(): void {
//    debugger;
//    for (let prop in this.model) { delete this.model[prop] }
//    $.extend(this.model, this.createModel());
//  }

  protected abstract createModel();
//  protected abstract createModel(): T;
}