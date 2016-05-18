
import { Component, Input } from '@angular/core';

@Component({
  selector: 'strings',
  template: `
    <ul class="list-group">
      <li *ngFor="let item of list; let i = index" class="list-group-item">
        {{item}}
        <button type="button" class="btn btn-link" (click)="remove(i)">
          <i class="fa fa-minus-circle"></i>
        </button>
      </li>
      <li class="list-group-item">
        <input type="text" class="form-control" [(ngModel)]="item">
        <button type="button" class="btn btn-link" (click)="add()">
          <i class="fa fa-fw fa-plus-circle"></i> Add
        </button>
        <button type="button" class="btn btn-link" (click)="clear()">
          <i class="fa fa-fw fa-undo"></i> Clear
        </button>
      </li>
    </ul>
  `
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
