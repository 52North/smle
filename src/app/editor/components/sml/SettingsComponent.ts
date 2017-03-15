import { Component } from '@angular/core';
import { TypedModelComponent, ChildMetadata } from '../base';
import { Settings, ValueSetting, ModeSetting, StatusSetting } from '../../../model/sml';
import { ValueSettingComponent } from './ValueSettingComponent';
import { ModeSettingComponent } from './ModeSettingComponent';
import { StatusSettingComponent } from './StatusSettingComponent';

@Component({
    selector: 'sml-settings',
    template: require('./SettingsComponent.html')
})
export class SettingsComponent extends TypedModelComponent<Settings> {

    protected createModel(): Settings {
        return new Settings();
    }

    protected openNewSetValueItem(valueSetting: ValueSetting) {
        let metadata = new ChildMetadata(ValueSettingComponent, valueSetting, this.config.getConfigFor('setValue'));
        this.openNewChild(metadata);
    }

    protected onRemoveSetValue(index: number): void {
        this.model.setValue.splice(index, 1);
    }

    protected onAddSetValue(): void {
        this.model.setValue.push(new ValueSetting());
    }

    protected openNewSetModeItem(modeSetting: ModeSetting) {
        let metadata = new ChildMetadata(ModeSettingComponent, modeSetting, this.config.getConfigFor('setMode'));
        this.openNewChild(metadata);
    }

    protected onRemoveSetMode(index: number): void {
        this.model.setMode.splice(index, 1);
    }

    protected onAddSetMode(): void {
        this.model.setMode.push(new ModeSetting());
    }

    protected openNewSetStatusItem(statusSetting: StatusSetting) {
        let metadata = new ChildMetadata(StatusSettingComponent, statusSetting, this.config.getConfigFor('setStatus'));
        this.openNewChild(metadata);
    }

    protected onRemoveSetStatus(index: number): void {
        this.model.setStatus.splice(index, 1);
    }

    protected onAddSetStatus(): void {
        let statusSetting = new StatusSetting();
        statusSetting.value = 'enabled';
        this.model.setStatus.push(statusSetting);
    }

}
