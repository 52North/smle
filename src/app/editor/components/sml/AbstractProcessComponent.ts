import { Component } from '@angular/core';
import { DescribedObjectComponent } from './DescribedObjectComponent';
import { TypedModelComponent, ChildMetadata } from '../base/TypedModelComponent';
import { AbstractProcess } from '../../../model/sml/AbstractProcess';
import { SettingsComponent } from './SettingsComponent';
import { Settings } from '../../../model/sml/Settings';
import { ChildItemComponent } from '../basic/ChildItemComponent';
import { TextFieldComponent } from '../basic/TextFieldComponent';

@Component({
    selector: 'sml-abstract-process',
    template: require('./AbstractProcessComponent.html')
})
export class AbstractProcessComponent extends TypedModelComponent<AbstractProcess> {
    protected createModel(): AbstractProcess {
        return undefined;
    }

    private openSettings() {
        var metadata = new ChildMetadata(SettingsComponent, this.model.configuration, this.config.getConfigFor('settings'));
        this.openNewChild(metadata);
    }

    private removeSettings() {
        this.model.configuration = null;
    }

    private createSettings() {
        this.model.configuration = new Settings();
    }

}
