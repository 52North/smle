import { Component, Type } from '@angular/core';

import { InputList, OutputList, ParameterList, Settings } from '../../../model/sml';
import { AbstractProcess } from '../../../model/sml/AbstractProcess';
import { NestedChildMetadata } from '../base/NestedChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { NestedCardComponent } from '../basic/NestedCardComponent';
import { InputListComponent } from './InputListComponent';
import { OutputListComponent } from './OutputListComponent';
import { ParameterListComponent } from './ParameterListComponent';
import { SettingsComponent } from './SettingsComponent';

@Component({
    selector: 'sml-abstract-process',
    templateUrl: './AbstractProcessComponent.html'
})
export class AbstractProcessComponent extends TypedModelComponent<AbstractProcess> {

    public settingsComponent: Type<any> = SettingsComponent;
    public parameterListComponent: Type<any> = ParameterListComponent;
    public outputListComponent: Type<any> = OutputListComponent;
    public inputListComponent: Type<any> = InputListComponent;

    protected createModel(): AbstractProcess {
        return undefined;
    }

    protected openSettings() {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                SettingsComponent,
                'Settings',
                this.model.configuration,
                this.config.getConfigFor('settings')
            )
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
            new NestedChildMetadata(
                NestedCardComponent,
                ParameterListComponent,
                'Parameter list',
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
            new NestedChildMetadata(
                NestedCardComponent,
                OutputListComponent,
                'Output list',
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

    protected openInputs() {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                InputListComponent,
                'Input list',
                this.model.inputs,
                this.config.getConfigFor('sml:inputs').getConfigFor('sml:InputList')
            )
        );
    }

    protected removeInputs() {
        this.model.inputs = null;
    }

    protected createInputs() {
        this.model.inputs = new InputList();
    }
}
