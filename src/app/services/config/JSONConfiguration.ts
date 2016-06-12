import {Configuration} from './Configuration';

export class JSONConfiguration implements Configuration {
    constructor(private config: Object) {
    }

    public isFieldMandatory(name: string): boolean {
        if (typeof name !== 'string' || name.length === 0) {
            return false;
        }

        var names: string[] = name.split('.');
        var value: Object = this.config;

        for (var i = 0; i < names.length; i++) {
            value = value[names[i]];

            if (value === true) {
                return true;
            } else if (!value) {
                return false;
            }
        }

        return !!value;
    }
}