
import { Component, Input } from 'angular2/core';
import { Control, ControlArray, FormBuilder } from 'angular2/common';

@Component({
  selector: 'stringList',
  template: require('./PhoneComponent.html')
})
export class StringListComponent {
  private control: ControlArray = new ControlArray([]);

  constructor(fb: FormBuilder) {

  }

  public get items(): string[] {
    return this.control.value.map(x => x.value);
  }

  public set items(value: string[]) {
    while (this.control.length > 0) {
      this.control.removeAt(0);
    }
    value.forEach(x => this.control.push(new Control(x)));
  }

}
