import {Configuration} from './Configuration';

export class FalseConfiguration implements Configuration {
    isFieldMandatory(name: string): boolean {
        return false;
    }

    getConfigFor(name: string): Configuration {
        return new FalseConfiguration();
    }
}
