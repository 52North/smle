import {AbstractMetadataList} from './AbstractMetadataList';
import {Term} from './Term';
import {DisplayName} from '../../decorators/DisplayName';


export class ClassifierList extends AbstractMetadataList {
    @DisplayName('Classifiers')
    classifiers: Term[] = [];

    toString() {
        return 'Classifier list';
    }
}
