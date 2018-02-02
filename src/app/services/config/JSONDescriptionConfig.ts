import { DescriptionConfig } from './DescriptionConfig';
import { TrueDescriptionConfig } from './TrueDescriptionConfig';
import { FalseDescriptionConfig } from './FalseDescriptionConfig';

export class JSONDescriptionConfig implements DescriptionConfig {

    private defaultVisibility = true;
    private defaultFixed = false;
    private defaultMandatory = false;
    private defaultFixedQuantity = false;
    private defaultShowFlatten = false;
    private defaultIsExpanded = false;

    constructor(
        private config: any
    ) { }

    public getConfigFor(name: string): DescriptionConfig {
        const value = this.getConfig(name);
        if (value === true || typeof value === 'undefined') {
            return new TrueDescriptionConfig();
        } else if (!value) {
            return new FalseDescriptionConfig();
        } else {
            return new JSONDescriptionConfig(value);
        }
    }

    public isFieldVisible(name: string, formFieldType?: string): boolean {
        const visible = this.getConfigParameter(name, 'visible');
        return (typeof visible === 'undefined') ? this.defaultVisibility : visible;
    }

    public isFieldFixed(name: string): boolean {
        const fixed = this.getConfigParameter(name, 'fixed');
        return (typeof fixed === 'undefined') ? this.defaultFixed : fixed;
    }

    public isFieldMandatory(name: string): boolean {
        const mandatory = this.getConfigParameter(name, 'mandatory');
        return (typeof mandatory === 'undefined') ? this.defaultMandatory : mandatory;
    }

    public existInForm(name: string): boolean {
        return true;
    }

    public elementFixQuantity(name: string): boolean {
        const fixedQuantity = this.getConfigParameter(name, 'fixedQuantity');
        return (typeof fixedQuantity === 'undefined') ? this.defaultFixedQuantity : fixedQuantity;
    }

    public isExpanded(): boolean {
        const isExpanded = this.config['isExpanded'];
        return (typeof isExpanded === 'undefined') ? this.defaultIsExpanded : isExpanded;
    }

    public showFlatten(name: string): boolean {
        const showFlatten = this.getConfigParameter(name, 'showFlatten');
        return (typeof showFlatten === 'undefined') ? this.defaultShowFlatten : showFlatten;
    }

    public getLabel(name: string): string {
        return undefined;
    }

    private getConfigParameter(name: string, parameter: string): any {
        if (typeof name === 'undefined') { return null; }
        const config = this.getConfig(name);
        if (typeof config !== 'undefined'
            && config.hasOwnProperty(parameter)
            && typeof config[parameter] !== 'undefined') {
            return config[parameter];
        }
        if (typeof config === 'boolean') { return config; }
    }

    private getConfig(name: string): any {
        if (typeof name !== 'string' || name.length === 0) {
            return null;
        }
        return this.config[name];
    }
}
