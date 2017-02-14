import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { JSONDescriptionConfig } from './../config/JSONDescriptionConfig';


export class DynamicGUIObject {
    private _model: AbstractProcess;
    private _configuration: JSONDescriptionConfig;
    get model(): AbstractProcess {
        return this._model;
    }
    set model(model: AbstractProcess) {
        this._model = model;
    }
    get configuration(): JSONDescriptionConfig {
        return this._configuration;
    }
    set configuration(configuration: JSONDescriptionConfig) {
        this._configuration = configuration;
    }
}


