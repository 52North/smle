/**
 * The attribute group SRSReferenceGroup is an optional reference to the CRS used by this geometry, with optional additional information to simplify the processing of the coordinates when a more complete definition of the CRS is not needed.
 * In general the attribute srsName points to a CRS instance of gml:AbstractCoordinateReferenceSystem. For well-known references it is not required that the CRS description exists at the location the URI points to.
 * If no srsName attribute is given, the CRS shall be specified as part of the larger context this geometry element is part of.
 */
class Referenced {
  srsName: string;
  srsDimension: number;
  /**
   * The attribute axisLabels is an ordered list of labels for all the axes of this CRS. The gml:axisAbbrev value should be used for these axis labels, after spaces and forbidden characters are removed. When the srsName attribute is included, this attribute is optional. When the srsName attribute is omitted, this attribute shall also be omitted.
   */
  axisLabels: string[];
  /**
   * The attribute uomLabels is an ordered list of unit of measure (uom) labels for all the axes of this CRS. The value of the string in the gml:catalogSymbol should be used for this uom labels, after spaces and forbidden characters are removed. When the axisLabels attribute is included, this attribute shall also be included. When the axisLabels attribute is omitted, this attribute shall also be omitted.
   */
  uomLabels: string[];
}

/**
 * Envelope defines an extent using a pair of positions defining opposite corners in arbitrary dimensions. The first direct position is the "lower corner" (a coordinate position consisting of all the minimal ordinates for each dimension for all points within the envelope), the second one the "upper corner" (a coordinate position consisting of all the maximal ordinates for each dimension for all points within the envelope).
 */
export class Envelope extends Referenced {

  private _coords = new Array<number>(4);

  get lowerCorner() {
    return [this._coords[0], this._coords[2]];
  }

  set lowerCorner(c: [number, number]) {
    this._coords[0] = c[0];
    this._coords[2] = c[1];
  }

  get upperCorner() {
    return [this._coords[1], this._coords[3]];
  }

  set upperCorner(c: [number, number]) {
    this._coords[1] = c[0];
    this._coords[3] = c[1];
  }
  get coordinates(): [number, number, number, number] {
    return [
      this._coords[0],
      this._coords[1],
      this._coords[2],
      this._coords[3]
    ]
  }

  set coordinates(c: [number, number, number, number]) {
    for (var i = 0; i < 4; ++i) {
      this._coords[i] = c[i];
    }
  }
}

/**
 * gml:CodeType is a generalized type to be used for a term, keyword or name.
 * It adds a XML attribute codeSpace to a term, where the value of the codeSpace attribute (if present) shall indicate a dictionary, thesaurus, classification scheme, authority, or pattern for the term.
 */
export class CodeType {
  constructor(public value: string, public codeSpace: string = null) { }
}

/**
 * gml:CodeWithAuthorityType requires that the codeSpace attribute is provided in an instance.
 */
export class CodeWithAuthority extends CodeType {
  constructor(value: string, codeSpace: string) {
    super(value, codeSpace);
  }
}

/**
 * The abstract element gml:AbstractGML is "any GML object having identity".
 * It acts as the head of an XML Schema substitution group, which may include any element which is a GML feature, or other object, with identity.  This is used as a variable in content models in GML core and application schemas. It is effectively an abstract superclass for all GML objects.
 */
export abstract class AbstractGML {
  /**
   * The value of this property is a text description of the object. gml:description uses gml:StringOrRefType as its content model, so it may contain a simple text string content, or carry a reference to an external description. The use of gml:description to reference an external description has been deprecated and replaced by the gml:descriptionReference property.
   */
  description: string;
  /**
   * The value of this property is a remote text description of the object. The xlink:href attribute of the gml:descriptionReference property references the external description.
   */
  descriptionReference: string;
  /**
   * The gml:name property provides a label or identifier for the object, commonly a descriptive name. An object may have several names, typically assigned by different authorities. gml:name uses the gml:CodeType content model. The authority for a name is indicated by the value of its (optional)codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace.  In common usage there will be one name per authority, so a processing application may select the name from its preferred codeSpace.
   */
  name: CodeType[];
  /**
   * Often, a special identifier is assigned to an object by the maintaining authority with the intention that it is used in references to the object For such cases, the codeSpace shall be provided. That identifier is usually unique either globally or within an application domain. gml:identifier is a pre-defined property for such identifiers.
   */
  identifier: CodeType[];
}


/**
 * The basic feature model is given by the gml:AbstractFeatureType.
 * The content model for gml:AbstractFeatureType adds two specific properties suitable for geographic features to the content model defined in gml:AbstractGMLType.
 */
export abstract class AbstractFeature extends AbstractGML {
  /**
   * The value of the gml:boundedBy property describes an envelope that encloses the entire feature instance, and is primarily useful for supporting rapid searching for features that occur in a particular location.
   */
  boundedBy: Envelope;
  /**
   * The value of the gml:location property describes the extent, position or relative location of the feature.
   */
  location: any;
}

/**
 * gml:TimePeriod acts as a one-dimensional geometric primitive that represents an identifiable extent in time.
 */
export class TimePeriod {
  begin: TimeInstant;
  end: TimeInstant;
}

export type TimeInstant = Date;
export type Time = TimeInstant | TimePeriod;

export class Point {
  x: number;
  y: number;
}