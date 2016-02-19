import { Namespaces } from './Namespaces';
import { Contact, Phone, OnlineResource, Address, ResponsibleParty } from '../../model/iso';
import { Role, OnlineFunction } from '../../model/iso';
import { LegalConstraints, Restriction } from '../../model/iso';

export class IsoEncoder {

  public encodeContact(contact: Contact, document: Document): Node {

    let node = document.createElementNS(Namespaces.GMD, 'CI_Contact');

    if (contact.phone) {
      let phoneNode = document.createElementNS(Namespaces.GMD, 'gmd:phone');
      phoneNode.appendChild(this.encodePhone(contact.phone, document));
      node.appendChild(phoneNode);
    }

    if (contact.address) {
      let addressNode = document.createElementNS(Namespaces.GMD, 'gmd:address');
      addressNode.appendChild(this.encodeAddress(contact.address, document));
      node.appendChild(addressNode);
    }

    if (contact.onlineResource) {
      let onlineResourceNode = document.createElementNS(Namespaces.GMD, 'gmd:onlineResource');
      onlineResourceNode.appendChild(this.encodeOnlineResource(contact.onlineResource, document));
      node.appendChild(onlineResourceNode);
    }

    if (contact.hoursOfService) {
      let hoursOfServiceNode = document.createElementNS(Namespaces.GMD, 'gmd:hoursOfService');
      hoursOfServiceNode.appendChild(this.encodeCharacterString(contact.hoursOfService, document));
      node.appendChild(hoursOfServiceNode);
    }

    if (contact.contactInstructions) {
      let contactInstructionsNode = document.createElementNS(Namespaces.GMD, 'gmd:contactInstructions');
      contactInstructionsNode.appendChild(this.encodeCharacterString(contact.contactInstructions, document));
      node.appendChild(contactInstructionsNode);
    }

    return node;

  }

  public encodePhone(phone: Phone, document: Document): Node {
    let node = document.createElementNS(Namespaces.GMD, 'gmd:CI_Telephone');

    if (phone.voice) {
      phone.voice.forEach(voice => {
        let voiceNode = document.createElementNS(Namespaces.GMD, 'gmd:voice');
        voiceNode.appendChild(this.encodeCharacterString(voice, document));
        node.appendChild(voiceNode);
      });
    }

    if (phone.facsimile) {
      phone.facsimile.forEach(facsimile => {
        let facsimileNode = document.createElementNS(Namespaces.GMD, 'gmd:facsimile');
        facsimileNode.appendChild(this.encodeCharacterString(facsimile, document));
        node.appendChild(facsimileNode);
      });
    }

    return node;
  }

  public encodeOnlineResource(onlineResource: OnlineResource, document: Document): Node {
    let node = document.createElementNS(Namespaces.GMD, 'gmd:OnlineResource');

    if (onlineResource.linkage) {
      let linkageNode = document.createElementNS(Namespaces.GMD, 'gmd:linkage');
      linkageNode.appendChild(this.encodeUrl(onlineResource.linkage, document));
      node.appendChild(linkageNode);
    }

    if (onlineResource.protocol) {
      let protocolNode = document.createElementNS(Namespaces.GMD, 'gmd:protocol');
      protocolNode.appendChild(this.encodeCharacterString(onlineResource.protocol, document));
      node.appendChild(protocolNode);
    }

    if (onlineResource.applicationProfile) {
      let applicationProfileNode = document.createElementNS(Namespaces.GMD, 'gmd:applicationProfile');
      applicationProfileNode.appendChild(
        this.encodeCharacterString(onlineResource.applicationProfile, document));
      node.appendChild(applicationProfileNode);
    }

    if (onlineResource.name) {
      let nameNode = document.createElementNS(Namespaces.GMD, 'gmd:name');
      nameNode.appendChild(this.encodeCharacterString(onlineResource.name, document));
      node.appendChild(nameNode);
    }

    if (onlineResource.description) {
      let descriptionNode = document.createElementNS(Namespaces.GMD, 'gmd:description');
      descriptionNode.appendChild(this.encodeCharacterString(onlineResource.description, document));
      node.appendChild(descriptionNode);
    }

    if (onlineResource['function']) {
      let functionNode = document.createElementNS(Namespaces.GMD, 'gmd:function');
      functionNode.appendChild(this.encodeOnlineFunction(onlineResource['function'], document));
      node.appendChild(functionNode);
    }

    return node;
  }

  public encodeAddress(address: Address, document: Document): Node {
    let node = document.createElementNS(Namespaces.GMD, 'gmd:CI_Address');

    if (address.deliveryPoint) {
      address.deliveryPoint.forEach(deliveryPoint => {
        let deliveryPointNode = document.createElementNS(Namespaces.GMD, 'gmd:deliveryPoint');
        deliveryPointNode.appendChild(this.encodeCharacterString(deliveryPoint, document));
        node.appendChild(deliveryPointNode);
      });
    }

    if (address.city) {
      let cityNode = document.createElementNS(Namespaces.GMD, 'gmd:city');
      cityNode.appendChild(this.encodeCharacterString(address.city, document));
      node.appendChild(cityNode);
    }

    if (address.administrativeArea) {
      let administrativeAreaNode = document.createElementNS(Namespaces.GMD, 'gmd:administrativeArea');
      administrativeAreaNode.appendChild(this.encodeCharacterString(address.administrativeArea, document));
      node.appendChild(administrativeAreaNode);
    }

    if (address.postalCode) {
      let postalCodeNode = document.createElementNS(Namespaces.GMD, 'gmd:postalCode');
      postalCodeNode.appendChild(this.encodeCharacterString(address.postalCode, document));
      node.appendChild(postalCodeNode);
    }

    if (address.country) {
      let countryNode = document.createElementNS(Namespaces.GMD, 'gmd:country');
      countryNode.appendChild(this.encodeCharacterString(address.country, document));
      node.appendChild(countryNode);
    }

    if (address.electronicMailAddress) {
      address.electronicMailAddress.forEach(electronicMailAddress => {
        let electronicMailAddressNode = document.createElementNS(Namespaces.GMD, 'gmd:electronicMailAddress');
        electronicMailAddressNode.appendChild(this.encodeCharacterString(electronicMailAddress, document));
        node.appendChild(electronicMailAddressNode);
      });
    }

    return node;
  }

  public encodeResponsibleParty(responsibleParty: ResponsibleParty, document: Document): Node {
    let node = document.createElementNS(Namespaces.GMD, 'CI_ResponsibleParty');

    if (responsibleParty.individualName) {
      let individualNameNode = document.createElementNS(Namespaces.GMD, 'gmd:individualName');
      individualNameNode.appendChild(this.encodeCharacterString(responsibleParty.individualName, document));
      node.appendChild(individualNameNode);
    }

    if (responsibleParty.organisationName) {
      let organisationNameNode = document.createElementNS(Namespaces.GMD, 'gmd:origanisationName');
      organisationNameNode.appendChild(this.encodeCharacterString(responsibleParty.organisationName, document));
      node.appendChild(organisationNameNode);
    }

    if (responsibleParty.positionName) {
      let positionNameNode = document.createElementNS(Namespaces.GMD, 'gmd:positionName');
      positionNameNode.appendChild(this.encodeCharacterString(responsibleParty.positionName, document));
      node.appendChild(positionNameNode);
    }

    if (responsibleParty.contactInfo) {
      let contactInfoNode = document.createElementNS(Namespaces.GMD, 'gmd:contactInfo');
      contactInfoNode.appendChild(this.encodeContact(responsibleParty.contactInfo, document));
      node.appendChild(contactInfoNode);
    }

    if (responsibleParty.role) {
      let role = document.createElementNS(Namespaces.GMD, 'gmd:role');
      role.appendChild(this.encodeRole(responsibleParty.role, document));
      node.appendChild(role);
    }

    return node;
  }

  public encodeRole(role: Role, document: Document): Node {
    return this.encodeCodeListValue(document, Namespaces.GMD, 'gmd', 'CI_RoleCode', role);
  }

  public encodeOnlineFunction(onlineFunction: OnlineFunction, document: Document): Node {
    return this.encodeCodeListValue(document, Namespaces.GMD, 'gmd', 'CI_OnLineFunctionCode', onlineFunction);
  }

  public encodeRestriction(restriction: Restriction, document: Document): Node {
    return this.encodeCodeListValue(document, Namespaces.GMD, 'gmd', 'MD_RestrictionCode', restriction);
  }

  public encodeLegalConstraints(legalConstraints: LegalConstraints, document: Document): Node {
    let node = document.createElementNS(Namespaces.GMD, 'gmd:MD_LegalConstraints');

    if (legalConstraints.accessConstraints) {
      legalConstraints.accessConstraints.forEach(contraint => {
        let accessConstraintsNode = document.createElementNS(Namespaces.GMD, 'gmd:accessConstraints');
        accessConstraintsNode.appendChild(this.encodeRestriction(contraint, document));
        node.appendChild(accessConstraintsNode);
      });
    }

    if (legalConstraints.useConstraints) {
      legalConstraints.useConstraints.forEach(contraint => {
        let useConstraintsNode = document.createElementNS(Namespaces.GMD, 'gmd:useConstraints');
        useConstraintsNode.appendChild(this.encodeRestriction(contraint, document));
        node.appendChild(useConstraintsNode);
      });
    }

    if (legalConstraints.otherConstraints) {
      legalConstraints.otherConstraints.forEach(contraint => {
        let otherConstraintsNode = document.createElementNS(Namespaces.GMD, 'gmd:otherConstraints');
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

    let node = document.createElementNS(namespace, `${prefix}:${elementName}`);

    node.setAttribute('codeList', `${codeList}#${elementName}`);
    node.setAttribute('codeListValue', codelListValue);
    node.setAttribute('codeSpace', codeSpace);

    if (name) {
      node.textContent = name;
    }

    return node;
  }

  private encodeCharacterString(value: string, document: Document): Node {
    let node = document.createElementNS(Namespaces.GCO, 'gco:CharacterString');
    node.textContent = value;
    return node;
  }

  private encodeUrl(value: string, document: Document): Node {
    let node = document.createElementNS(Namespaces.GCO, 'gco:URL');
    node.textContent = value;
    return node;
  }


}
