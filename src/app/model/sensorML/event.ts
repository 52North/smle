
import {AbstractSWEIdentifiable, AbstractDataComponent} from '../swe';
import {CodeWithAuthority} from '../gml';
import {Term,KeywordList,Time,AbstractSetting} from '../sensorML'
import {ResponsibleParty, OnlineResource } from '../iso19115';

export class Event extends AbstractSWEIdentifiable {
    definition: CodeWithAuthority;
    keywords: KeywordList[];
    identification: Term[];
    classification: Term[];
    contacts: ResponsibleParty[];
    documentation: OnlineResource[];
    time: Array<Time>;
    property: AbstractDataComponent[];
    configuration: AbstractSetting[];
    constructor() {
        super();
    }
}
