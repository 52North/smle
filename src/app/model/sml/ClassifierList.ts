import {AbstractMetadataList} from './AbstractMetadataList';
import {Term} from './Term';
import {DisplayName} from '../../decorators/DisplayName';


export class ClassifierList extends AbstractMetadataList {
    @DisplayName('Classifiers')
    classifiers: Term[] = [];

    toString() {
        return 'Classifier list';
    }

    getLabel() {
        return this.toString();
    }

    getValue() {
        if (this.classifiers.length > 0) {
            return this.classifiers.join(', ');
        }
    }
}
