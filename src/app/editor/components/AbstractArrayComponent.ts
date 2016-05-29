import { EditorComponent } from './EditorComponent';
import { Input } from '@angular/core';
import {StackedItemEventService} from "../../services/StackedItemEventService";

export abstract class AbstractArrayComponent<T> extends EditorComponent {

  @Input()
  public model: T[];

  constructor(eventService:StackedItemEventService){
    super(eventService);
  }
  
  public onReset(): void {
    this.model.length = 0;
    this.extendModel();
  }

  public onAdd() {
    this.model.push(this.createEntry());
  }

  public onRemove(index: number) {
    this.model.splice(index, 1);
  }

  protected abstract createModel(): T[];

  protected abstract createEntry(): T;

}
