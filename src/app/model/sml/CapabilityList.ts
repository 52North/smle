import {AbstractNamedMetadataList} from './AbstractNamedMetadataList';
import {Capability} from './Capability';
import {DisplayName} from '../../decorators/DisplayName';


export class CapabilityList extends AbstractNamedMetadataList {
    @DisplayName('Capabilities')
    capabilities: Capability[] = [];

    toString() {
        return super.toString('Capability list');
    }

    getLabel() {
        return this.toString();
    }

    getValue() {
        if (this.capabilities.length > 0) {
            return this.capabilities.join(', ');
        }
    }
}
