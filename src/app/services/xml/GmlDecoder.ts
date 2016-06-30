import { AbstractFeature } from '../../model/gml/AbstractFeature';
import { AbstractGML } from '../../model/gml/AbstractGML';
import { CodeType } from '../../model/gml/CodeType';
import { Envelope } from '../../model/gml/Envelope';
import { Namespaces } from './Namespaces';
import { Point } from '../../model/gml/Point';
import { Referenced } from '../../model/gml/Referenced';
import { TimeInstant } from '../../model/gml/TimeInstant';
import { TimePeriod } from '../../model/gml/TimePeriod';
import { AbstractTime } from '../../model/gml/AbstractTime';
import { DecoderUtils } from './DecoderUtils';

export class GmlDecoder {

  private utils = new DecoderUtils();

  public decodeTime(elem: Element): AbstractTime {
    let timeInstant = this.decodeTimeInstant(elem);
    if (timeInstant != null) return timeInstant;

    let timePeriod = this.decodeTimePeriod(elem);
    if (timePeriod != null) return timePeriod;
  }

  public decodeTimeInstant(elem: Element): AbstractTime {
    let timeElem = this.utils.getElement(elem, 'TimeInstant', Namespaces.GML);
    if (timeElem != null) {
      let instant = new TimeInstant();
      
      this.decodeAbstractGML(timeElem, instant);
      
      let timePositionElem = this.utils.getElement(timeElem, 'timePosition', Namespaces.GML);
      if (timePositionElem != null) {
        instant.time = new Date(Date.parse(timePositionElem.textContent));
      }
      
      return instant;
    }
  }

  public decodeTimePeriod(elem: Element): AbstractTime {
    let timeElem = this.utils.getElement(elem, 'TimePeriod', Namespaces.GML);
    if (timeElem != null) {
      let period = new TimePeriod();
      
      this.decodeAbstractGML(timeElem, period);

      let beginPositionElem = this.utils.getElement(timeElem, 'beginPosition', Namespaces.GML);
      if (beginPositionElem != null) {
        period.begin = new Date(Date.parse(beginPositionElem.textContent));
      }

      let endPositionElem = this.utils.getElement(timeElem, 'endPosition', Namespaces.GML);
      if (endPositionElem != null) {
        period.end = new Date(Date.parse(endPositionElem.textContent));
      }
      return period;
    }
  }

  public decodeAbstractGML(elem: Element, object: AbstractGML): void {
    if (elem.hasAttributeNS(Namespaces.GML, 'id')) {
      object.gmlId = elem.getAttributeNS(Namespaces.GML, 'id');
    }

    let descriptionElem = this.utils.getElement(elem, 'description', Namespaces.GML);
    if (descriptionElem != null) {
      object.description = descriptionElem.textContent;
    }

    let descriptionReferenceElem = this.utils.getElement(elem, 'descriptionReference', Namespaces.GML);
    if (descriptionReferenceElem != null) {
      object.descriptionReference = descriptionReferenceElem.textContent;
    }

    let identifierElem = this.utils.getElement(elem, 'identifier', Namespaces.GML);
    if (identifierElem != null) {
      object.identifier = this.decodeCodeType(identifierElem);
    }

    object.name = this.utils.getDecodedList(elem, 'name', Namespaces.GML, (nameElem) => this.decodeCodeType(nameElem));
  }

  public decodeCodeType(elem: Element): CodeType {

    let codeSpace = null;
    if (elem.hasAttribute('codeSpace')) {
      codeSpace = elem.getAttribute('codeSpace');
    }

    return new CodeType(elem.textContent, codeSpace);
  }

  public decodePoint(elem: Element): Point {
    let pointElem = this.utils.getElement(elem, 'Point', Namespaces.GML);
    if (pointElem != null) {
      let point = new Point();
      this.decodeReferenced(pointElem, point);
      this.decodePos(pointElem, point);
      return point;
    }
  }

  public decodePos(elem: Element, point: Point) {
    let posElem = this.utils.getElement(elem, 'pos', Namespaces.GML);
    if (posElem != null) {
      let content = posElem.textContent.split(' ');
      if (content[0]) {
        point.x = +content[0];
      }
      if (content[1]) {
        point.y = +content[1];
      }
    }
  }

  public decodeAbstractFeature(elem: Element, abstractFeature: AbstractFeature): void {
    this.decodeAbstractGML(elem, abstractFeature);
    let boundedByElem = this.utils.getElement(elem, 'boundedBy', Namespaces.GML);
    if (boundedByElem != null) {
      abstractFeature.boundedBy = this.decodeEnvelope(boundedByElem);
    }
  }

  public decodeEnvelope(elem: Element): Envelope {
    let envelopeElem = this.utils.getElement(elem, 'Envelope', Namespaces.GML);
    if (envelopeElem != null) {
      let envelope = new Envelope();

      this.decodeReferenced(envelopeElem, envelope);

      let lowerCorner = this.utils.getElement(envelopeElem, 'lowerCorner', Namespaces.GML);
      if (lowerCorner != null) {
        let lc = lowerCorner.textContent.split(' ');
        if (lc.length === 2) {
          envelope.lowerCorner = [+lc[0], +lc[1]];
        }
      }

      let upperCorner = this.utils.getElement(envelopeElem, 'upperCorner', Namespaces.GML);
      if (upperCorner != null) {
        let uc = upperCorner.textContent.split(' ');
        if (uc.length === 2) {
          envelope.upperCorner = [+uc[0], +uc[1]];
        }
      }

      return envelope;
    }
  }

  public decodeReferenced(elem: Element, referenced: Referenced): void {
    if (elem.hasAttribute('srsName')) {
      referenced.srsName = elem.getAttribute('srsName');
    }

    if (elem.hasAttribute('srsDimension') && !isNaN(+elem.getAttribute('srsDimension'))) {
      referenced.srsDimension = +elem.getAttribute('srsDimension');
    }

    if (elem.hasAttribute('axisLabels')) {
      referenced.axisLabels = elem.getAttribute('axisLabels').split(' ');
    }

    if (elem.hasAttribute('uomLabels')) {
      referenced.uomLabels = elem.getAttribute('uomLabels').split(' ');
    }
  }
}
