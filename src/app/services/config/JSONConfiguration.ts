import {Configuration} from './Configuration';
import {TrueConfiguration} from './TrueConfiguration';
import {FalseConfiguration} from './FalseConfiguration';

/**
 * Configuration about if the elements are mandatory or optional. <br>
 * By default all elements are mandatory (value==="undefined" -&gt; value not found -&gt return true)
 */
export class JSONConfiguration implements Configuration {
    constructor(private config: Object) {
    }

    public isFieldMandatory(name: string): boolean {
        var value = this.getValue(name);
        return typeof value === 'undefined' || !!value;
    }

/**
 * Search the name in the config-object-array <p>
 * @return true, false or object and null if the name is not a string or has length==0
 */
    private getValue(name: string): any {
        if (typeof name !== 'string' || name.length === 0) {
            return null;
        }

        return this.config[name];
    }

/**
 * Search the name of an element in the config object.<br>
 * TrueConfiguration: element is mandatory <br>
 * FalseConfiguration: element is not mandatory <br>
 * JSONConfiguration: element is not a leaf, object with further config can be processed <p>
 * 
 * @return <br>
 *         value of name is true or name was not found -&gt; TrueConfiguration, <br>
 *         name is not a string or has length==0 -&gt; FalseConfiguration, <br>
 *         value of name is an object -&gt; new JSONConfiguration(object)
 */
    public getConfigFor(name: string): Configuration {
        var value = this.getValue(name);
        if (value === true || typeof value === 'undefined') {
            return new TrueConfiguration();
        } else if (!value) {
            return new FalseConfiguration();
        } else {
            return new JSONConfiguration(value);
        }
    }
}
