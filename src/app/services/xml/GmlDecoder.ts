import { AbstractFeature } from '../../model/gml/AbstractFeature';
import { AbstractGML } from '../../model/gml/AbstractGML';
import { CodeType } from '../../model/gml/CodeType';
import { Envelope } from '../../model/gml/Envelope';
import { NAMESPACES } from './Namespaces';
import { Point } from '../../model/gml/Point';
import { Referenced } from '../../model/gml/Referenced';
import { TimeInstant } from '../../model/gml/TimeInstant';
import { TimePeriod } from '../../model/gml/TimePeriod';
import { AbstractTime } from '../../model/gml/AbstractTime';
import { DecoderUtils, ReturnObject } from './DecoderUtils';
import { BidiMap } from '../DynamicGUIService';

export class GmlDecoder {

    private utils = new DecoderUtils();

    private _profileIDMap: BidiMap;

    public get profileIDMap() {
        return this._profileIDMap;
    }

    public set profileIDMap(profileIDMap: BidiMap) {
        this._profileIDMap = profileIDMap;
    }

    public decodeTime(elem: Element): ReturnObject<AbstractTime> {
        let timeInstant = this.decodeTimeInstant(elem);
        if (timeInstant != null) return timeInstant;

        let timePeriod = this.decodeTimePeriod(elem);
        if (timePeriod != null) return timePeriod;
    }

    public decodeTimeInstant(elem: Element): ReturnObject<AbstractTime> {
        let timeElem = this.utils.getElement(elem, 'TimeInstant', NAMESPACES.GML);
        if (timeElem != null) {
            let instant = new TimeInstant();
            this._profileIDMap = this.utils.processProfileID(timeElem, instant, '', this._profileIDMap);
            this.decodeAbstractGML(timeElem, instant);

            let timePositionElem = this.utils.getElement(timeElem, 'timePosition', NAMESPACES.GML);
            if (timePositionElem != null) {
                instant.time = this.getTime(timePositionElem);
                this._profileIDMap = this.utils.processProfileID(timePositionElem, instant, 'time', this._profileIDMap);
            }
            return new ReturnObject(instant, timeElem);
        }
    }

    public decodeTimePeriod(elem: Element): ReturnObject<AbstractTime> {
        let timeElem = this.utils.getElement(elem, 'TimePeriod', NAMESPACES.GML);
        if (timeElem != null) {
            let period = new TimePeriod();
            this._profileIDMap = this.utils.processProfileID(timeElem, period, '', this._profileIDMap);
            this.decodeAbstractGML(timeElem, period);

            let beginPositionElem = this.utils.getElement(timeElem, 'beginPosition', NAMESPACES.GML);
            if (beginPositionElem != null) {
                period.begin = this.getTime(beginPositionElem);
                this._profileIDMap = this.utils.processProfileID(
                    beginPositionElem, period, 'begin', this._profileIDMap
                );
            }

            let endPositionElem = this.utils.getElement(timeElem, 'endPosition', NAMESPACES.GML);
            if (endPositionElem != null) {
                period.end = this.getTime(endPositionElem);
                this._profileIDMap = this.utils.processProfileID(endPositionElem, period, 'end', this._profileIDMap);

            }
            return new ReturnObject(period, timeElem);
        }
    }

    private getTime(elem: Element): Date {
        if (elem.hasAttribute('indeterminatePosition') && elem.getAttribute('indeterminatePosition') === 'unknown') {
            return null;
        } else {
            let date = new Date(Date.parse(elem.textContent));
            this._profileIDMap = this.utils.processProfileID(elem, date, '', this._profileIDMap);
            return date;
        }
    }

    public decodeAbstractGML(elem: Element, object: AbstractGML): void {
        if (elem.hasAttributeNS(NAMESPACES.GML, 'id')) {
            object.gmlId = elem.getAttributeNS(NAMESPACES.GML, 'id');
            this._profileIDMap = this.utils.processProfileID(elem, object, 'gmlId', this._profileIDMap);

        }

        let descriptionElem = this.utils.getElement(elem, 'description', NAMESPACES.GML);
        if (descriptionElem != null) {
            object.description = descriptionElem.textContent;
            this._profileIDMap = this.utils.processProfileID(descriptionElem, object, 'description', this._profileIDMap);

        }

        let descriptionReferenceElem = this.utils.getElement(elem, 'descriptionReference', NAMESPACES.GML);
        if (descriptionReferenceElem != null) {
            object.descriptionReference = descriptionReferenceElem.textContent;
            this._profileIDMap = this.utils.processProfileID(descriptionReferenceElem, object, 'descriptionReference', this._profileIDMap);

        }

        let identifierElem = this.utils.getElement(elem, 'identifier', NAMESPACES.GML);
        if (identifierElem != null) {
            let returnObject = this.decodeCodeType(identifierElem);
            if (returnObject) {
                object.identifier = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, object, 'identifier', this._profileIDMap);
            }
        }

        object.name = this.utils.getDecodedList(elem, 'name', NAMESPACES.GML, this._profileIDMap, (nameElem) => this.decodeCodeType(nameElem));

    }

    public decodeCodeType(elem: Element): ReturnObject<CodeType> {

        let codeSpace = null;
        if (elem.hasAttribute('codeSpace')) {
            codeSpace = elem.getAttribute('codeSpace');
        }

        let codeType = new CodeType(elem.textContent, codeSpace);
        if (elem.hasAttribute('codeSpace')) {
            this._profileIDMap = this.utils.processProfileID(elem, codeType, 'codeSpace', this._profileIDMap);
        }

        return new ReturnObject(codeType, elem);
    }

    public decodePoint(elem: Element): ReturnObject<Point> {
        let pointElem = this.utils.getElement(elem, 'Point', NAMESPACES.GML);
        if (pointElem != null) {
            let point = new Point();
            this._profileIDMap = this.utils.processProfileID(pointElem, point, '', this._profileIDMap);
            this.decodeReferenced(pointElem, point);
            this.decodePos(pointElem, point);
            return new ReturnObject(point, pointElem);
        }
    }

    public decodePos(elem: Element, point: Point) {
        let posElem = this.utils.getElement(elem, 'pos', NAMESPACES.GML);
        if (posElem != null) {
            let content = posElem.textContent.split(' ');
            if (content[0]) {
                point.x = +content[0];
                this._profileIDMap = this.utils.processProfileID(posElem, point, 'x', this._profileIDMap);
            }
            if (content[1]) {
                point.y = +content[1];
                this._profileIDMap = this.utils.processProfileID(posElem, point, 'y', this._profileIDMap);
            }
        }
    }

    public decodeAbstractFeature(elem: Element, abstractFeature: AbstractFeature): void {
        this.decodeAbstractGML(elem, abstractFeature);
        let boundedByElem = this.utils.getElement(elem, 'boundedBy', NAMESPACES.GML);
        if (boundedByElem != null) {
            abstractFeature.boundedBy = this.decodeEnvelope(boundedByElem);
            this._profileIDMap = this.utils.processProfileID(
                boundedByElem, abstractFeature, 'boundedBy', this._profileIDMap
            );
        }
    }

    public decodeEnvelope(elem: Element): Envelope {
        let envelopeElem = this.utils.getElement(elem, 'Envelope', NAMESPACES.GML);
        if (envelopeElem != null) {
            let envelope = new Envelope();
            this._profileIDMap = this.utils.processProfileID(envelopeElem, envelope, '', this._profileIDMap);
            this.decodeReferenced(envelopeElem, envelope);

            let lowerCorner = this.utils.getElement(envelopeElem, 'lowerCorner', NAMESPACES.GML);
            if (lowerCorner != null) {
                let lc = lowerCorner.textContent.split(' ');
                if (lc.length === 2) {
                    envelope.lowerCorner = [+lc[0], +lc[1]];
                    this._profileIDMap = this.utils.processProfileID(
                        lowerCorner, envelope, 'lowerCorner', this._profileIDMap
                    );
                }
            }

            let upperCorner = this.utils.getElement(envelopeElem, 'upperCorner', NAMESPACES.GML);
            if (upperCorner != null) {
                let uc = upperCorner.textContent.split(' ');
                if (uc.length === 2) {
                    envelope.upperCorner = [+uc[0], +uc[1]];
                    this._profileIDMap = this.utils.processProfileID(
                        upperCorner, envelope, 'upperCorner', this._profileIDMap
                    );
                }
            }

            return envelope;
        }
    }

    public decodeReferenced(elem: Element, referenced: Referenced): void {
        if (elem.hasAttribute('srsName')) {
            referenced.srsName = elem.getAttribute('srsName');
            this._profileIDMap = this.utils.processProfileID(elem, referenced, 'srsName', this._profileIDMap);
        }

        if (elem.hasAttribute('srsDimension') && !isNaN(+elem.getAttribute('srsDimension'))) {
            referenced.srsDimension = +elem.getAttribute('srsDimension');
            this._profileIDMap = this.utils.processProfileID(elem, referenced, 'srsDimension', this._profileIDMap);
        }

        if (elem.hasAttribute('axisLabels')) {
            referenced.axisLabels = elem.getAttribute('axisLabels').split(' ');
            this._profileIDMap = this.utils.processProfileID(elem, referenced, 'axisLabels', this._profileIDMap);
        }

        if (elem.hasAttribute('uomLabels')) {
            referenced.uomLabels = elem.getAttribute('uomLabels').split(' ');
            this._profileIDMap = this.utils.processProfileID(elem, referenced, 'uomLabels', this._profileIDMap);
        }
    }
}
