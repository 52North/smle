import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list',
  styles: [require('../styles/list-component.scss')],
  template: require('./ListComponent.html')
})
export class ListComponent {
  @Input()
  public list: any[];
  @Input()
  public itemTitle: string;
  @Output()
  public select: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public add: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public remove: EventEmitter<number> = new EventEmitter<number>();

  private onClick(item: any, index: number) {
    this.select.emit(item);
  }

  private onRemove(item: any, index: number) {
    this.remove.emit(index);
  }

  private onAdd() {
    this.add.emit(null);
  }
}
