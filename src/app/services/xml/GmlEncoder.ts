import { AbstractFeature } from '../../model/gml/AbstractFeature';
import { AbstractGML } from '../../model/gml/AbstractGML';
import { AbstractTime } from '../../model/gml/AbstractTime';
import { AssociationAttributeGroup } from '../../model/gml/AssociationAttributeGroup';
import { CodeType } from '../../model/gml/CodeType';
import { Envelope } from '../../model/gml/Envelope';
import { Point } from '../../model/gml/Point';
import { Referenced } from '../../model/gml/Referenced';
import { TimeInstant } from '../../model/gml/TimeInstant';
import { TimePeriod } from '../../model/gml/TimePeriod';
import { FeatureProperty } from '../../model/sml/FeatureProperty';
import { NAMESPACES } from './Namespaces';

export class GmlEncoder {

    public encodeTime(object: AbstractTime, document: Document): Element {
        let node: Element;
        if (object instanceof TimeInstant) {
            node = this.encodeTimeInstant(object, document);
        }

        if (object instanceof TimePeriod) {
            node = this.encodeTimePeriod(object, document);
        }

        this.encodeAbstractGML(node, object, document);
        return node;
    }

    public encodeTimeInstant(timeInstant: TimeInstant, document: Document): Element {
        const node = document.createElementNS(NAMESPACES.GML, 'gml:TimeInstant');

        const timePostionNode = document.createElementNS(NAMESPACES.GML, 'gml:timePosition');
        this.setTime(timePostionNode, timeInstant.time);
        node.appendChild(timePostionNode);

        return node;
    }

    public encodeTimePeriod(timePeriod: TimePeriod, document: Document): Element {
        const node = document.createElementNS(NAMESPACES.GML, 'gml:TimePeriod');

        const beginNode = document.createElementNS(NAMESPACES.GML, 'gml:beginPosition');
        this.setTime(beginNode, timePeriod.begin);
        node.appendChild(beginNode);

        const endNode = document.createElementNS(NAMESPACES.GML, 'gml:endPosition');
        this.setTime(endNode, timePeriod.end);
        node.appendChild(endNode);

        return node;
    }

    public encodeAbstractGML(node: Element, object: AbstractGML, document: Document): void {
        if (object.gmlId) {
            node.setAttributeNS(NAMESPACES.GML, 'gml:id', object.gmlId);
        }

        if (object.description) {
            const n = document.createElementNS(NAMESPACES.GML, 'gml:description');
            n.textContent = object.description;
            node.appendChild(n);
        }

        if (object.descriptionReference) {
            const n = document.createElementNS(NAMESPACES.GML, 'gml:descriptionReference');
            n.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', object.descriptionReference);
            node.appendChild(n);
        }
        if (object.identifier) {
            node.appendChild(this.encodeIdentifier(object.identifier, document));
        }

        if (object.name) {
            object.name.forEach((identifier) =>
                node.appendChild(this.encodeName(identifier, document)));
        }
    }

    public encodeAssociationAttributeGroup(node: Element, object: AssociationAttributeGroup): Node {
        if (object.href) {
            node.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', object.href);
        }
        if (object.title) {
            node.setAttributeNS(NAMESPACES.XLINK, 'xlink:title', object.title);
        }
        return node;
    }

    public encodeIdentifier(object: CodeType, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GML, 'gml:identifier');
        this.encodeCodeType(node, object, document);
        return node;
    }

    public encodeName(object: CodeType, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GML, 'gml:name');
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

    public encodeFeature(node: Element, object: FeatureProperty, document: Document): Node {
        this.encodeAssociationAttributeGroup(node, object);
        return node;
    }

    public encodePoint(object: Point, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GML, 'gml:Point');
        this.encodeReferenced(node, object, document);
        node.appendChild(this.encodePos([[object.x, object.y]], document));
        return node;
    }

    public encodePos(object: [number, number][], document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GML, 'gml:pos');
        node.setAttribute('count', object.length.toString());
        node.textContent = object.map((x) => x.join(' ')).join(' ');
        return node;
    }

    public encodeAbstractFeature(node: Element, object: AbstractFeature, document: Document): void {
        this.encodeAbstractGML(node, object, document);

        if (object.location) {
            // TODO support for location
            throw new Error('Not yet implemented');
        }

        if (object.boundedBy) {
            const n = document.createElementNS(NAMESPACES.GML, 'gml:boundedBy');
            n.appendChild(this.encodeEnvelope(object.boundedBy, document));
            node.appendChild(n);
        }

    }

    public encodeEnvelope(object: Envelope, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GML, 'gml:Envelope');
        const lowerCornerNode = document.createElementNS(NAMESPACES.GML, 'gml:lowerCorner');
        lowerCornerNode.textContent = object.lowerCorner.join(' ');
        node.appendChild(lowerCornerNode);

        const upperCornerNode = document.createElementNS(NAMESPACES.GML, 'gml:upperCorner');
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

    private setTime(elem: Element, time: Date) {
        if (time && !isNaN(time.getTime())) {
            elem.textContent = time.toISOString();
        } else {
            elem.setAttribute('indeterminatePosition', 'unknown');
        }
    }

}
