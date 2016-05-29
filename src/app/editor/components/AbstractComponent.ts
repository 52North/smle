import { Input } from '@angular/core';
import { EditorComponent } from './EditorComponent';

export abstract class AbstractComponent<T> extends EditorComponent {
  @Input()
  public model: T;
  
  public onReset(): void {
    for (let prop in this.model) { delete this.model[prop] }
    this.extendModel();
  }

  protected abstract createModel(): T;
}
