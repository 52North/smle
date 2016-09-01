import { Component, Input } from '@angular/core';
import { ListComponent } from './ListComponent';

@Component({
  selector: 'strings',
  template: require('./StringsComponent.html')
})
export class StringsComponent {
  @Input()
  public list: string[];
  public item: string;

  public remove(i: number): void {
    this.list.splice(i, 1);
  }

  public add(): void {
    if (this.item) {
      this.list.push(this.item);
    }
    this.clear();
  }

  public clear(): void {
    this.item = '';
  }
}
