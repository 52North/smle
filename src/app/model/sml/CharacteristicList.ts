
import { AbstractNamedMetadataList } from './AbstractNamedMetadataList';
import { Characteristic } from './Characteristic';


export class CharacteristicList extends AbstractNamedMetadataList {
  characteristics: Characteristic[] = [];
}
