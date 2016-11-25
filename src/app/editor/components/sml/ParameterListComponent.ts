import { Component, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { ParameterList, Parameter } from '../../../model/sml';
import { ChildMetadata } from '../base/TypedModelComponent';
import { ParameterComponent } from './ParameterComponent';
import {
    SweText,
    SweTime,
    SweCount,
    SweBoolean,
    SweQuantity,
    SweCategory,
    SweTimeRange,
    SweQuantityRange
} from '../../../model/swe';

@Component({
    selector: 'sml-parameter-list',
    template: require('./ParameterListComponent.html')
})
export class ParameterListComponent extends EditorComponent<ParameterList> {

    protected options = [
        { name: (new SweText()).toString(), type: SweText },
        { name: (new SweTime()).toString(), type: SweTime },
        { name: (new SweCount()).toString(), type: SweCount },
        { name: (new SweBoolean()).toString(), type: SweBoolean },
        { name: (new SweQuantity()).toString(), type: SweQuantity },
        { name: (new SweCategory()).toString(), type: SweCategory },
        { name: (new SweTimeRange()).toString(), type: SweTimeRange },
        { name: (new SweQuantityRange()).toString(), type: SweQuantityRange }
        // { name: (new SweDataRecord()).toString(), type: SweDataRecord },
        // { name: (new SweDataArray()).toString(), type: SweDataArray }
    ];

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): ParameterList {
        return new ParameterList();
    }

    protected openNewParameter(parameter: Parameter) {
        this.openNewChild(
            new ChildMetadata(ParameterComponent, parameter, this.config.getConfigFor('parameter'))
        );
    }

    protected onAddParameter(parameterType: Type<any>): void {
        let parameter = new Parameter();
        parameter.value = new parameterType();
        this.model.parameters.push(parameter);
    }

    protected onRemoveParameter(index: number): void {
        this.closeChildWithModel(this.model.parameters[index]);
        this.model.parameters.splice(index, 1);
    }
}
