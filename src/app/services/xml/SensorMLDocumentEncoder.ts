import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { AggregateProcess } from '../../model/sml/AggregateProcess';
import { PhysicalComponent } from '../../model/sml/PhysicalComponent';
import { PhysicalSystem } from '../../model/sml/PhysicalSystem';
import { SensorMLEncoder } from './SensorMLEncoder';
import { SensorMLNamespaceResolver } from './SensorMLNamespaceResolver';
import { SimpleProcess } from '../../model/sml/SimpleProcess';

export class SensorMLDocumentEncoder {
    private resolver = new SensorMLNamespaceResolver();
    private encoder = new SensorMLEncoder();

    public encode(object: AbstractProcess): Document {
        const doc = this.createDocumentForProcess(object);
        this.encoder.encodeProcess(object, doc, doc.documentElement);
        return doc;
    }

    public createDocumentForProcess(object: AbstractProcess): Document {
        if (object instanceof SimpleProcess) {
            return this.createDocument('sml', SimpleProcess.NAME, SimpleProcess.SCHEMA);
        } else if (object instanceof AggregateProcess) {
            return this.createDocument('sml', AggregateProcess.NAME, AggregateProcess.SCHEMA);
        } else if (object instanceof PhysicalComponent) {
            return this.createDocument('sml', PhysicalComponent.NAME, PhysicalComponent.SCHEMA);
        } else if (object instanceof PhysicalSystem) {
            return this.createDocument('sml', PhysicalSystem.NAME, PhysicalSystem.SCHEMA);
        } else {
            throw new Error('Unsupported process type');
        }
    }

    private createDocument(prefix: string, name: string, schemaURL: string): Document {
        const namespaces = this.resolver.getPrefixes()
            .map((entry) => `xmlns:${entry}="${this.resolver.getNamespace(entry)}"`)
            .join(' ');
        const namespace = this.resolver.getNamespace(prefix);
        const sl = `xsi:schemaLocation="${namespace} ${schemaURL}"`;
        const s = `<${prefix}:${name} ${namespaces} ${sl}></${prefix}:${name}>`;
        return new DOMParser().parseFromString(s, 'application/xml');
    }
}
