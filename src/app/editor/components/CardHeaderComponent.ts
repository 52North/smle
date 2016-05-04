import { Component, Input, Output, EventEmitter } from 'angular2/core';

@Component({
  selector: 'card-header',
  template: `
  <div class="card-header">
    <button type="button" class="btn btn-link" (click)="toggleCollapsed()">
      <i [hidden]="collapsed" class="fa fa-fw fa-chevron-down"></i>
      <i [hidden]="!collapsed" class="fa fa-fw fa-chevron-right"></i>
      {{title}}
    </button>
    <div class="pull-right">
      <button type="button" class="btn btn-link" (click)="onReset()" [hidden]="!editing">
        <i class="fa fa-fw fa-undo"></i> Reset
      </button>
      <button type="button" class="btn btn-link" (click)="toggleEditing()" [hidden]="!editing">
        <i class="fa fa-fw fa-save"></i> Save
      </button>
      <button type="button" class="btn btn-link" (click)="toggleEditing()" [hidden]="editing">
        <i class="fa fa-fw fa-edit"></i> Edit
      </button>
    </div>
  </div>`
})
export class CardHeaderComponent {
  @Input()
  public title: string;
  @Output()
  public reset: EventEmitter<any> = new EventEmitter();
  @Input()
  public collapsed: boolean;
  @Output()
  public collapsedChange: EventEmitter<any> = new EventEmitter();
  @Input()
  public editing: boolean;
  @Output()
  public editingChange: EventEmitter<any> = new EventEmitter();

  public toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.next(this.collapsed);
  }

  public toggleEditing(): void {
    this.editing = !this.editing;
    this.editingChange.emit(this.editing);
  }

  public onReset(event: any): void {
    this.reset.emit(null);
  }
}
