import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { AbstractSWEComponent } from '../swe/AbstractSWEComponent';
import { EditorComponent } from '../base/EditorComponent';
import { ListComponent } from '../basic/ListComponent';
import { CardComponent } from '../basic/CardComponent';
import { Settings, ValueSetting, ModeSetting, StatusSetting } from '../../../model/sml';
import { ChildMetadata, TypedModelComponent } from '../base/TypedModelComponent';
import { ValueSettingComponent } from './ValueSettingComponent';
import { ModeSettingComponent } from './ModeSettingComponent';
import { StatusSettingComponent } from './StatusSettingComponent';

@Component({
  selector: 'sml-settings',
  template: require('./SettingsComponent.html')
})
export class SettingsComponent extends EditorComponent<Settings> {

  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): Settings {
    return new Settings();
  }

  private openNewSetValueItem(valueSetting: ValueSetting) {
    var metadata = new ChildMetadata(ValueSettingComponent, valueSetting, this.config.getConfigFor('setValue'));
    this.openNewChild(metadata);
  }

  private onRemoveSetValue(index: number): void {
    this.closeChildWithModel(this.model.setValue[index]);
    this.model.setValue.splice(index, 1);
  }

  private onAddSetValue(): void {
    this.model.setValue.push(new ValueSetting());
  }

  private openNewSetModeItem(modeSetting: ModeSetting) {
    var metadata = new ChildMetadata(ModeSettingComponent, modeSetting, this.config.getConfigFor('setMode'));
    this.openNewChild(metadata);
  }

  private onRemoveSetMode(index: number): void {
    this.closeChildWithModel(this.model.setMode[index]);
    this.model.setMode.splice(index, 1);
  }

  private onAddSetMode(): void {
    this.model.setMode.push(new ModeSetting());
  }

  private openNewSetStatusItem(statusSetting: StatusSetting) {
    var metadata = new ChildMetadata(StatusSettingComponent, statusSetting, this.config.getConfigFor('setStatus'));
    this.openNewChild(metadata);
  }

  private onRemoveSetStatus(index: number): void {
    this.closeChildWithModel(this.model.setStatus[index]);
    this.model.setStatus.splice(index, 1);
  }

  private onAddSetStatus(): void {
    var statusSetting = new StatusSetting();
    statusSetting.value = 'enabled';
    this.model.setStatus.push(statusSetting);
  }

}
