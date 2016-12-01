import { DescriptionConfig } from './DescriptionConfig';
import { TrueDescriptionConfig } from './TrueDescriptionConfig';
import { FalseDescriptionConfig } from './FalseDescriptionConfig';

export class JSONDescriptionConfig implements DescriptionConfig {

    private defaultVisibility: boolean = true;
    private defaultFixed: boolean = false;
    private defaultMandatory: boolean = false;
    private defaultFixedQuantity: boolean = false;

    constructor(
        private config: Object
    ) { }

    public getConfigFor(name: string): DescriptionConfig {
        let value = this.getConfig(name);
        if (value === true || typeof value === 'undefined') {
            return new TrueDescriptionConfig();
        } else if (!value) {
            return new FalseDescriptionConfig();
        } else {
            return new JSONDescriptionConfig(value);
        }
    }

    public isFieldVisible(name: string, formFieldType?: string): boolean {
        let visible = this.getConfigParameter(name, 'visible');
        return (typeof visible === 'undefined') ? this.defaultVisibility : visible;
    }

    public isFieldFixed(name: string): boolean {
        let fixed = this.getConfigParameter(name, 'fixed');
        return (typeof fixed === 'undefined') ? this.defaultFixed : fixed;
    }

    public isFieldMandatory(name: string): boolean {
        let mandatory = this.getConfigParameter(name, 'mandatory');
        return (typeof mandatory === 'undefined') ? this.defaultMandatory : mandatory;
    }

    public existInForm(name: string): boolean {
        return true;
    }

    public elementFixQuantity(name: string): boolean {
        let fixedQuantity = this.getConfigParameter(name, 'fixedQuantity');
        return (typeof fixedQuantity === 'undefined') ? this.defaultFixedQuantity : fixedQuantity;
    }

    public getLabel(name: string): string {
        return undefined;
    }

    private getConfigParameter(name: string, parameter: string): any {
        if (typeof name === 'undefined') return null;
        let config = this.getConfig(name);
        if (typeof config !== 'undefined'
            && config.hasOwnProperty(parameter)
            && typeof config[parameter] !== 'undefined')
            return config[parameter];
        if (typeof config === 'boolean') return config;
    }

    private getConfig(name: string): any {
        if (typeof name !== 'string' || name.length === 0) {
            return null;
        }
        return this.config[name];
    }
}
