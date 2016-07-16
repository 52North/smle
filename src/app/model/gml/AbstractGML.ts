import {CodeType} from './CodeType';
import {DisplayName} from '../../decorators/DisplayName';

/**
 * The abstract element gml:AbstractGML is "any GML object having identity".
 * It acts as the head of an XML Schema substitution group, which may include
 * any element which is a GML feature, or other object, with identity.  This is
 * used as a variable in content models in GML core and application schemas. It
 * is effectively an abstract superclass for all GML objects.
 */
export abstract class AbstractGML {
    @DisplayName('GML id')
    gmlId: string;
    /**
     * The value of this property is a text description of the object.
     * gml:description uses gml:StringOrRefType as its content model, so it may
     * contain a simple text string content, or carry a reference to an external
     *  description. The use of gml:description to reference an external
     * description has been deprecated and replaced by the
     * gml:descriptionReference property.
     */
    @DisplayName('Description')
    description: string;
    /**
     * The value of this property is a remote text description of the object.
     * The xlink:href attribute of the gml:descriptionReference property
     * references the external description.
     */
    @DisplayName('Description reference')
    descriptionReference: string;
    /**
     * The gml:name property provides a label or identifier for the object,
     * commonly a descriptive name. An object may have several names, typically
     * assigned by different authorities. gml:name uses the gml:CodeType content
     * model. The authority for a name is indicated by the value of its (optional)
     * codeSpace attribute.  The name may or may not be unique, as determined by
     * the rules of the organization responsible for the codeSpace.  In common
     * usage there will be one name per authority, so a processing application
     * may select the name from its preferred codeSpace.
     */
    @DisplayName('Name')
    name: CodeType[];
    /**
     * Often, a special identifier is assigned to an object by the maintaining
     * authority with the intention that it is used in references to the object.
     * For such cases, the codeSpace shall be provided. That identifier is usually
     * unique either globally or within an application domain. gml:identifier is a
     * pre-defined property for such identifiers.
     */
    @DisplayName('Identifier')
    identifier: CodeType;

    toString() {
        return 'Abstract GML';
    }
}
