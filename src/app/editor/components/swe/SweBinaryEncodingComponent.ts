import { Component } from '@angular/core';

import { SweBinaryBlock } from '../../../model/swe/SweBinaryBlock';
import { SweBinaryComponent } from '../../../model/swe/SweBinaryComponent';
import { SweBinaryEncoding } from '../../../model/swe/SweBinaryEncoding';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweBinaryBlockComponent } from './SweBinaryBlockComponent';
import { SweBinaryComponentComponent } from './SweBinaryComponentComponent';

@Component({
    selector: 'swe-binary-encoding',
    templateUrl: './SweBinaryEncodingComponent.html'
})
export class SweBinaryEncodingComponent extends TypedModelComponent<SweBinaryEncoding> {
    protected createModel(): SweBinaryEncoding {
        return new SweBinaryEncoding();
    }

    protected addBinaryBlock() {
        const newItem = new SweBinaryBlock();
        this.model.members.push(newItem);
    }

    protected addBinaryComponent() {
        const newItem = new SweBinaryComponent();
        this.model.members.push(newItem);
    }

    protected openNewItem(item: SweBinaryBlock | SweBinaryComponent) {
        let childMetadata: ChildMetadata<any>;

        if (item instanceof SweBinaryBlock) {
            childMetadata = new ChildMetadata(SweBinaryBlockComponent, item, this.config.getConfigFor('members'));
        }

        if (item instanceof SweBinaryComponent) {
            childMetadata = new ChildMetadata(SweBinaryComponentComponent, item, this.config.getConfigFor('members'));
        }

        this.openAsChild.emit(childMetadata);
    }

    removeMember(index: number) {
        this.model.members.splice(index, 1);
    }
}
