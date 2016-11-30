import { Component, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { OutputList, Output } from '../../../model/sml';
import { ChildMetadata } from '../base/TypedModelComponent';
import { OutputComponent } from './OutputComponent';
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
    selector: 'sml-output-list',
    template: require('./OutputListComponent.html')
})
export class OutputListComponent extends EditorComponent<OutputList> {

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

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): OutputList {
        return new OutputList();
    }

    protected openNewOutput(output: Output) {
        this.openNewChild(
            new ChildMetadata(OutputComponent, output, this.config.getConfigFor('sml:output'))
        );
    }

    protected onAddOutput(outputType: Type<any>): void {
        let output = new Output();
        output.value = new outputType();
        this.model.outputs.push(output);
    }

    protected onRemoveOutput(index: number): void {
        this.closeChildWithModel(this.model.outputs[index]);
        this.model.outputs.splice(index, 1);
    }

}
