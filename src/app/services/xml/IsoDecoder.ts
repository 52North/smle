import { Address } from '../../model/iso/gmd/Address';
import { Contact } from '../../model/iso/gmd/Contact';
import { LegalConstraints } from '../../model/iso/gmd/LegalConstraints';
import { Namespaces } from './Namespaces';
import { OnlineFunction } from '../../model/iso/gmd/OnlineFunction';
import { OnlineResource } from '../../model/iso/gmd/OnlineResource';
import { Phone } from '../../model/iso/gmd/Phone';
import { ResponsibleParty } from '../../model/iso/gmd/ResponsibleParty';
import { Restriction } from '../../model/iso/gmd/Restriction';
import { Role } from '../../model/iso/gmd/Role';
import { DecoderUtils, ReturnObject } from './DecoderUtils';
import { BidiMap } from '../DynamicGUIService';


export class IsoDecoder {

    private utils = new DecoderUtils();

      private _profileIDMap : BidiMap;

    public get profileIDMap() {
        return this._profileIDMap;
    }
    public set profileIDMap(profileIDMap: BidiMap) {
        this._profileIDMap = profileIDMap;
    }
    public decodeContact(elem: Element): Contact {
        let contactElem = this.utils.getElement(elem, 'CI_Contact', Namespaces.GMD);
        if (contactElem != null) {
            let contact = new Contact();
            this._profileIDMap = this.utils.processProfileID(contactElem, contact, "", this._profileIDMap);

            let phoneElem = this.utils.getElement(contactElem, 'phone', Namespaces.GMD);
            if (phoneElem != null) {
                contact.phone = this.decodePhone(phoneElem);
                this._profileIDMap = this.utils.processProfileID(phoneElem, contact, "phone", this._profileIDMap);

            }
            let addressElem = this.utils.getElement(contactElem, 'address', Namespaces.GMD);
            if (addressElem != null) {
                contact.address = this.decodeAddress(addressElem);
                this._profileIDMap = this.utils.processProfileID(addressElem, contact, "address", this._profileIDMap);

            }
            let onlineResourceElem = this.utils.getElement(contactElem, 'onlineResource', Namespaces.GMD);
            if (onlineResourceElem != null) {
                let returnObject: ReturnObject<OnlineResource> = this.decodeOnlineResource(onlineResourceElem);
                if (returnObject) {
                contact.onlineResource = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, contact, "onlineResource", this._profileIDMap);
                }
            }
            let hoursOfServiceElem = this.utils.getElement(contactElem, 'hoursOfService', Namespaces.GMD);
            if (hoursOfServiceElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(hoursOfServiceElem);
                if (returnObject) {
                contact.hoursOfService = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, contact, "hoursOfService", this._profileIDMap);
                }
            }
            let contactInstructionsElem = this.utils.getElement(contactElem, 'contactInstructions', Namespaces.GMD);
            if (contactInstructionsElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(contactInstructionsElem);
                if (returnObject) {
                contact.contactInstructions = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, contact, "contactInstructions", this._profileIDMap);
                }
            }
            return contact;
        }
    }

    public decodePhone(elem: Element): Phone {
        let phoneElem = this.utils.getElement(elem, 'CI_Telephone', Namespaces.GMD);
        if (phoneElem != null) {
            let phone = new Phone();
            this._profileIDMap = this.utils.processProfileID(phoneElem, phone, "", this._profileIDMap);

            phone.voice = this.utils.getDecodedList(
                phoneElem,
                'voice',
                Namespaces.GMD, this._profileIDMap,
                (voice) => this.getDecodedCharacterString(voice));

            phone.facsimile = this.utils.getDecodedList(
                phoneElem,
                'facsimile',
                Namespaces.GMD, this._profileIDMap,
                (facsimile) => this.getDecodedCharacterString(facsimile));

            return phone;
        }
    }

    public decodeOnlineResource(elem: Element): ReturnObject<OnlineResource> {
        let onlineResourceElem = this.utils.getElement(elem, 'CI_OnlineResource', Namespaces.GMD);
        if (onlineResourceElem != null) {
            let onlineResource = new OnlineResource();
            this._profileIDMap = this.utils.processProfileID(onlineResourceElem, onlineResource, "", this._profileIDMap);

            let linkageElem = this.utils.getElement(onlineResourceElem, 'linkage', Namespaces.GMD);
            if (linkageElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedUrl(linkageElem);
             if (returnObject) {   onlineResource.linkage = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, onlineResource, "linkage", this._profileIDMap);
             }
            }

            let protocolElem = this.utils.getElement(onlineResourceElem, 'protocol', Namespaces.GMD);
            if (protocolElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(protocolElem);
            if (returnObject) {    onlineResource.protocol = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, onlineResource, "protocol", this._profileIDMap);
            }
            }

            let applicationProfileElem = this.utils.getElement(onlineResourceElem, 'applicationProfile', Namespaces.GMD);
            if (applicationProfileElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(applicationProfileElem);
            if (returnObject) {    onlineResource.applicationProfile = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, onlineResource, "applicationProfile", this._profileIDMap);
            }
            }
            let nameElem = this.utils.getElement(onlineResourceElem, 'name', Namespaces.GMD);
            if (nameElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(nameElem);
              if (returnObject) {  onlineResource.name = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, onlineResource, "name", this._profileIDMap);
            }
            }

            let descriptionElem = this.utils.getElement(onlineResourceElem, 'description', Namespaces.GMD);
            if (descriptionElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(descriptionElem);
            if (returnObject) {    onlineResource.description = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, onlineResource, "description", this._profileIDMap);
            }
            }
            let functionElem = this.utils.getElement(onlineResourceElem, 'function', Namespaces.GMD);
            if (functionElem != null) {
                onlineResource.function = this.decodeOnlineFunction(functionElem);
                this._profileIDMap = this.utils.processProfileID(functionElem, onlineResource, "function", this._profileIDMap);

            }
            return new ReturnObject(onlineResource, onlineResourceElem);
        }
    }

    public decodeAddress(elem: Element): Address {
        let addressElem = this.utils.getElement(elem, 'CI_Address', Namespaces.GMD);
        if (addressElem != null) {
            let address = new Address();
            this._profileIDMap = this.utils.processProfileID(addressElem, address, "", this._profileIDMap);

            let cityElem = this.utils.getElement(addressElem, 'city', Namespaces.GMD);
            if (cityElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(cityElem);
              if (returnObject) {  address.city = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, address, "city", this._profileIDMap);
              }
            }

            let administrativeAreaElem = this.utils.getElement(addressElem, 'administrativeArea', Namespaces.GMD);
            if (administrativeAreaElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(administrativeAreaElem);
             if (returnObject) {   address.administrativeArea = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, address, "administrativeArea", this._profileIDMap);
             }
            }

            let postalCodeElem = this.utils.getElement(addressElem, 'postalCode', Namespaces.GMD);
            if (postalCodeElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(postalCodeElem);
             if (returnObject) {   address.postalCode = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, address, "postalCode", this._profileIDMap);
             }
            }

            let countryElem = this.utils.getElement(addressElem, 'country', Namespaces.GMD);
            if (countryElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(countryElem);
             if (returnObject) {   address.country = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, address, "country", this._profileIDMap);
             }
            }

            address.deliveryPoint = this.utils.getDecodedList(
                addressElem,
                'deliveryPoint',
                Namespaces.GMD, this._profileIDMap,
                (deliveryPoint) => this.getDecodedCharacterString(deliveryPoint));

            address.electronicMailAddress = this.utils.getDecodedList(
                addressElem,
                'electronicMailAddress',
                Namespaces.GMD, this._profileIDMap,
                (electronicMailAddress) => this.getDecodedCharacterString(electronicMailAddress));

            return address;
        }
    }

    public decodeResponsibleParty(elem: Element): ReturnObject<ResponsibleParty> {
        let respPartyElem = this.utils.getElement(elem, 'CI_ResponsibleParty', Namespaces.GMD);

        if (respPartyElem != null) {
            let respParty = new ResponsibleParty();
            this._profileIDMap = this.utils.processProfileID(respPartyElem, respParty, "", this._profileIDMap);

            let individualNameElem = this.utils.getElement(respPartyElem, 'individualName', Namespaces.GMD);
            if (individualNameElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(individualNameElem);
               if (returnObject) { respParty.individualName = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, respParty, "individualName", this._profileIDMap);
               }
            }

            let organisationNameElem = this.utils.getElement(respPartyElem, 'organisationName', Namespaces.GMD);
            if (organisationNameElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(organisationNameElem);
             if (returnObject) {   respParty.organisationName = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, respParty, "organisationName", this._profileIDMap);
             }
            }

            let positionNameElem = this.utils.getElement(respPartyElem, 'positionName', Namespaces.GMD);
            if (positionNameElem != null) {
                let returnObject: ReturnObject<string> = this.getDecodedCharacterString(positionNameElem);
            if (returnObject) {    respParty.positionName = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, respParty, "positionName", this._profileIDMap);
            }
            }

            let contactInfoElem = this.utils.getElement(respPartyElem, 'contactInfo', Namespaces.GMD);
            if (contactInfoElem != null) {
                respParty.contactInfo = this.decodeContact(contactInfoElem);
                this._profileIDMap = this.utils.processProfileID(contactInfoElem, respParty, "contactInfo", this._profileIDMap);

            }

            let roleElem = this.utils.getElement(respPartyElem, 'role', Namespaces.GMD);
            if (roleElem != null) {
                respParty.role = this.decodeRole(roleElem);
                this._profileIDMap = this.utils.processProfileID(roleElem, respParty, "role", this._profileIDMap);

            }

            return new ReturnObject(respParty, respPartyElem);
        }
    }

    public decodeRole(elem: Element): Role {
        let roleElem = this.utils.getElement(elem, 'CI_RoleCode', Namespaces.GMD);

        if (roleElem != null) {
            let role = roleElem.getAttribute('codeListValue');
            if (role.indexOf('resourceProvider') >= 0) return 'resourceProvider';
            if (role.indexOf('custodian') >= 0) return 'custodian';
            if (role.indexOf('user') >= 0) return 'user';
            if (role.indexOf('originator') >= 0) return 'originator';
            if (role.indexOf('pointOfContact') >= 0) return 'pointOfContact';
            if (role.indexOf('principalInvestigator') >= 0) return 'principalInvestigator';
            if (role.indexOf('processor') >= 0) return 'processor';
            if (role.indexOf('publisher') >= 0) return 'publisher';
            if (role.indexOf('author') >= 0) return 'author';
            if (role.indexOf('owner') >= 0) return 'owner';
        }
    }

    public decodeOnlineFunction(elem: Element): OnlineFunction {
        let onlineFunctionElem = this.utils.getElement(elem, 'CI_OnLineFunctionCode', Namespaces.GMD);

        if (onlineFunctionElem != null) {
            let onlineFunction = onlineFunctionElem.getAttribute('codeListValue');
            if (onlineFunction.indexOf('download') >= 0) return 'download';
            if (onlineFunction.indexOf('information') >= 0) return 'information';
            if (onlineFunction.indexOf('offlineAccess') >= 0) return 'offlineAccess';
            if (onlineFunction.indexOf('order') >= 0) return 'order';
            if (onlineFunction.indexOf('search') >= 0) return 'search';
        }
    }

    public decodeRestriction(elem: Element): ReturnObject<Restriction> {
        let restrictionElem = this.utils.getElement(elem, 'MD_RestrictionCode', Namespaces.GMD);

        if (restrictionElem != null) {
            let restriction = restrictionElem.getAttribute('codeListValue');
            if (restriction.indexOf('copyright') >= 0) return new ReturnObject<Restriction>('copyright', restrictionElem);
            if (restriction.indexOf('patent') >= 0) return new ReturnObject<Restriction>('patent', restrictionElem);
            if (restriction.indexOf('patentPending') >= 0) return new ReturnObject<Restriction>('patentPending', restrictionElem);
            if (restriction.indexOf('trademark') >= 0) return new ReturnObject<Restriction>('trademark', restrictionElem);
            if (restriction.indexOf('license') >= 0) return new ReturnObject<Restriction>('license', restrictionElem);
            if (restriction.indexOf('intellectualPropertyRights') >= 0) return new ReturnObject<Restriction>('intellectualPropertyRights', restrictionElem);
            if (restriction.indexOf('restricted') >= 0) return new ReturnObject<Restriction>('restricted', restrictionElem);
            if (restriction.indexOf('otherRestrictions') >= 0) return new ReturnObject<Restriction>('otherRestrictions', restrictionElem);
        }
    }

    public decodeLegalConstraints(elem: Element): ReturnObject<LegalConstraints> {
        let legalConstraintsElem = this.utils.getElement(elem, 'MD_LegalConstraints', Namespaces.GMD);

        if (legalConstraintsElem != null) {
            let legalConstraints = new LegalConstraints();
            this._profileIDMap = this.utils.processProfileID(legalConstraintsElem, legalConstraints, "", this._profileIDMap);

            legalConstraints.accessConstraints = this.utils.getDecodedList(
                legalConstraintsElem,
                'accessConstraints',
                Namespaces.GMD, this._profileIDMap,
                (accConst) => this.decodeRestriction(accConst));

            legalConstraints.useConstraints = this.utils.getDecodedList(
                legalConstraintsElem,
                'useConstraints',
                Namespaces.GMD, this._profileIDMap,
                (useConst) => this.decodeRestriction(useConst));

            legalConstraints.otherConstraints = this.utils.getDecodedList(
                legalConstraintsElem,
                'otherConstraints',
                Namespaces.GMD, this._profileIDMap,
                (otherConst) => this.getDecodedCharacterString(otherConst));

            return new ReturnObject(legalConstraints, legalConstraintsElem);
        }
    }

    private getDecodedCharacterString(elem: Element): ReturnObject<string> {
        let charStringElem = this.utils.getElement(elem, 'CharacterString', Namespaces.GCO);

        if (charStringElem != null) return new ReturnObject(charStringElem.textContent, charStringElem);
    }

    private getDecodedUrl(elem: Element): ReturnObject<string> {
        let urlElem = this.utils.getElement(elem, 'URL', Namespaces.GMD);

        if (urlElem != null) return new ReturnObject(urlElem.textContent, urlElem);
    }
}
