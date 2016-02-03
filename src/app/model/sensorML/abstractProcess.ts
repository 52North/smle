import {
    AbstractSetting,
    InputList,
    OutputList,
    ParameterList,
    AbstractMode,
    DescribedObject
} from '../sensorML';

import {CodeWithAuthority, AbstractFeature} from '../gml'

export abstract class AbstractProcess extends DescribedObject {
    definition: CodeWithAuthority;
    typeOf: AbstractProcess;
    configuration: AbstractSetting[];
    featureOfInterest: AbstractFeature[];
    inputs: InputList;
    outputs: OutputList;
    parameters: ParameterList;
    modes: AbstractMode[];
    constructor() {
        super();
    }
}