import { Component, Type } from '@angular/core';

import { DataInterface, ObservableProperty, Parameter, ParameterList } from '../../../model/sml';
import {
    SweBoolean,
    SweCategory,
    SweCount,
    SweDataArray,
    SweDataRecord,
    SweQuantity,
    SweQuantityRange,
    SweText,
    SweTime,
    SweTimeRange,
} from '../../../model/swe';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { ParameterComponent } from './ParameterComponent';

@Component({
    selector: 'sml-parameter-list',
    templateUrl: './ParameterListComponent.html'
})
export class ParameterListComponent extends TypedModelComponent<ParameterList> {

    protected options = [
        { name: (new SweText()).toString(), type: SweText },
        { name: (new SweTime()).toString(), type: SweTime },
        { name: (new SweCount()).toString(), type: SweCount },
        { name: (new SweBoolean()).toString(), type: SweBoolean },
        { name: (new SweQuantity()).toString(), type: SweQuantity },
        { name: (new SweCategory()).toString(), type: SweCategory },
        { name: (new SweTimeRange()).toString(), type: SweTimeRange },
        { name: (new SweQuantityRange()).toString(), type: SweQuantityRange },
        { name: (new DataInterface()).toString(), type: DataInterface },
        { name: (new ObservableProperty()).toString(), type: ObservableProperty },
        { name: (new SweDataRecord()).toString(), type: SweDataRecord },
        { name: (new SweDataArray()).toString(), type: SweDataArray }
    ];

    constructor() {
        super();
    }

    protected createModel(): ParameterList {
        return new ParameterList();
    }

    protected openNewParameter(parameter: Parameter) {
        this.openNewChild(
            new ChildMetadata(ParameterComponent, parameter, this.config.getConfigFor('sml:parameter'))
        );
    }

    protected onAddParameter(parameterType: Type<any>): void {
        const parameter = new Parameter();
        parameter.value = new parameterType();
        this.model.parameters.push(parameter);
    }

    protected onRemoveParameter(index: number): void {
        this.model.parameters.splice(index, 1);
    }

    protected isItemVisible(parameter: Parameter): boolean {
        return true;
    }
}
