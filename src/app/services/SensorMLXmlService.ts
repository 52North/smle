import {
    AbstractProcess,
} from '../model/sml';

import { AbstractXmlService } from './AbstractXmlService';
import { SensorMLDocumentEncoder } from './xml/SensorMLDocumentEncoder';
import { SensorMLDocumentDecoder } from './xml/SensorMLDocumentDecoder';

export class SensorMLXmlService extends AbstractXmlService<AbstractProcess> {
    private encoder = new SensorMLDocumentEncoder();
    private decoder = new SensorMLDocumentDecoder();

    protected decode(document: Document): AbstractProcess {
        return this.decoder.decode(document);
    }

    protected encode(description: AbstractProcess): Document {
        return this.encoder.encode(description);
    }
}
