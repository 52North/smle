import { Address } from '../../model/iso/gmd/Address';
import { Contact } from '../../model/iso/gmd/Contact';
import { LegalConstraints } from '../../model/iso/gmd/LegalConstraints';
import { NAMESPACES } from './Namespaces';
import { OnlineFunction } from '../../model/iso/gmd/OnlineFunction';
import { OnlineResource } from '../../model/iso/gmd/OnlineResource';
import { Phone } from '../../model/iso/gmd/Phone';
import { ResponsibleParty } from '../../model/iso/gmd/ResponsibleParty';
import { Restriction } from '../../model/iso/gmd/Restriction';
import { Role } from '../../model/iso/gmd/Role';

export class IsoEncoder {

    public encodeContact(contact: Contact, document: Document): Node {

        const node = document.createElementNS(NAMESPACES.GMD, 'CI_Contact');

        if (contact.phone) {
            const phoneNode = document.createElementNS(NAMESPACES.GMD, 'gmd:phone');
            phoneNode.appendChild(this.encodePhone(contact.phone, document));
            node.appendChild(phoneNode);
        }

        if (contact.address) {
            const addressNode = document.createElementNS(NAMESPACES.GMD, 'gmd:address');
            addressNode.appendChild(this.encodeAddress(contact.address, document));
            node.appendChild(addressNode);
        }

        if (contact.onlineResource) {
            const onlineResourceNode = document.createElementNS(NAMESPACES.GMD, 'gmd:onlineResource');
            onlineResourceNode.appendChild(this.encodeOnlineResource(contact.onlineResource, document));
            node.appendChild(onlineResourceNode);
        }

        if (contact.hoursOfService) {
            const hoursOfServiceNode = document.createElementNS(NAMESPACES.GMD, 'gmd:hoursOfService');
            hoursOfServiceNode.appendChild(this.encodeCharacterString(contact.hoursOfService, document));
            node.appendChild(hoursOfServiceNode);
        }

        if (contact.contactInstructions) {
            const contactInstructionsNode = document.createElementNS(NAMESPACES.GMD, 'gmd:contactInstructions');
            contactInstructionsNode.appendChild(this.encodeCharacterString(contact.contactInstructions, document));
            node.appendChild(contactInstructionsNode);
        }

        return node;

    }

    public encodePhone(phone: Phone, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GMD, 'gmd:CI_Telephone');

        if (phone.voice) {
            phone.voice.forEach((voice) => {
                const voiceNode = document.createElementNS(NAMESPACES.GMD, 'gmd:voice');
                voiceNode.appendChild(this.encodeCharacterString(voice, document));
                node.appendChild(voiceNode);
            });
        }

        if (phone.facsimile) {
            phone.facsimile.forEach((facsimile) => {
                const facsimileNode = document.createElementNS(NAMESPACES.GMD, 'gmd:facsimile');
                facsimileNode.appendChild(this.encodeCharacterString(facsimile, document));
                node.appendChild(facsimileNode);
            });
        }

        return node;
    }

    public encodeOnlineResource(onlineResource: OnlineResource, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GMD, 'gmd:CI_OnlineResource');

        if (onlineResource.linkage) {
            const linkageNode = document.createElementNS(NAMESPACES.GMD, 'gmd:linkage');
            linkageNode.appendChild(this.encodeUrl(onlineResource.linkage, document));
            node.appendChild(linkageNode);
        }

        if (onlineResource.protocol) {
            const protocolNode = document.createElementNS(NAMESPACES.GMD, 'gmd:protocol');
            protocolNode.appendChild(this.encodeCharacterString(onlineResource.protocol, document));
            node.appendChild(protocolNode);
        }

        if (onlineResource.applicationProfile) {
            const applicationProfileNode = document.createElementNS(NAMESPACES.GMD, 'gmd:applicationProfile');
            applicationProfileNode.appendChild(
                this.encodeCharacterString(onlineResource.applicationProfile, document));
            node.appendChild(applicationProfileNode);
        }

        if (onlineResource.name) {
            const nameNode = document.createElementNS(NAMESPACES.GMD, 'gmd:name');
            nameNode.appendChild(this.encodeCharacterString(onlineResource.name, document));
            node.appendChild(nameNode);
        }

        if (onlineResource.description) {
            const descriptionNode = document.createElementNS(NAMESPACES.GMD, 'gmd:description');
            descriptionNode.appendChild(this.encodeCharacterString(onlineResource.description, document));
            node.appendChild(descriptionNode);
        }

        if (onlineResource['function']) {
            const functionNode = document.createElementNS(NAMESPACES.GMD, 'gmd:function');
            functionNode.appendChild(this.encodeOnlineFunction(onlineResource['function'], document));
            node.appendChild(functionNode);
        }

        return node;
    }

    public encodeAddress(address: Address, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GMD, 'gmd:CI_Address');

        if (address.deliveryPoint) {
            address.deliveryPoint.forEach((deliveryPoint) => {
                const deliveryPointNode = document.createElementNS(NAMESPACES.GMD, 'gmd:deliveryPoint');
                deliveryPointNode.appendChild(this.encodeCharacterString(deliveryPoint, document));
                node.appendChild(deliveryPointNode);
            });
        }

        if (address.city) {
            const cityNode = document.createElementNS(NAMESPACES.GMD, 'gmd:city');
            cityNode.appendChild(this.encodeCharacterString(address.city, document));
            node.appendChild(cityNode);
        }

        if (address.administrativeArea) {
            const administrativeAreaNode = document.createElementNS(NAMESPACES.GMD, 'gmd:administrativeArea');
            administrativeAreaNode.appendChild(this.encodeCharacterString(address.administrativeArea, document));
            node.appendChild(administrativeAreaNode);
        }

        if (address.postalCode) {
            const postalCodeNode = document.createElementNS(NAMESPACES.GMD, 'gmd:postalCode');
            postalCodeNode.appendChild(this.encodeCharacterString(address.postalCode, document));
            node.appendChild(postalCodeNode);
        }

        if (address.country) {
            const countryNode = document.createElementNS(NAMESPACES.GMD, 'gmd:country');
            countryNode.appendChild(this.encodeCharacterString(address.country, document));
            node.appendChild(countryNode);
        }

        if (address.electronicMailAddress) {
            address.electronicMailAddress.forEach((electronicMailAddress) => {
                const electronicMailAddressNode = document.createElementNS(NAMESPACES.GMD, 'gmd:electronicMailAddress');
                electronicMailAddressNode.appendChild(this.encodeCharacterString(electronicMailAddress, document));
                node.appendChild(electronicMailAddressNode);
            });
        }

        return node;
    }

    public encodeResponsibleParty(responsibleParty: ResponsibleParty, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GMD, 'CI_ResponsibleParty');

        if (responsibleParty.individualName) {
            const individualNameNode = document.createElementNS(NAMESPACES.GMD, 'gmd:individualName');
            individualNameNode.appendChild(this.encodeCharacterString(responsibleParty.individualName, document));
            node.appendChild(individualNameNode);
        }

        if (responsibleParty.organisationName) {
            const organisationNameNode = document.createElementNS(NAMESPACES.GMD, 'gmd:organisationName');
            organisationNameNode.appendChild(this.encodeCharacterString(responsibleParty.organisationName, document));
            node.appendChild(organisationNameNode);
        }

        if (responsibleParty.positionName) {
            const positionNameNode = document.createElementNS(NAMESPACES.GMD, 'gmd:positionName');
            positionNameNode.appendChild(this.encodeCharacterString(responsibleParty.positionName, document));
            node.appendChild(positionNameNode);
        }

        if (responsibleParty.contactInfo) {
            const contactInfoNode = document.createElementNS(NAMESPACES.GMD, 'gmd:contactInfo');
            contactInfoNode.appendChild(this.encodeContact(responsibleParty.contactInfo, document));
            node.appendChild(contactInfoNode);
        }

        if (responsibleParty.role) {
            const role = document.createElementNS(NAMESPACES.GMD, 'gmd:role');
            role.appendChild(this.encodeRole(responsibleParty.role, document));
            node.appendChild(role);
        }

        return node;
    }

    public encodeRole(role: Role, document: Document): Node {
        return this.encodeCodeListValue(document, NAMESPACES.GMD, 'gmd', 'CI_RoleCode', role);
    }

    public encodeOnlineFunction(onlineFunction: OnlineFunction, document: Document): Node {
        return this.encodeCodeListValue(document, NAMESPACES.GMD, 'gmd', 'CI_OnLineFunctionCode', onlineFunction);
    }

    public encodeRestriction(restriction: Restriction, document: Document): Node {
        return this.encodeCodeListValue(document, NAMESPACES.GMD, 'gmd', 'MD_RestrictionCode', restriction);
    }

    public encodeLegalConstraints(legalConstraints: LegalConstraints, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GMD, 'gmd:MD_LegalConstraints');

        if (legalConstraints.accessConstraints) {
            legalConstraints.accessConstraints.forEach((contraint) => {
                const accessConstraintsNode = document.createElementNS(NAMESPACES.GMD, 'gmd:accessConstraints');
                accessConstraintsNode.appendChild(this.encodeRestriction(contraint, document));
                node.appendChild(accessConstraintsNode);
            });
        }

        if (legalConstraints.useConstraints) {
            legalConstraints.useConstraints.forEach((contraint) => {
                const useConstraintsNode = document.createElementNS(NAMESPACES.GMD, 'gmd:useConstraints');
                useConstraintsNode.appendChild(this.encodeRestriction(contraint, document));
                node.appendChild(useConstraintsNode);
            });
        }

        if (legalConstraints.otherConstraints) {
            legalConstraints.otherConstraints.forEach((contraint) => {
                const otherConstraintsNode = document.createElementNS(NAMESPACES.GMD, 'gmd:otherConstraints');
                otherConstraintsNode.appendChild(this.encodeCharacterString(contraint, document));
                node.appendChild(otherConstraintsNode);
            });
        }

        return node;
    }

    private encodeCodeListValue(
        document: Document,
        namespace: string,
        prefix: string,
        elementName: string,
        codelListValue: string,
        codeList: string = 'http://schemas.opengis.net/iso/19139/20070417/resources/codelist/gmxCodelists.xml',
        codeSpace: string = 'ISOTC211/19115',
        name?: string): Node {

        const node = document.createElementNS(namespace, `${prefix}:${elementName}`);

        node.setAttribute('codeList', `${codeList}#${elementName}`);
        node.setAttribute('codeListValue', codelListValue);
        node.setAttribute('codeSpace', codeSpace);

        if (name) {
            node.textContent = name;
        }

        return node;
    }

    private encodeCharacterString(value: string, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GCO, 'gco:CharacterString');
        node.textContent = value;
        return node;
    }

    private encodeUrl(value: string, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.GMD, 'gmd:URL');
        node.textContent = value;
        return node;
    }

}
