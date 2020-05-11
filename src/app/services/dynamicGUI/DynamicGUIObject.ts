import { AbstractProcess } from '@helgoland/sensorml';

import { DynamicGUIDescriptionConfig } from '../config/DynamicGUIDescriptionConfig';

export class DynamicGUIObject {
    private _model: AbstractProcess;
    private _configuration: DynamicGUIDescriptionConfig;
    get model(): AbstractProcess {
        return this._model;
    }
    set model(model: AbstractProcess) {
        this._model = model;
    }
    get configuration(): DynamicGUIDescriptionConfig {
        return this._configuration;
    }
    set configuration(configuration: DynamicGUIDescriptionConfig) {
        this._configuration = configuration;
    }
}
