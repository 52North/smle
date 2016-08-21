import {Configuration} from './Configuration';

/**
 * Configuration that specifies that an element is mandatory (not optional). <br>
 * This is the default configuration.
 */
export class TrueConfiguration implements Configuration {
    
    /**
     * @return true
     */
    isFieldMandatory(name: string): boolean {
        return true;
    }

    /**
     * @return TrueConfiguration object
     */
    getConfigFor(name: string): Configuration {
        return new TrueConfiguration();
    }
}
