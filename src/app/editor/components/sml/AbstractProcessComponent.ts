import { Component } from '@angular/core';
import { TypedModelComponent, ChildMetadata } from '../base/TypedModelComponent';
import { AbstractProcess } from '../../../model/sml/AbstractProcess';
import { SettingsComponent } from './SettingsComponent';
import { Settings } from '../../../model/sml/Settings';
import { ParameterList } from '../../../model/sml/ParameterList';
import { ParameterListComponent } from './ParameterListComponent';

@Component({
    selector: 'sml-abstract-process',
    template: require('./AbstractProcessComponent.html')
})
export class AbstractProcessComponent extends TypedModelComponent<AbstractProcess> {
    protected createModel(): AbstractProcess {
        return undefined;
    }

    protected openSettings() {
        this.openNewChild(
            new ChildMetadata(SettingsComponent, this.model.configuration, this.config.getConfigFor('settings'))
        );
    }

    protected removeSettings() {
        this.model.configuration = null;
    }

    protected createSettings() {
        this.model.configuration = new Settings();
    }

    protected openParameters() {
        this.openNewChild(
            new ChildMetadata(ParameterListComponent, this.model.parameters, this.config.getConfigFor('sml:parameters'))
        );
    }

    protected removeParameters() {
        this.model.parameters = null;
    }

    protected createParameters() {
        this.model.parameters = new ParameterList();
    }
}
