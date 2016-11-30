import { Component } from '@angular/core';
import { TypedModelComponent, ChildMetadata } from '../base/TypedModelComponent';
import { AbstractProcess } from '../../../model/sml/AbstractProcess';
import { SettingsComponent } from './SettingsComponent';
import { Settings, ParameterList, OutputList } from '../../../model/sml';
import { ParameterListComponent } from './ParameterListComponent';
import { OutputListComponent } from './OutputListComponent';

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
            new ChildMetadata(
                ParameterListComponent,
                this.model.parameters,
                this.config.getConfigFor('sml:parameters').getConfigFor('sml:ParameterList')
            )
        );
    }

    protected removeParameters() {
        this.model.parameters = null;
    }

    protected createParameters() {
        this.model.parameters = new ParameterList();
    }

    protected openOutputs() {
        this.openNewChild(
            new ChildMetadata(
                OutputListComponent,
                this.model.outputs,
                this.config.getConfigFor('sml:outputs').getConfigFor('sml:OutputList')
            )
        );
    }

    protected removeOutputs() {
        this.model.outputs = null;
    }

    protected createOutputs() {
        this.model.outputs = new OutputList();
    }
}
