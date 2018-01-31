import { Component } from '@angular/core';

import { ModeSetting, Settings, StatusSetting, ValueSetting } from '../../../model/sml';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { ModeSettingComponent } from './ModeSettingComponent';
import { StatusSettingComponent } from './StatusSettingComponent';
import { ValueSettingComponent } from './ValueSettingComponent';

@Component({
    selector: 'sml-settings',
    templateUrl: './SettingsComponent.html'
})
export class SettingsComponent extends TypedModelComponent<Settings> {

    protected createModel(): Settings {
        return new Settings();
    }

    protected openNewSetValueItem(valueSetting: ValueSetting) {
        const metadata = new ChildMetadata(ValueSettingComponent, valueSetting, this.config.getConfigFor('setValue'));
        this.openNewChild(metadata);
    }

    protected onRemoveSetValue(index: number): void {
        this.model.setValue.splice(index, 1);
    }

    protected onAddSetValue(): void {
        this.model.setValue.push(new ValueSetting());
    }

    protected openNewSetModeItem(modeSetting: ModeSetting) {
        const metadata = new ChildMetadata(ModeSettingComponent, modeSetting, this.config.getConfigFor('setMode'));
        this.openNewChild(metadata);
    }

    protected onRemoveSetMode(index: number): void {
        this.model.setMode.splice(index, 1);
    }

    protected onAddSetMode(): void {
        this.model.setMode.push(new ModeSetting());
    }

    protected openNewSetStatusItem(statusSetting: StatusSetting) {
        const metadata = new ChildMetadata(
            StatusSettingComponent, statusSetting, this.config.getConfigFor('setStatus')
        );
        this.openNewChild(metadata);
    }

    protected onRemoveSetStatus(index: number): void {
        this.model.setStatus.splice(index, 1);
    }

    protected onAddSetStatus(): void {
        const statusSetting = new StatusSetting();
        statusSetting.value = 'enabled';
        this.model.setStatus.push(statusSetting);
    }

}
