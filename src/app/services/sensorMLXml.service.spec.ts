const physicalComponentInstance =
  require('../../../examples/physicalComponentInstance.xml');
const physicalComponentType =
  require('../../../examples/physicalComponentType.xml');
const physicalSystemInstance =
  require('../../../examples/physicalSystemInstance.xml');
const physicalSystemType =
  require('../../../examples/physicalSystemType.xml');

import {
  SensorMLXmlService,
  SensorMLNamespaceResolver
} from './sensorMLXml.service';

import { PhysicalSystem } from '../model/sensorML';


describe('SensorMLXmlService', () => {

  let service = new SensorMLXmlService();

  it('should parse the physicalComponentInstance', () => {
    expect(physicalComponentInstance).not.toBeNull();
    expect(service.deserialize(physicalComponentInstance)).not.toBeNull();
  });

  it('should parse the physicalComponentType', () => {
    expect(physicalComponentType).not.toBeNull();
    expect(service.deserialize(physicalComponentType)).not.toBeNull();
  });

  it('should parse the physicalSystemInstance', () => {
    expect(physicalSystemInstance).not.toBeNull();
    expect(service.deserialize(physicalSystemInstance)).not.toBeNull();
  });

  it('should parse the physicalSystemType', () => {
    expect(physicalSystemType).not.toBeNull();
    expect(service.deserialize(physicalSystemType)).not.toBeNull();
  });

  it('should serialize the document', () => {
    let ps = new PhysicalSystem();
    let xml = service.serialize(ps);
    let doc = XPathDocument.parse(xml);

    expect(xml).toBeNull();
    expect(doc.node('/sml:PhysicalSystem')).toBeNull();
  });

});


function parse(xml: string): Document {
  let parser = new DOMParser();
  return parser.parseFromString(xml, 'application/xml');
}

class XPathDocument {
  constructor(public document: Document) {
  }

  static parse(xml: string): XPathDocument {
    let parser = new DOMParser();
    let document = parser.parseFromString(xml, 'application/xml');
    return new XPathDocument(document);
  }

  eval(expr: string, context?: Node) {
    let ctx = context || this.document.documentElement;
    let rslv: XPathNSResolver = {
      lookupNamespaceURI(prefix: string): string {
        return new SensorMLNamespaceResolver().getNamespace(prefix);
      }
    };
    return this.document.evaluate(
      expr, ctx, rslv, XPathResult.ANY_TYPE, null);
  }

  node(expr: string, context?: Node)
    : boolean | string | number | Node | Node[] {
    var result = this.eval(expr, context);

    switch (result.resultType) {
      case XPathResult.FIRST_ORDERED_NODE_TYPE:
        return result.singleNodeValue;
      case XPathResult.ANY_UNORDERED_NODE_TYPE:
        return result.singleNodeValue;
      case XPathResult.BOOLEAN_TYPE:
        return result.booleanValue;
      case XPathResult.NUMBER_TYPE:
        return result.numberValue;
      case XPathResult.STRING_TYPE:
        return result.stringValue;
      case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        let iArray: Node[] = [];
        let node: Node = result.iterateNext();
        while (node != null) {
          iArray.push(node);
          node = result.iterateNext();
        }
        return iArray;
      case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
      case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
        let sArray: Node[] = new Array<Node>(result.snapshotLength);
        for (let i = 0; i < result.snapshotLength; ++i) {
          sArray[i] = result.snapshotItem(i);
        }
        return sArray;
      default:
        throw new Error('Unsupported result type: ' + result.resultType);
    }
  }
}
