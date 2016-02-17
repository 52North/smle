
import {
  AbstractProcess,
  SimpleProcess,
  AggregateProcess,
  PhysicalComponent,
  PhysicalSystem,
  Term,
  Characteristics,
  Characteristic
} from '../model/sensorML';

import {
  AbstractDataComponent,
  SweEncoding,
  AbstractSimpleComponent,
  AbstractSWE,
  AbstractSWEIdentifiable,
  AllowedTimes,
  AllowedTokens,
  AllowedValues,
  SweBinaryEncoding,
  SweByteEncoding,
  SweByteOrder,
  SweNilValue,
  SweAnyRange,
  SweAnyScalar,
  SweBinaryBlock,
  SweBinaryComponent,
  SweBoolean,
  SweCategory,
  SweCategoryRange,
  SweCoordinate,
  SweCount,
  SweCountRange,
  SweDataArray,
  SweDataChoice,
  SweDataComponent,
  SweDataRecord,
  SweElementType,
  SweField,
  SweQuality,
  SweQuantity,
  SweQuantityRange,
  SweText,
  SweTime,
  SweTimeRange,
  SweVector,
  SweTextEncoding,
  SweXmlEncoding,
} from '../model/swe';

import { AbstractXmlService } from './xml.service';

const NS_GCO = 'http://www.isotc211.org/2005/gco';
const NS_GMD = 'http://www.isotc211.org/2005/gmd';
const NS_GML = 'http://www.opengis.net/gml/3.2';
const NS_SML = 'http://www.opengis.net/sensorml/2.0';
const NS_XSI = 'http://www.w3.org/2001/XMLSchema-instance';
const NS_SWE = 'http://www.opengis.net/swe/2.0';
const NS_XLINK = 'http://www.w3.org/1999/xlink';

const NS_GCO_PREFIX = 'gco';
const NS_GMD_PREFIX = 'gmd';
const NS_GML_PREFIX = 'gml';
const NS_SML_PREFIX = 'sml';
const NS_XSI_PREFIX = 'xsi';
const NS_SWE_PREFIX = 'swe';
const NS_XLINK_PREFIX = 'xlink';

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
      [NS_GCO_PREFIX]: NS_GCO,
      [NS_GMD_PREFIX]: NS_GMD,
      [NS_GML_PREFIX]: NS_GML,
      [NS_SML_PREFIX]: NS_SML,
      [NS_XSI_PREFIX]: NS_XSI,
      [NS_SWE_PREFIX]: NS_SWE,
      [NS_XLINK_PREFIX]: NS_XLINK
    };
    this._namespaceToPrefix = {
      [NS_GCO]: NS_GCO_PREFIX,
      [NS_GMD]: NS_GMD_PREFIX,
      [NS_GML]: NS_GML_PREFIX,
      [NS_SML]: NS_SML_PREFIX,
      [NS_XSI]: NS_XSI_PREFIX,
      [NS_SWE]: NS_SWE_PREFIX,
      [NS_XLINK]: NS_XLINK_PREFIX
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

  protected encodeSensorMLTerm(term: Term, document: Document): Node {
    var termNode = document.createElementNS(NS_SML, 'sml:Term');

    if (term.definition) {
      termNode.setAttribute('definition', term.definition);
    }

    if (term.label) {
      let labelNode = document.createElementNS(NS_SML, 'sml:label');
      labelNode.textContent = term.label;
      termNode.appendChild(labelNode);
    }

    if (term.codeSpace) {
      let codeSpaceNode = document.createElementNS(NS_SML, 'sml:codeSpace');
      codeSpaceNode.setAttributeNS(NS_XLINK, 'xlink:href', term.codeSpace);
      termNode.appendChild(codeSpaceNode);
    }

    if (term.value) {
      let labelNode = document.createElementNS(NS_SML, 'sml:value');
      labelNode.textContent = term.value;
      termNode.appendChild(labelNode);
    }

    if (term.extension) {
      throw new Error('Extensions are not supported!');
    }

    return termNode;
  }

  protected encodeSensorMLIdentification(identification: Term[], document: Document): Node {
    let identificationNode = document.createElementNS(NS_SML, 'sml:identification');
    let identifierListNode = this.encodeSensorMLIdentifierList(identification, document);
    identificationNode.appendChild(identifierListNode);
    return identificationNode;
  }

  protected encodeSensorMLIdentifierList(identifier: Term[], document: Document): Node {
    let identifierListNode = document.createElementNS(NS_SML, 'sml:IdentifierList');
    identifier.forEach(term => identifierListNode.appendChild(this.encodeSensorMLIdentifier(term, document)));
    return identifierListNode;
  }

  protected encodeSensorMLIdentifier(identifier: Term, document: Document): Node {
    let identifierNode = document.createElementNS(NS_SML, 'sml:identifier');
    identifierNode.appendChild(this.encodeSensorMLTerm(identifier, document));
    return identifierNode;
  }

  protected encodeSensorMLClassification(classification: Term[], document: Document): Node {
    let classificationNode = document.createElementNS(NS_SML, 'sml:classification');
    let classifierListNode = this.encodeSensorMLClassifierList(classification, document);
    classificationNode.appendChild(classifierListNode);
    return classificationNode;
  }

  protected encodeSensorMLClassifierList(classifier: Term[], document: Document): Node {
    let classifierListNode = document.createElementNS(NS_SML, 'sml:ClassifierList');
    classifier.forEach(term => classifierListNode.appendChild(this.encodeSensorMLClassifier(term, document)));
    return classifierListNode;
  }

  protected encodeSensorMLClassifier(classifier: Term, document: Document): Node {
    let classifierNode = document.createElementNS(NS_SML, 'sml:classifier');
    classifierNode.appendChild(this.encodeSensorMLTerm(classifier, document));
    return classifierNode;
  }

  protected encodeSensorMLCharacteristics(characteristics: Characteristics, document: Document): Node {
    let characteristicsNode = document.createElementNS(NS_SML, 'sml:characteristics');

    if (characteristics.name) {
      characteristicsNode.setAttribute('name', characteristics.name);
    }

    if (characteristics.characteristics) {
      characteristicsNode.appendChild(this.encodeSensorMLCharacteristicList(characteristics.characteristics, document));
    }

    return characteristicsNode;
  }

  protected encodeSensorMLCharacteristicList(characteristics: Characteristic[], document: Document): Node {
    let characteristicListNode = document.createElementNS(NS_SML, 'sml:CharacteristicList');
    characteristics.forEach(characteristic =>
      characteristicListNode.appendChild(this.encodeSensorMLCharacteristic(characteristic, document)));
    return characteristicListNode;
  }

  protected encodeSensorMLCharacteristic(characteristic: Characteristic, document: Document): Node {
    let characteristicNode = document.createElementNS(NS_SML, 'sml:characteristic');
    if (characteristic.name) {
      characteristicNode.setAttribute('name', characteristic.name);
    }
    if (characteristic.component) {
      characteristicNode.appendChild(this.encodeSweDataComponent(characteristic.component, document));
    }
    return characteristicNode;
  }

  protected encodeSweDataComponent(component: AbstractDataComponent, document: Document): Node {
    if (component instanceof SweVector) {
      return this.encodeSweVector(component, document);
    }
    if (component instanceof SweDataRecord) {
      return this.encodeSweDataRecord(component, document);
    }
    if (component instanceof SweDataArray) {
      return this.encodeSweDataArray(component, document);
    }
    if (component instanceof SweDataChoice) {
      return this.encodeSweDataChoice(component, document);
    }
    if (component instanceof SweQuantityRange) {
      return this.encodeSweQuantityRange(component, document);
    }
    if (component instanceof SweTimeRange) {
      return this.encodeSweTimeRange(component, document);
    }
    if (component instanceof SweCountRange) {
      return this.encodeSweCountRange(component, document);
    }
    if (component instanceof SweCategoryRange) {
      return this.encodeSweCategoryRange(component, document);
    }
    if (component instanceof SweBoolean) {
      return this.encodeSweBoolean(component, document);
    }
    if (component instanceof SweCount) {
      return this.encodeSweCount(component, document);
    }
    if (component instanceof SweQuantity) {
      return this.encodeSweQuantity(component, document);
    }
    if (component instanceof SweTime) {
      return this.encodeSweTime(component, document);
    }
    if (component instanceof SweCategory) {
      return this.encodeSweCategory(component, document);
    }
    if (component instanceof SweText) {
      return this.encodeSweText(component, document);
    }
    throw new Error('Unsupported SWE data component');
  }

  protected encodeSweCoordinate(coord: SweCoordinate, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:coordinate');

    if (coord.name) {
      node.setAttribute('name', coord.name);
    }

    if (coord.coordinate) {
      node.appendChild(this.encodeSweDataComponent(coord.coordinate, document));
    }

    return node;
  }

  protected encodeSweVector(component: SweVector, document: Document): Node {

    let node = document.createElementNS(NS_SWE, 'swe:DataRecord');

    this.encodeAbstractDataComponent(node, component, document);

    if (component.coordinates) {
      component.coordinates.forEach(coord =>
        node.appendChild(this.encodeSweCoordinate(coord, document)));
    }

    if (component.referenceFrame) {
      node.setAttribute('referenceFrame', component.referenceFrame);
    }

    if (component.localFrame) {
      node.setAttribute('localFrame', component.localFrame);
    }

    return node;
  }

  protected encodeSweField(field: SweField, document: Document): Node {
    let fieldNode = document.createElementNS(NS_SWE, 'swe:field');
    if (field.name) {
      fieldNode.setAttribute('name', field.name);
    }
    if (field.component) {
      fieldNode.appendChild(this.encodeSweDataComponent(field.component, document));
    }
    return fieldNode;
  }

  protected encodeSweDataRecord(component: SweDataRecord, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:DataRecord');

    this.encodeAbstractDataComponent(node, component, document);

    if (component.fields) {
      component.fields.forEach(field => node.appendChild(this.encodeSweField(field, document)));
    }

    return node;
  }

  protected encodeSweDataArray(component: SweDataArray, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:DataArray');

    this.encodeAbstractDataComponent(node, component, document);

    if (component.elementCount != null) {
      let countNode = document.createElementNS(NS_SWE, 'swe:elementCount');
      countNode.textContent = component.elementCount.toString();
      node.appendChild(countNode);
    }

    if (component.elementType) {
      node.appendChild(this.encodeSweElementType(component.elementType, document));
    }

    if (component.encoding) {
      let encodingNode = document.createElementNS(NS_SWE, 'swe:encoding');
      encodingNode.appendChild(this.encodeAbstractEncoding(component.encoding, document));
      node.appendChild(encodingNode);
    }

    if (component.values) {
      let valuesNode = document.createElementNS(NS_SWE, 'swe:values');
      valuesNode.textContent = component.values.toString();
      node.appendChild(component.values);
    }

    return node;
  }

  protected encodeAbstractEncoding(encoding: SweEncoding, document: Document): Node {
    if (encoding instanceof SweTextEncoding) {
      return this.encodeSweTextEncoding(encoding, document);
    }
    if (encoding instanceof SweBinaryEncoding) {
      return this.encodeSweBinaryEncoding(encoding, document);
    }
    if (encoding instanceof SweXmlEncoding) {
      return this.encodeSweXmlEncoding(encoding, document);
    }
    throw new Error('Unsupported encoding type');
  }

  protected encodeSweTextEncoding(encoding: SweTextEncoding, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:TextEncoding');

    this.encodeAbstractSwe(node, encoding, document);

    if (encoding.collapseWhiteSpace != null) {
      node.setAttribute('collapseWhiteSpace', encoding.collapseWhiteSpace.toString());
    }

    if (encoding.decimalSeperator) {
      node.setAttribute('decimalSeperator', encoding.decimalSeperator);
    }

    if (encoding.tokenSeperator) {
      node.setAttribute('tokenSeperator', encoding.tokenSeperator);
    }

    if (encoding.blockSeperator) {
      node.setAttribute('blockSeperator', encoding.blockSeperator);
    }

    return node;
  }

  protected encodeSweBinaryEncoding(encoding: SweBinaryEncoding, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:BinaryEncoding');

    this.encodeAbstractSwe(node, encoding, document);

    if (encoding.members) {
      encoding.members.forEach(member => {
        let memberNode = document.createElementNS(NS_SWE, 'swe:member');
        if (member instanceof SweBinaryComponent) {
          memberNode.appendChild(this.encodeSweBinaryComponent(member, document));
        } else {
          memberNode.appendChild(this.encodeSweBinaryBlock(member, document));
        }
        node.appendChild(memberNode);
      });
    }

    if (encoding.byteOrder != null) {
      node.setAttribute('byteOrder', encoding.byteOrder);
    }

    if (encoding.byteEncoding != null) {
      node.setAttribute('byteEncoding', encoding.byteEncoding);
    }

    if (encoding.byteLength != null) {
      node.setAttribute('byteLength', encoding.byteLength.toString());
    }

    return node;
  }

  protected encodeSweBinaryComponent(block: SweBinaryComponent, document: Document): Node {

    let node = document.createElementNS(NS_SWE, 'swe:Component');

    this.encodeAbstractSwe(node, block, document);

    if (block.encryption) {
      node.setAttribute('encryption', block.encryption);
    }

    if (block.significantBits != null) {
      node.setAttribute('significantBits', block.significantBits.toString());
    }

    if (block.bitLength != null) {
      node.setAttribute('bitLength', block.bitLength.toString());
    }

    if (block.byteLength != null) {
      node.setAttribute('byteLength', block.byteLength.toString());
    }

    if (block.dataType) {
      node.setAttribute('dataType', block.dataType);
    }

    if (block.ref) {
      node.setAttribute('ref', block.ref);
    }

    return node;
  }

  protected encodeSweBinaryBlock(block: SweBinaryBlock, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:Block');

    this.encodeAbstractSwe(node, block, document);

    if (block.compression) {
      node.setAttribute('compression', block.compression);
    }

    if (block.encryption) {
      node.setAttribute('encryption', block.encryption);
    }

    if (block.paddingBytesAfter != null) {
      node.setAttribute('paddingBytes-after', block.paddingBytesAfter.toString());
    }

    if (block.paddingBytesBefore != null) {
      node.setAttribute('paddingBytes-before', block.paddingBytesBefore.toString());
    }

    if (block.byteLength != null) {
      node.setAttribute('byteLength', block.byteLength.toString());
    }

    if (block.ref) {
      node.setAttribute('ref', block.ref);
    }

    return node;
  }

  protected encodeSweXmlEncoding(encoding: SweXmlEncoding, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:XMLEncoding');

    this.encodeAbstractSwe(node, encoding, document);

    return node;
  }

  protected encodeSweElementType(type: SweElementType, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:elementType');

    if (type.name) {
      node.setAttribute('name', type.name);
    }

    if (type.type) {
      node.appendChild(this.encodeSweDataComponent(type.type, document));
    }

    return node;
  }

  protected encodeSweDataChoice(component: SweDataChoice, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:DataChoice');

    this.encodeAbstractDataComponent(node, component, document);

    if (component.choiceValue && component.choiceValue.length > 0) {
      let choiceValueNode = document.createElementNS(NS_SWE, 'swe:choiceValue');
      component.choiceValue.forEach(category =>
        choiceValueNode.appendChild(this.encodeSweCategory(category, document)));
      node.appendChild(choiceValueNode);
    }

    if (component.items) {
      component.items.forEach(item => {
        let itemNode = document.createElementNS(NS_SWE, 'swe:item');
        if (item.name) {
          itemNode.setAttribute('name', item.name);
        }
        if (item.item) {
          itemNode.appendChild(this.encodeSweDataComponent(item.item, document));
        }
        node.appendChild(itemNode);
      });
    }

    throw new Error('not yet supported');
  }

  protected encodeSweQuantityRange(component: SweQuantityRange, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:QuantityRange');

    this.encodeAbstractSimpleComponent(node, component, document);

    if (component.uom) {
      let uomNode = document.createElementNS(NS_SWE, 'swe:uom');
      if (component.uom.code) {
        uomNode.setAttribute('code', component.uom.code);
      }
      if (component.uom.href) {
        uomNode.setAttributeNS(NS_XLINK, 'xlink:href', component.uom.href);
      }
      node.appendChild(uomNode);
    }

    if (component.constraint) {
      let constraintNode = document.createElementNS(NS_SWE, 'swe:contraint');
      constraintNode.appendChild(this.encodeAllowedValues(component.constraint, document));
      node.appendChild(constraintNode);
    }

    if (component.value != null) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');
      valueNode.textContent = `${component.value[0].toString()} ${component.value[1].toString()}`;
      node.appendChild(valueNode);
    }

    return node;
  }

  protected encodeSweTimeRange(component: SweTimeRange, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:TimeRange');

    this.encodeAbstractSimpleComponent(node, component, document);

    if (component.uom) {
      let uomNode = document.createElementNS(NS_SWE, 'swe:uom');
      if (component.uom.code) {
        uomNode.setAttribute('code', component.uom.code);
      }
      if (component.uom.href) {
        uomNode.setAttributeNS(NS_XLINK, 'xlink:href', component.uom.href);
      }
      node.appendChild(uomNode);
    }

    if (component.constraint) {
      let constraintNode = document.createElementNS(NS_SWE, 'swe:contraint');
      constraintNode.appendChild(this.encodeAllowedTimes(component.constraint, document));
      node.appendChild(constraintNode);
    }

    if (component.value != null) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');

      let value = component.value.map(value => {
        if (value instanceof Date) {
          return value.toISOString();
        } else {
          return value;
        }
      });

      document.textContent = `${value[0]} ${value[1]}`;

      node.appendChild(valueNode);
    }

    if (component.referenceTime) {
      node.setAttribute('referenceTime', component.referenceTime.toISOString());
    }

    if (component.localFrame) {
      node.setAttribute('localFrame', component.localFrame);
    }

    return node;
  }

  protected encodeSweCountRange(component: SweCountRange, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:CountRange');

    this.encodeAbstractSimpleComponent(node, component, document);

    if (component.constraint) {
      let constraintNode = document.createElementNS(NS_SWE, 'swe:contraint');
      constraintNode.appendChild(this.encodeAllowedValues(component.constraint, document));
      node.appendChild(constraintNode);
    }

    if (component.value != null) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');
      valueNode.textContent = `${component.value[0].toString()} ${component.value[1].toString()}`;
      node.appendChild(valueNode);
    }

    return node;
  }

  protected encodeSweCategoryRange(component: SweCategoryRange, document: Document): Node {

    let node = document.createElementNS(NS_SWE, 'swe:CategoryRange');

    if (component.codeSpace) {
      let codeSpaceNode = document.createElementNS(NS_SWE, 'swe:codeSpace');
      codeSpaceNode.setAttributeNS(NS_XLINK, 'xlink:href', component.codeSpace);
      node.appendChild(codeSpaceNode);
    }

    if (component.constraint) {
      let constraintNode = document.createElementNS(NS_SWE, 'swe:contraint');
      constraintNode.appendChild(this.encodeAllowedTokens(component.constraint, document));
      node.appendChild(constraintNode);
    }

    if (component.value) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');
      //let value = component.value.map(x => x.replace(' ', '&#032;'));
      valueNode.textContent = `${component.value[0]} ${component.value[1]}`;
      node.appendChild(valueNode);
    }

    return node;
  }

  protected encodeSweBoolean(component: SweBoolean, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:Boolean');

    this.encodeAbstractSimpleComponent(node, component, document);

    if (component.value != null) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');
      valueNode.textContent = component.value.toString();
      node.appendChild(valueNode);
    }

    return node;
  }

  protected encodeSweCount(component: SweCount, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:Count');

    this.encodeAbstractSimpleComponent(node, component, document);

    if (component.constraint) {
      let constraintNode = document.createElementNS(NS_SWE, 'swe:contraint');
      constraintNode.appendChild(this.encodeAllowedValues(component.constraint, document));
      node.appendChild(constraintNode);
    }

    if (component.value != null) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');
      valueNode.textContent = component.value.toString();
      node.appendChild(valueNode);
    }

    return node;
  }

  protected encodeSweQuantity(component: SweQuantity, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:Quantity');

    this.encodeAbstractSimpleComponent(node, component, document);

    if (component.uom) {
      let uomNode = document.createElementNS(NS_SWE, 'swe:uom');
      if (component.uom.code) {
        uomNode.setAttribute('code', component.uom.code);
      }
      if (component.uom.href) {
        uomNode.setAttributeNS(NS_XLINK, 'xlink:href', component.uom.href);
      }
      node.appendChild(uomNode);
    }

    if (component.constraint) {
      let constraintNode = document.createElementNS(NS_SWE, 'swe:contraint');
      constraintNode.appendChild(this.encodeAllowedValues(component.constraint, document));
      node.appendChild(constraintNode);
    }

    if (component.value != null) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');
      valueNode.textContent = component.value.toString();
      node.appendChild(valueNode);
    }

    return node;
  }

  protected encodeSweTime(component: SweTime, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:Time');

    this.encodeAbstractSimpleComponent(node, component, document);

    if (component.uom) {
      let uomNode = document.createElementNS(NS_SWE, 'swe:uom');
      if (component.uom.code) {
        uomNode.setAttribute('code', component.uom.code);
      }
      if (component.uom.href) {
        uomNode.setAttributeNS(NS_XLINK, 'xlink:href', component.uom.href);
      }
      node.appendChild(uomNode);
    }

    if (component.constraint) {
      let constraintNode = document.createElementNS(NS_SWE, 'swe:contraint');
      constraintNode.appendChild(this.encodeAllowedTimes(component.constraint, document));
      node.appendChild(constraintNode);
    }

    if (component.value != null) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');
      let value = component.value;

      if (value instanceof Date) {
        valueNode.textContent = value.toISOString();
      } else {
        valueNode.textContent = value;
      }

      node.appendChild(valueNode);
    }

    if (component.referenceTime) {
      node.setAttribute('referenceTime', component.referenceTime.toISOString());
    }

    if (component.localFrame) {
      node.setAttribute('localFrame', component.localFrame);
    }

    return node;
  }

  protected encodeSweCategory(component: SweCategory, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:Category');

    this.encodeAbstractSimpleComponent(node, component, document);

    if (component.codeSpace) {
      let codeSpaceNode = document.createElementNS(NS_SWE, 'swe:codeSpace');
      codeSpaceNode.setAttributeNS(NS_XLINK, 'xlink:href', component.codeSpace);
      node.appendChild(codeSpaceNode);
    }

    if (component.constraint) {
      let constraintNode = document.createElementNS(NS_SWE, 'swe:contraint');
      constraintNode.appendChild(this.encodeAllowedTokens(component.constraint, document));
      node.appendChild(constraintNode);
    }

    if (component.value) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');
      valueNode.textContent = component.value;
      node.appendChild(valueNode);
    }

    return node;
  }

  protected encodeSweText(component: SweText, document: Document): Node {

    let node = document.createElementNS(NS_SWE, 'swe:Text');

    this.encodeAbstractSimpleComponent(node, component, document);

    if (component.constraint) {
      let constraintNode = document.createElementNS(NS_SWE, 'swe:contraint');
      constraintNode.appendChild(this.encodeAllowedTokens(component.constraint, document));
      node.appendChild(constraintNode);
    }

    if (component.value) {
      let valueNode = document.createElementNS(NS_SWE, 'swe:value');
      valueNode.textContent = component.value;
      node.appendChild(valueNode);
    }

    return node;
  }

  protected encodeAllowedTokens(allowedTokens: AllowedTokens, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:AllowedTokens');

    this.encodeAbstractSwe(node, allowedTokens, document);

    if (allowedTokens.values) {
      allowedTokens.values.forEach(value => {
        let valueNode = document.createElementNS(NS_SWE, 'swe:value');
        valueNode.textContent = value;
        node.appendChild(valueNode);
      });
    }

    if (allowedTokens.pattern) {
      let patternNode = document.createElementNS(NS_SWE, 'swe:pattern');
      patternNode.textContent = allowedTokens.pattern;
      node.appendChild(patternNode);
    }

    return node;
  }

  protected encodeAllowedValues(allowedValues: AllowedValues, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:AllowedValues');

    this.encodeAbstractSwe(node, allowedValues, document);

    if (allowedValues.values) {
      allowedValues.values.filter(x => x instanceof Number)
        .forEach(x => {
          let n = document.createElementNS(NS_SWE, 'swe:value');
          n.textContent = x.toString();
          node.appendChild(n);
        });
      allowedValues.values.filter(x => x instanceof Number)
        .forEach(x => {
          let n = document.createElementNS(NS_SWE, 'swe:interval');
          n.textContent = `${x[0]} ${x[1]}`;
          node.appendChild(n);
        });
    }
    if (allowedValues.significantFigures != null) {
      let n = document.createElementNS(NS_SWE, 'swe:significantFigures');
      n.textContent = allowedValues.significantFigures.toString();
      node.appendChild(n);
    }

    return node;

  }

  protected encodeAllowedTimes(allowedTimes: AllowedTimes, document: Document): Node {
    let node = document.createElementNS(NS_SWE, 'swe:AllowedTimes');

    this.encodeAbstractSwe(node, allowedTimes, document);

    if (allowedTimes.values) {
      allowedTimes.values.forEach(allowedTime => {
        var value: string;
        if (allowedTime instanceof Date) {
          value = (<Date>allowedTime).toISOString();
        } else if (allowedTime instanceof String) {
          value = allowedTime;
        }
        if (value) {
          let valueNode = document.createElementNS(NS_SWE, 'swe:value');
          valueNode.textContent = allowedTime.toString();
          node.appendChild(valueNode);
        }
      });

      allowedTimes.values.forEach(allowedTime => {
        if (allowedTime instanceof Array) {
          var value = allowedTime.map(v => {
            if (allowedTime instanceof Date) {
              return (<Date>v).toISOString();
            } else if (allowedTime instanceof String) {
              return v;
            }
          });
          let intervalNode = document.createElementNS(NS_SWE, 'swe:interval');
          intervalNode.textContent = `${value[0]} ${value[1]} `;
          node.appendChild(intervalNode);
        }
      });
    }

    if (allowedTimes.significantFigures != null) {
      let n = document.createElementNS(NS_SWE, 'swe:significantFigures');
      n.textContent = allowedTimes.significantFigures.toString();
      node.appendChild(n);
    }

    return node;
  }

  protected encodeAbstractSwe(node: Element, component: AbstractSWE, document: Document): void {
    if (component.id) {
      node.setAttribute('id', component.id);
    }
    if (component.extension) {
      throw new Error('Extensions are not supported');
    }
  }

  protected encodeAbstractSweIdentifiable(node: Element, component: AbstractSWEIdentifiable, document: Document): void {

    this.encodeAbstractSwe(node, component, document);

    if (component.identifier) {
      let identifierNode = document.createElementNS(NS_SWE, 'swe:identifier');
      identifierNode.textContent = component.identifier;
      node.appendChild(identifierNode);
    }

    if (component.label) {
      let labelNode = document.createElementNS(NS_SWE, 'swe:label');
      labelNode.textContent = component.label;
      node.appendChild(labelNode);
    }

    if (component.description) {
      let descriptionNode = document.createElementNS(NS_SWE, 'swe:description');
      descriptionNode.textContent = component.description;
      node.appendChild(descriptionNode);
    }
  }

  protected encodeAbstractDataComponent(node: Element, component: AbstractDataComponent, document: Document): void {

    this.encodeAbstractSweIdentifiable(node, component, document);

    if (component.updatable != null) {
      node.setAttribute('updatable', component.updatable.toString());
    }

    if (component.optional != null) {
      node.setAttribute('optional', component.optional.toString());
    }

    if (component.definition) {
      node.setAttribute('definition', component.definition);
    }
  }

  protected encodeAbstractSimpleComponent(node: Element, component: AbstractSimpleComponent, document: Document): void {

    this.encodeAbstractDataComponent(node, component, document);

    if (component.quality) {
      component.quality.forEach(quality => node.appendChild(this.encodeSweQuality(quality, document)));
    }

    if (component.nilValues && component.nilValues.length > 0) {
      let outerNilValuesNode = document.createElementNS(NS_SWE, 'swe:nilValues');
      let innerNilValuesNode = document.createElementNS(NS_SWE, 'swe:NilValues');
      outerNilValuesNode.appendChild(innerNilValuesNode);
      component.nilValues.forEach(nilValue => innerNilValuesNode.appendChild(this.encodeNilValue(nilValue, document)));
    }

    if (component.referenceFrame) {
      node.setAttribute('referenceFrame', component.referenceFrame);
    }

    if (component.axisId) {
      node.setAttribute('axisID', component.axisId);
    }
  }

  protected encodeNilValue(nilValue: SweNilValue, document: Document): Node {
    let nilValueNode = document.createElementNS(NS_SWE, 'swe:nilValue');
    if (nilValue.value) {
      nilValueNode.textContent = nilValue.value;
    }
    if (nilValue.reason) {
      nilValueNode.setAttribute('reason', nilValue.reason);
    }
    return nilValueNode;
  }

  protected encodeSweQuality(quality: SweQuality, document: Document): Node {
    let qualityNode = document.createElementNS(NS_SML, 'swe:quality');
    if (quality instanceof SweQuantity) {
      qualityNode.appendChild(this.encodeSweQuantity(quality, document));
    } else if (quality instanceof SweQuantityRange) {
      qualityNode.appendChild(this.encodeSweQuantityRange(quality, document));
    } else if (quality instanceof SweCategory) {
      qualityNode.appendChild(this.encodeSweCategory(quality, document));
    } else if (quality instanceof SweText) {
      qualityNode.appendChild(this.encodeSweText(quality, document));
    } else {
      throw new Error('Unkown quality type');
    }
    return qualityNode;
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
