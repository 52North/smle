import { Component, Type } from '@angular/core';
import { TypedModelComponent, ChildMetadata } from '../base';
import { InputList, Input, DataInterface, ObservableProperty } from '../../../model/sml';
import { InputComponent } from './InputComponent';
import {
    SweText,
    SweTime,
    SweCount,
    SweBoolean,
    SweQuantity,
    SweCategory,
    SweTimeRange,
    SweQuantityRange,
    SweDataArray,
    SweDataRecord
} from '../../../model/swe';

@Component({
    selector: 'sml-input-list',
    template: require('./InputListComponent.html')
})
export class InputListComponent extends TypedModelComponent<InputList> {

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

    protected createModel(): InputList {
        return new InputList();
    }

    protected openNewInput(input: Input) {
        this.openNewChild(
            new ChildMetadata(InputComponent, input, this.config.getConfigFor('sml:input'))
        );
    }

    protected onAddInput(inputType: Type<any>): void {
        let input = new Input();
        input.value = new inputType();
        this.model.inputs.push(input);
    }

    protected onRemoveInput(index: number): void {
        this.model.inputs.splice(index, 1);
    }

}
