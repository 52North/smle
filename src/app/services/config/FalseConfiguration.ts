import {Configuration} from './Configuration';

/**
 * Configuration that specifies that an element is optional (not mandatory). <br>
 * By default all elements are mandatory.
 */
export class FalseConfiguration implements Configuration {
    /**
     * @return false
     */
    isFieldMandatory(name: string): boolean {
        return false;
    }
    
    /**
     * @return FalseConfiguration object
     */
    getConfigFor(name: string): Configuration {
        return new FalseConfiguration();
    }
}
