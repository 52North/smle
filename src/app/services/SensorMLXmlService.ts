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
import { SensorMLDocumentDecoder } from './xml/SensorMLDocumentDecoder';

/**
 * Class for serialization/deserialization of SensorML XML files/AbstractProcess objects.<p>
 * 
 * This class implements the protected abstract methods: encode and decode <br>
 * of the AbstractXmlService class. <p>
 * 
 * It inherits the methods for serialization and deserialization. <br>
 * These serialization methods are the only one that use the encode and decode method.
 */
export class SensorMLXmlService extends AbstractXmlService<AbstractProcess> {
  private encoder = new SensorMLDocumentEncoder();
  private decoder = new SensorMLDocumentDecoder();

  decode(document: Document): AbstractProcess {
    return this.decoder.decode(document);
  }

  encode(description: AbstractProcess): Document {
    return this.encoder.encode(description);
  }
}
