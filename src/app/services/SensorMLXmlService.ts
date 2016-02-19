import {
  AbstractProcess,
  SimpleProcess,
  AggregateProcess,
  PhysicalComponent,
  PhysicalSystem,
} from '../model/sml';

import { AbstractXmlService } from './AbstractXmlService';
import { Namespaces } from './xml/Namespaces';
import { Prefixes } from './xml/Prefixes';
import { SensorMLNamespaceResolver } from './xml/SensorMLNamespaceResolver';
import { SensorMLDocumentEncoder } from './xml/SensorMLDocumentEncoder';

export class SensorMLXmlService extends AbstractXmlService<AbstractProcess> {
  private encoder = new SensorMLDocumentEncoder();

  decode(document: Document): AbstractProcess {
    throw new Error('unsupported');
  }

  encode(description: AbstractProcess): Document {
    return this.encoder.encode(description);
  }
}
