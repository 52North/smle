import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {AbstractSWEComponent} from '../swe/AbstractSWEComponent';
import {EditorComponent} from '../base/EditorComponent';
import {ListComponent} from '../basic/ListComponent';
import {CardComponent} from '../basic/CardComponent';
import {Settings} from '../../../model/sml/Settings';
import {ValueSetting} from '../../../model/sml/ValueSetting';
import {ChildMetadata, TypedModelComponent} from '../base/TypedModelComponent';
import {ValueSettingComponent} from './ValueSettingComponent';

@Component({
  selector: 'sml-settings',
  template: require('./SettingsComponent.html'),
  directives: [ListComponent, AbstractSWEComponent, CardComponent]
})
export class SettingsComponent extends EditorComponent<Settings> {

  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
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

}
