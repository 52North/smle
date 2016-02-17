import {
  AbstractProcess,
  SimpleProcess,
  AggregateProcess,
  PhysicalComponent,
  PhysicalSystem,
  Term,
  Characteristics,
  Characteristic
} from '../../model/sensorML';

import * as Namespaces from './namespaces';
import { SweEncoder } from './swe';
import { IsoEncoder } from './iso19115';

export class SmlEncoder {

  private sweEncoder = new SweEncoder();
  private isoEncoder = new IsoEncoder();

  public encodeTerm(term: Term, document: Document): Node {
    var termNode = document.createElementNS(Namespaces.SML, 'sml:Term');

    if (term.definition) {
      termNode.setAttribute('definition', term.definition);
    }

    if (term.label) {
      let labelNode = document.createElementNS(Namespaces.SML, 'sml:label');
      labelNode.textContent = term.label;
      termNode.appendChild(labelNode);
    }

    if (term.codeSpace) {
      let codeSpaceNode = document.createElementNS(Namespaces.SML, 'sml:codeSpace');
      codeSpaceNode.setAttributeNS(Namespaces.XLINK, 'xlink:href', term.codeSpace);
      termNode.appendChild(codeSpaceNode);
    }

    if (term.value) {
      let labelNode = document.createElementNS(Namespaces.SML, 'sml:value');
      labelNode.textContent = term.value;
      termNode.appendChild(labelNode);
    }

    if (term.extension) {
      throw new Error('Extensions are not supported!');
    }

    return termNode;
  }

  public encodeIdentification(identification: Term[], document: Document): Node {
    let identificationNode = document.createElementNS(Namespaces.SML, 'sml:identification');
    let identifierListNode = this.encodeIdentifierList(identification, document);
    identificationNode.appendChild(identifierListNode);
    return identificationNode;
  }

  public encodeIdentifierList(identifier: Term[], document: Document): Node {
    let identifierListNode = document.createElementNS(Namespaces.SML, 'sml:IdentifierList');
    identifier.forEach(term => identifierListNode.appendChild(this.encodeIdentifier(term, document)));
    return identifierListNode;
  }

  public encodeIdentifier(identifier: Term, document: Document): Node {
    let identifierNode = document.createElementNS(Namespaces.SML, 'sml:identifier');
    identifierNode.appendChild(this.encodeTerm(identifier, document));
    return identifierNode;
  }

  public encodeClassification(classification: Term[], document: Document): Node {
    let classificationNode = document.createElementNS(Namespaces.SML, 'sml:classification');
    let classifierListNode = this.encodeClassifierList(classification, document);
    classificationNode.appendChild(classifierListNode);
    return classificationNode;
  }

  public encodeClassifierList(classifier: Term[], document: Document): Node {
    let classifierListNode = document.createElementNS(Namespaces.SML, 'sml:ClassifierList');
    classifier.forEach(term => classifierListNode.appendChild(this.encodeClassifier(term, document)));
    return classifierListNode;
  }

  public encodeClassifier(classifier: Term, document: Document): Node {
    let classifierNode = document.createElementNS(Namespaces.SML, 'sml:classifier');
    classifierNode.appendChild(this.encodeTerm(classifier, document));
    return classifierNode;
  }

  public encodeCharacteristics(characteristics: Characteristics, document: Document): Node {
    let characteristicsNode = document.createElementNS(Namespaces.SML, 'sml:characteristics');

    if (characteristics.name) {
      characteristicsNode.setAttribute('name', characteristics.name);
    }

    if (characteristics.characteristics) {
      characteristicsNode.appendChild(this.encodeCharacteristicList(characteristics.characteristics, document));
    }

    return characteristicsNode;
  }

  public encodeCharacteristicList(characteristics: Characteristic[], document: Document): Node {
    let characteristicListNode = document.createElementNS(Namespaces.SML, 'sml:CharacteristicList');
    characteristics.forEach(characteristic =>
      characteristicListNode.appendChild(this.encodeCharacteristic(characteristic, document)));
    return characteristicListNode;
  }

  public encodeCharacteristic(characteristic: Characteristic, document: Document): Node {
    let characteristicNode = document.createElementNS(Namespaces.SML, 'sml:characteristic');
    if (characteristic.name) {
      characteristicNode.setAttribute('name', characteristic.name);
    }
    if (characteristic.component) {
      characteristicNode.appendChild(this.sweEncoder.encodeDataComponent(characteristic.component, document));
    }
    return characteristicNode;
  }
}
