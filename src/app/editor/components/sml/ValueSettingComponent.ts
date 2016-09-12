import { Component, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { CardComponent } from '../basic/CardComponent';
import { EditorComponent } from '../base/EditorComponent';
import { AbstractSettingComponent } from './AbstractSettingComponent';
import { ValueSetting } from '../../../model/sml/ValueSetting';
import { DatePickerComponent } from '../gml/DatePickerComponent';

@Component({
  selector: 'sml-value-setting',
  template: require('./ValueSettingComponent.html'),
  styles: [require('../styles/editor-component.scss')]
})
export class ValueSettingComponent extends EditorComponent<ValueSetting> implements OnInit {

  private selectedType: string;

  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): ValueSetting {
    return new ValueSetting();
  }

  public ngOnInit() {
    this.selectedType = this.getValueType();
  }

  private getValueType(): any {
    let temp = this.model.value;
    if (temp instanceof Date) {
      return 'date';
    } else if (typeof temp === 'string') {
      return 'string';
    } else if (typeof temp === 'number') {
      return 'number';
    } else if (typeof temp === 'boolean') {
      return 'boolean';
    }
  }
}
