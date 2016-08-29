import {Component} from '@angular/core';
import {TypedModelComponent, ChildMetadata} from '../base/TypedModelComponent';
import {SweBinaryEncoding} from '../../../model/swe/SweBinaryEncoding';
import {SweEncodingComponent} from './SweEncodingComponent';
import {NumberFieldComponent} from '../basic/NumberFieldComponent';
import {ListComponent} from '../basic/ListComponent';
import {SweBinaryBlock} from '../../../model/swe/SweBinaryBlock';
import {SweBinaryComponent} from '../../../model/swe/SweBinaryComponent';
import {SweBinaryBlockComponent} from './SweBinaryBlockComponent';
import {SweBinaryComponentComponent} from './SweBinaryComponentComponent';

@Component({
    selector: 'swe-binary-encoding',
    template: require('./SweBinaryEncodingComponent.html'),
    directives: [SweEncodingComponent, NumberFieldComponent, ListComponent]
})
export class SweBinaryEncodingComponent extends TypedModelComponent<SweBinaryEncoding> {
    protected createModel(): SweBinaryEncoding {
        return new SweBinaryEncoding();
    }

    private addBinaryBlock() {
        var newItem = new SweBinaryBlock();
        this.model.members.push(newItem);
    }

    private addBinaryComponent() {
        var newItem = new SweBinaryComponent();
        this.model.members.push(newItem);
    }

    private openNewItem(item: SweBinaryBlock | SweBinaryComponent) {
        var childMetadata: ChildMetadata;

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
