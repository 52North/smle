
import { AbstractNamedMetadataList } from './AbstractNamedMetadataList';
import { Characteristic } from './Characteristic';


export class CharacteristicList extends AbstractNamedMetadataList {
  characteristics: Characteristic[] = [];

  toString() {
    return super.toString('Characteristic list');
  }
}
