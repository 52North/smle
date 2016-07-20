import {DescribedObject} from './DescribedObject';
import {Settings} from './Settings';
import {FeatureList} from './FeatureList';
import {InputList} from './InputList';
import {OutputList} from './OutputList';
import {ParameterList} from './ParameterList';
import {AbstractModes} from './AbstractModes';
import {DisplayName} from '../../decorators/DisplayName';

/**
 * The general base model for any process.
 */
export abstract class AbstractProcess extends DescribedObject {
    /**
     * An optional property that allows one to reference the process instance in
     * an online ontology or dictionary. The value of the property must be a
     * resolvable URI.
     */
    @DisplayName('Definition')
    definition: string;
    /**
     * A reference to a base process from which this process inherits properties
     * and constraints (e.g. original equipment manufacturer's model description,
     * generic equation, etc.). The uniqueID of the referenced process must be
     * provided using the xlink:title attribute while the URL to the process
     * description must be provided by the xlink:href attribute.
     */
    @DisplayName('Type of')
    typeOf: string = null;
    /**
     * Value settings that further constrain the properties of the base process.
     */
    @DisplayName('Configuration')
    configuration: Settings;
    /**
     * A collection of features relevant to a process (e.g. the Gulf of Mexico,
     * the White House, the set of all Fibonacci Numbers, etc.); can also support
     * a sampling feature. The primary purpose of the Features of Interest is to
     * support discovery.
     */
    @DisplayName('Feature of interest')
    featureOfInterest: FeatureList = new FeatureList();
    /**
     * The list of data components (and their properties and semantics) that the
     * process will accept as input; In the standard linear equation y=mx+b; x is
     * the input, m and b are the parameters, and y is the output.
     */
    @DisplayName('Inputs')
    inputs: InputList = new InputList();
    /**
     * The list of data components (and their properties and semantics) that the
     * process will accept as parameters; In the standard linear equation y=mx+b;
     * x is the input, m and b are the parameters, and y is the output.
     */
    @DisplayName('Outputs')
    outputs: OutputList = new OutputList();
    /**
     * The list of data components (and their properties and semantics) that the
     * process will accept as parameters; In the standard linear equation y=mx+b;
     * x is the input, m and b are the parameters, and y is the output.
     */
    @DisplayName('Parameters')
    parameters: ParameterList = new ParameterList();
    /**
     * A collection of parameters that can be set at once through the selection of
     * a particular predefined mode.
     */
    @DisplayName('Modes')
    modes: AbstractModes[] = [];

    toString() {
        return 'Abstract process';
    }
}
