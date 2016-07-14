import {Component, ComponentResolver, ViewContainerRef, OnInit} from '@angular/core';
import {CardComponent} from '../basic/CardComponent';
import {EditorComponent} from '../base/EditorComponent';
import {AbstractSettingComponent} from './AbstractSettingComponent';
import {StatusSetting} from '../../../model/sml/StatusSetting';

@Component({
  selector: 'sml-status-setting',
  template: require('./StatusSettingComponent.html'),
  styles: [require('../styles/editor-component.scss')],
  directives: [CardComponent, AbstractSettingComponent]
})
export class StatusSettingComponent extends EditorComponent<StatusSetting> implements OnInit {

  private valueSelected: boolean;

  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }

  public ngOnInit() {
    this.valueSelected = this.model.value === 'enabled' ? true : false;
  }

  protected createModel(): StatusSetting {
    return new StatusSetting();
  }

  private updateValue(temp: any) {
    this.model.value = !this.valueSelected ? 'enabled' : 'disabled';
  }
}
