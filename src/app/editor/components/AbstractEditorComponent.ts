import { Input, OnInit } from 'angular2/core';

export abstract class AbstractComponent<T> implements OnInit {
  @Input()
  public model: T;
  public editing: boolean = true;
  public collapsed: boolean = false;

  public ngOnInit(): void {
    if (this.model == null) {
      this.model = this.createModel();
    }
  }

  public onReset(): void {
    this.model = this.createModel();
  }

  protected abstract createModel(): T;
}
