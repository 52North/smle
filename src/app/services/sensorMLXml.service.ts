import {
  AbstractProcess,
  SimpleProcess,
  AggregateProcess,
  PhysicalComponent,
  PhysicalSystem,
} from '../model/sml';

import { AbstractXmlService } from './xml.service';
import * as Namespaces from './xml/namespaces';
import * as Prefixes from './xml/prefixes';
import { SweEncoder } from './xml/swe';
import { SmlEncoder } from './xml/sml';
import { IsoEncoder } from './xml/iso';

export class SensorMLXmlService extends AbstractXmlService<AbstractProcess> {
  private encoder = new SensorMLDocumentEncoder();

  decode(document: Document): AbstractProcess {
    throw new Error('unsupported');
  }

  encode(description: AbstractProcess): Document {
    return this.encoder.encode(description);
  }
}

interface Resolver {
  getPrefix(namespace: string): string;
  getNamespace(prefix: string): string;
  getPrefixes(): string[];
  getNamespaces(): string[];
}

export class SensorMLNamespaceResolver implements Resolver {
  private _prefixToNamespace: { [Key: string]: string };
  private _namespaceToPrefix: { [Key: string]: string };

  constructor() {
    this._prefixToNamespace = {
      [Prefixes.GCO]: Namespaces.GCO,
      [Prefixes.GMD]: Namespaces.GMD,
      [Prefixes.GML]: Namespaces.GML,
      [Prefixes.SML]: Namespaces.SML,
      [Prefixes.XSI]: Namespaces.XSI,
      [Prefixes.SWE]: Namespaces.SWE,
      [Prefixes.XLINK]: Namespaces.XLINK
    };
    this._namespaceToPrefix = {
      [Namespaces.GCO]: Prefixes.GCO,
      [Namespaces.GMD]: Prefixes.GMD,
      [Namespaces.GML]: Prefixes.GML,
      [Namespaces.SML]: Prefixes.SML,
      [Namespaces.XSI]: Prefixes.XSI,
      [Namespaces.SWE]: Prefixes.SWE,
      [Namespaces.XLINK]: Prefixes.XLINK
    };
  }

  getPrefix(namespace: string): string {
    return this._namespaceToPrefix[namespace];
  }

  getNamespace(prefix: string): string {
    return this._prefixToNamespace[prefix];
  }

  getNamespaces(): string[] {
    return Object.keys(this._namespaceToPrefix);
  }

  getPrefixes(): string[] {
    return Object.keys(this._prefixToNamespace);
  }
}

class SensorMLDocumentEncoder {
  private resolver = new SensorMLNamespaceResolver();
  private smlEncoder = new SmlEncoder();

  public encode(object: AbstractProcess): Document {

    let doc = this.createDocumentForProcess(object);
    this.smlEncoder.encodeProcess(object, doc, doc.documentElement);

    return doc;
  }

  getPrefix(namespace: string) {
    return this.resolver.getPrefix(namespace);
  }

  getNamespace(prefix: string) {
    return this.resolver.getNamespace(prefix);
  }

  private createDocumentForProcess(object: AbstractProcess): Document {
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
    let namespaces = this.resolver.getPrefixes()
      .map(prefix => `xmlns:${prefix}="${this.resolver.getNamespace(prefix)}"`)
      .join(' ');
    let namespace = this.resolver.getNamespace(prefix);
    let sl = `xsi:schemaLocation="${namespace} ${schemaURL}"`;
    let s = `<${prefix}:${name} ${namespaces} ${sl}></${prefix}:${name}>`;
    return new DOMParser().parseFromString(s, 'application/xml');
  }
}
