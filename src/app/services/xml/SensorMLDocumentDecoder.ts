import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { AggregateProcess } from '../../model/sml/AggregateProcess';
import { Namespaces } from './Namespaces';
import { PhysicalComponent } from '../../model/sml/PhysicalComponent';
import { PhysicalSystem } from '../../model/sml/PhysicalSystem';
import { SensorMLDecoder } from './SensorMLDecoder';
import { SensorMLNamespaceResolver } from './SensorMLNamespaceResolver';
import { SimpleProcess } from '../../model/sml/SimpleProcess';
import { BidiMap } from '../DynamicGUIService';

export class SensorMLDocumentDecoder {

    private decoder = new SensorMLDecoder();
      private _profileIDMap : BidiMap;

    public get profileIDMap() {
        return this._profileIDMap;
    }
    public set profileIDMap(profileIDMap: BidiMap) {
        this._profileIDMap = profileIDMap;
        this.decoder.profileIDMap=this._profileIDMap;
    }
    public decode(document: Document): AbstractProcess {
        let process = this.createProcessOfDocument(document);
        this.decoder.decodeDocument(document.documentElement, process);
        return process;
    }

    private createProcessOfDocument(document: Document): AbstractProcess {
        if (document.getElementsByTagNameNS(Namespaces.SML, SimpleProcess.NAME).length === 1) {
            return new SimpleProcess();
        }
        if (document.getElementsByTagNameNS(Namespaces.SML, AggregateProcess.NAME).length === 1) {
            return new AggregateProcess();
        }
        if (document.getElementsByTagNameNS(Namespaces.SML, PhysicalComponent.NAME).length === 1) {
            return new PhysicalComponent();
        }
        if (document.getElementsByTagNameNS(Namespaces.SML, PhysicalSystem.NAME).length === 1) {
            return new PhysicalSystem();
        }
        throw new Error('Unsupported process type');
    }
}
