/**
 * XLink components are the standard method to support hypertext referencing in XML. An XML Schema attribute group,
 * gml:AssociationAttributeGroup, is provided to support the use of Xlinks as the method for indicating the value of a property by
 * reference in a uniform manner in GML.
 */
export interface AssociationAttributeGroup {
    href: string;
    title: string;
}
