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

  decode(document: Document): AbstractProcess {
    throw new Error('unsupported');
  }

  encode(description: AbstractProcess): Document {
    if (description instanceof SimpleProcess) {
      return new SimpleProcessEncoder().encodeDocument(description);
    } else if (description instanceof AggregateProcess) {
      return new AggregateProcessEncoder().encodeDocument(description);
    } else if (description instanceof PhysicalComponent) {
      return new PhysicalComponentEncoder().encodeDocument(description);
    } else if (description instanceof PhysicalSystem) {
      return new PhysicalSystemEncoder().encodeDocument(description);
    } else {
      throw new Error('Unsupported process type: ' + description);
    }
  }
}

abstract class Encoder<T> {
  abstract encode(object: T, parent: Node): void;
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

abstract class DocumentEncoder<T> extends Encoder<T> {
  constructor(private prefix: string,
    private name: string,
    private schemaURL: string,
    private resolver: Resolver) {
    super();
  }

  encodeDocument(object: T): Document {
    let document = this.createDocument(this.prefix, this.name, this.schemaURL);
    this.encode(object, document.documentElement);
    return document;
  }

  getPrefix(namespace: string) {
    return this.resolver.getPrefix(namespace);
  }

  getNamespace(prefix: string) {
    return this.resolver.getNamespace(prefix);
  }

  private createDocument(prefix: string,
    name: string, schemaURL: string): Document {

    let namespaces = this.resolver.getPrefixes()
      .map(prefix => `xmlns:${prefix}="${this.resolver.getNamespace(prefix)}"`)
      .join(' ');
    let namespace = this.resolver.getNamespace(prefix);
    let sl = `xsi:schemaLocation="${namespace} ${schemaURL}"`;
    let s = `<${prefix}:${name} ${namespaces} ${sl}></${prefix}:${name}>`;
    return new DOMParser().parseFromString(s, 'application/xml');
  }
}

abstract class SensorMLDocumentEncoder<T> extends DocumentEncoder<T> {

  constructor(name: string, schemaURL: string
    = 'http://schemas.opengis.net/sensorML/2.0/sensorML.xsd') {
    super('sml', name, schemaURL, new SensorMLNamespaceResolver());
  }


}

class SimpleProcessEncoder extends SensorMLDocumentEncoder<SimpleProcess> {

  constructor() {
    super('SimpleProcess',
      'http://schemas.opengis.net/sensorML/2.0/simple_process.xsd');
  }

  encode(object: SimpleProcess, parent: Node) {
  }
}

class AggregateProcessEncoder
  extends SensorMLDocumentEncoder<AggregateProcess> {

  constructor() {
    super('AggregateProcess',
      'http://schemas.opengis.net/sensorML/2.0/aggregate_process.xsd');
  }

  encode(object: AggregateProcess, parent: Node) {
  }
}

class PhysicalSystemEncoder
  extends SensorMLDocumentEncoder<PhysicalSystem> {

  constructor() {
    super('PhysicalSystem',
      'http://schemas.opengis.net/sensorML/2.0/physical_system.xsd');
  }

  encode(object: PhysicalSystem, parent: Node) {
  }
}

class PhysicalComponentEncoder
  extends SensorMLDocumentEncoder<PhysicalComponent> {

  constructor() {
    super('PhysicalComponent',
      'http://schemas.opengis.net/sensorML/2.0/physical_component.xsd');
  }

  encode(object: PhysicalComponent, parent: Node) {
  }
}
