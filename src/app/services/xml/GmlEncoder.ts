import { AbstractFeature } from '../../model/gml/AbstractFeature';
import { AbstractGML } from '../../model/gml/AbstractGML';
import { CodeType } from '../../model/gml/CodeType';
import { Envelope } from '../../model/gml/Envelope';
import { Namespaces } from './Namespaces';
import { Point } from '../../model/gml/Point';
import { Referenced } from '../../model/gml/Referenced';
import { TimeInstant } from '../../model/gml/TimeInstant';
import { TimePeriod } from '../../model/gml/TimePeriod';

export class GmlEncoder {

  public encodeTime(object: TimeInstant | TimePeriod, document: Document): Node {
    if (object instanceof Date) {
      return this.encodeTimeInstant(object, document);
    } else {
      return this.encodeTimePeriod(object, document);
    }
  }

  private setTime(elem: Element, time: TimeInstant) {
    if (!isNaN(time.getTime())) {
      elem.textContent = time.toISOString();
    } else {
      elem.setAttribute('indeterminatePosition', 'unknown');
    }
  }

  public encodeTimeInstant(timeInstant: TimeInstant, document: Document): Node {
    let node = document.createElementNS(Namespaces.GML, 'gml:TimeInstant');

    let timePostionNode = document.createElementNS(Namespaces.GML, 'gml:timePosition');
    this.setTime(timePostionNode, timeInstant);
    node.appendChild(timePostionNode);

    return node;
  }

  public encodeTimePeriod(timePeriod: TimePeriod, document: Document): Node {
    let node = document.createElementNS(Namespaces.GML, 'gml:TimePeriod');

    let beginNode = document.createElementNS(Namespaces.GML, 'gml:beginPosition');
    this.setTime(beginNode, timePeriod.begin);
    node.appendChild(beginNode);

    let endNode = document.createElementNS(Namespaces.GML, 'gml:endPosition');
    this.setTime(endNode, timePeriod.end);
    node.appendChild(endNode);

    return node;
  }

  public encodeAbstractGML(node: Element, object: AbstractGML, document: Document): void {
    if (object.gmlId) {
      node.setAttributeNS(Namespaces.GML, 'gml:id', object.gmlId);
    }

    if (object.description) {
      let n = document.createElementNS(Namespaces.GML, 'gml:description');
      n.textContent = object.description;
      node.appendChild(n);
    }

    if (object.descriptionReference) {
      let n = document.createElementNS(Namespaces.GML, 'gml:descriptionReference');
      n.setAttributeNS(Namespaces.XLINK, 'xlink:href', object.descriptionReference);
      node.appendChild(n);
    }
    if (object.identifier) {
      node.appendChild(this.encodeIdentifier(object.identifier, document));
    }

    if (object.name) {
      object.name.forEach(identifier =>
        node.appendChild(this.encodeName(identifier, document)));
    }
  }

  public encodeIdentifier(object: CodeType, document: Document): Node {
    let node = document.createElementNS(Namespaces.GML, 'gml:identifier');
    this.encodeCodeType(node, object, document);
    return node;
  }

  public encodeName(object: CodeType, document: Document): Node {
    let node = document.createElementNS(Namespaces.GML, 'gml:name');
    this.encodeCodeType(node, object, document);
    return node;
  }

  public encodeCodeType(node: Element, object: CodeType, document: Document) {
    if (object.codeSpace) {
      node.setAttribute('codeSpace', object.codeSpace);
    }
    if (object.value) {
      node.textContent = object.value;
    }
  }

  public encodeFeature(object: AbstractFeature, document: Document): Node {
    // todo handle feature encoding
    throw new Error('Not yet implemented');
  }

  public encodePoint(object: Point, document: Document): Node {
    let node = document.createElementNS(Namespaces.GML, 'gml:Point');
    this.encodeReferenced(node, object, document);
    node.appendChild(this.encodePos([[object.x, object.y]], document));
    return node;
  }

  public encodePos(object: [number, number][], document: Document): Node {
    let node = document.createElementNS(Namespaces.GML, 'gml:pos');
    node.setAttribute('count', object.length.toString());
    node.textContent = object.map(x => x.join(' ')).join(' ');
    return node;
  }

  public encodeAbstractFeature(node: Element, object: AbstractFeature, document: Document): void {
    this.encodeAbstractGML(node, object, document);

    if (object.location) {
      // TODO support for location
      throw new Error('Not yet implemented');
    }

    if (object.boundedBy) {
      let n = document.createElementNS(Namespaces.GML, 'gml:boundedBy');
      n.appendChild(this.encodeEnvelope(object.boundedBy, document));
      node.appendChild(n);
    }

  }

  public encodeEnvelope(object: Envelope, document: Document): Node {
    let node = document.createElementNS(Namespaces.GML, 'gml:Envelope');
    let lowerCornerNode = document.createElementNS(Namespaces.GML, 'gml:lowerCorner');
    lowerCornerNode.textContent = object.lowerCorner.join(' ');
    node.appendChild(lowerCornerNode);

    let upperCornerNode = document.createElementNS(Namespaces.GML, 'gml:upperCorner');
    lowerCornerNode.textContent = object.upperCorner.join(' ');
    node.appendChild(upperCornerNode);

    this.encodeReferenced(node, object, document);

    return node;
  }

  public encodeReferenced(node: Element, object: Referenced, document: Document): void {
    if (object.srsName) {
      node.setAttribute('srsName', object.srsName);
    }

    if (object.srsDimension != null) {
      node.setAttribute('srsDimension', object.srsDimension.toString());
    }

    if (object.axisLabels && object.axisLabels.length > 0) {
      node.setAttribute('axisLabels', object.axisLabels.join(' '));
    }

    if (object.uomLabels && object.uomLabels.length > 0) {
      node.setAttribute('uomLabels', object.uomLabels.join(' '));
    }
  }
}
