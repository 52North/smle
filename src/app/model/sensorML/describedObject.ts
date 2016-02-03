
import {KeywordList,Term,Time,Event} from '../sensorML';
import {LegalConstraints,ResponsibleParty,OnlineResource} from '../iso19115';
import {AbstractDataComponent} from '../swe';

export abstract class DescribedObject {
    extension: any[];
    language: string;
    keywords: KeywordList[];
    identification: Term[];
    classification: Term[];
    validTime: Time[];
    securityConstraints: any[];
    legalConstraints: LegalConstraints;
    characteristics: AbstractDataComponent[];
    capabilities: AbstractDataComponent[];
    contacts: ResponsibleParty[];
    documentation: OnlineResource[];
    history: Event[];
    constructor() {}
}