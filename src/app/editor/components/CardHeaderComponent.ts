import { Component, Input, Output, EventEmitter } from '@angular/core';

export class CloseEventData {

}

@Component({
  selector: 'card-header',
  template: require('./CardHeaderComponent.html')
})
export class CardHeaderComponent {
  @Input()
  public title: string;
  @Output()
  public reset: EventEmitter<any> = new EventEmitter();
  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  public onReset(): void {
    this.reset.emit(null);
  }
  public onClose(): void {
    this.close.emit(null);
  }  
}
