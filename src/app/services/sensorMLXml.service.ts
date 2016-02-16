
import {
  AbstractProcess,
  SimpleProcess,
  AggregateProcess,
  PhysicalComponent,
  PhysicalSystem
} from '../model/sensorML';

import { AbstractXmlService } from './xml.service';

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

type StringMap = { [key: string]: string };

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
  private _prefixToNamespace: { [Key: string]: string } = {
    gco: 'http://www.isotc211.org/2005/gco',
    gmd: 'http://www.isotc211.org/2005/gmd',
    gml: 'http://www.opengis.net/gml/3.2',
    sml: 'http://www.opengis.net/sensorml/2.0',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    swe: 'http://www.opengis.net/swe/2.0',
    xlink: 'http://www.w3.org/1999/xlink'
  };
  private _namespaceToPrefix: { [Key: string]: string } = {
    'http://www.isotc211.org/2005/gco': 'gco',
    'http://www.isotc211.org/2005/gmd': 'gmd',
    'http://www.opengis.net/gml/3.2': 'gml',
    'http://www.opengis.net/sensorml/2.0': 'sml',
    'http://www.w3.org/2001/XMLSchema-instance': 'xsi',
    'http://www.opengis.net/swe/2.0': 'swe',
    'http://www.w3.org/1999/xlink': 'xlink'
  };

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
