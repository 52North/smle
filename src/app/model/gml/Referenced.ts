/**
 * The attribute group SRSReferenceGroup is an optional reference to the CRS
 * used by this geometry, with optional additional information to simplify the
 * rocessing of the coordinates when a more complete definition of the CRS is
 * not needed.
 * In general the attribute srsName points to a CRS instance of
 * gml:AbstractCoordinateReferenceSystem. For well-known references it is not
 * required that the CRS description exists at the location the URI points to.
 * If no srsName attribute is given, the CRS shall be specified as part of the
 * larger context this geometry element is part of.
 */
export interface Referenced {
  srsName: string;
  srsDimension: number;
  /**
   * The attribute axisLabels is an ordered list of labels for all the axes of
   * this CRS. The gml:axisAbbrev value should be used for these axis labels,
   * after spaces and forbidden characters are removed. When the srsName
   * attribute is included, this attribute is optional. When the srsName
   * attribute is omitted, this attribute shall also be omitted.
   */
  axisLabels: string[];
  /**
   * The attribute uomLabels is an ordered list of unit of measure (uom) labels
   * for all the axes of this CRS. The value of the string in the
   * gml:catalogSymbol should be used for this uom labels, after spaces
   * and forbidden characters are removed. When the axisLabels attribute
   * is included, this attribute shall also be included. When the axisLabels
   * attribute is omitted, this attribute shall also be omitted.
   */
  uomLabels: string[];
}
