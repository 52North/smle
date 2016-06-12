import {Configuration} from './Configuration';

export class TrueConfiguration implements Configuration {
    isFieldMandatory(name: string): boolean {
        return true;
    }

    getConfigFor(name: string): Configuration {
        return new TrueConfiguration();
    }
}