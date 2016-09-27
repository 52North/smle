import { Component } from '@angular/core';
import { TypedModelComponent, ChildMetadata } from '../base/TypedModelComponent';
import { AbstractProcess } from '../../../model/sml/AbstractProcess';
import { SettingsComponent } from './SettingsComponent';
import { Settings } from '../../../model/sml/Settings';

@Component({
    selector: 'sml-abstract-process',
    template: require('./AbstractProcessComponent.html')
})
export class AbstractProcessComponent extends TypedModelComponent<AbstractProcess> {
    protected createModel(): AbstractProcess {
        return undefined;
    }

    protected openSettings() {
        let metadata =
            new ChildMetadata(SettingsComponent, this.model.configuration, this.config.getConfigFor('settings'));
        this.openNewChild(metadata);
    }

    protected removeSettings() {
        this.model.configuration = null;
    }

    protected createSettings() {
        this.model.configuration = new Settings();
    }

}
