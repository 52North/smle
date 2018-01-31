import { Component, Type } from '@angular/core';

import { DataInterface, Input, InputList, ObservableProperty } from '../../../model/sml';
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
import { InputComponent } from './InputComponent';

@Component({
    selector: 'sml-input-list',
    templateUrl: './InputListComponent.html'
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
        const input = new Input();
        input.value = new inputType();
        this.model.inputs.push(input);
    }

    protected onRemoveInput(index: number): void {
        this.model.inputs.splice(index, 1);
    }

}
