import { AbstractNamedMetadataList } from './AbstractNamedMetadataList';
import { Capability } from './Capability';


export class CapabilityList extends AbstractNamedMetadataList {
  capabilities: Capability[] = [];
}
