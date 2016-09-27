import { AbstractNamedMetadataList } from './AbstractNamedMetadataList';
import { Capability } from './Capability';
import { DisplayName } from '../../decorators/DisplayName';


export class CapabilityList extends AbstractNamedMetadataList {
    @DisplayName('Capabilities')
    capabilities: Capability[] = [];

    toString() {
        return super.toString('Capability list');
    }
}
