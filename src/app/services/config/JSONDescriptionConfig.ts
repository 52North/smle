import { DefaultDescriptionConfig } from './DefaultDescriptionConfig';
import { DescriptionConfig } from './DescriptionConfig';
import { TrueDescriptionConfig } from './TrueDescriptionConfig';
import { FalseDescriptionConfig } from './FalseDescriptionConfig';

export class JSONDescriptionConfig implements DescriptionConfig {
    constructor(private config: any, private dynamicGUI: boolean) {
        //  alert(JSON.stringify(config));
    }

    public isFieldMandatory(name: string): boolean {
        var value = this.getValue(name);
        if (this.dynamicGUI) {
            if (typeof value == 'undefined'|| value==null) {
                return false;
            } else {
                if (typeof value._requireValue != "undefined") {
                    return value._requireValue;
                }
                return true;
            }
        }
        return false;
    }

    public existInForm(name: string): boolean {
        var value = this.getValue(name);
        if (this.dynamicGUI) {
            if (typeof value == 'undefined' || value==null) {
                return true;
            }
            if (typeof value._existInForm != "undefined") {
                return value._existInForm;
            }
        }
        return true;
    }
    public isFieldFixed(name: string): boolean {
        var value = this.getValue(name);
        if (this.dynamicGUI) {
            if (typeof value == 'undefined'|| value==null) {
                return false;
            } else {
                if (typeof value._fixValue != "undefined") {
                    return value._fixValue;
                }
                return false;
            }
        }
        return false;
    }
     public elementFixQuantity(name: string): boolean {
        var value = this.getValue(name);
        if (this.dynamicGUI) {
            if (typeof value == 'undefined'|| value==null) {
                return false;
            } else {
                if (value._fixQuantity) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    public isFieldVisible(name: string, formFieldType: string): boolean {
        var value = this.getValue(name);
        if (this.dynamicGUI) {
            if (typeof value == 'undefined'|| value==null) {
                return false;
            } else {
                if (typeof value.hideField != "undefined") {
                    if (typeof value.hideField["_" + formFieldType] == "undefined") {
                        return false;
                    }
                    return !value.hideField["_" + formFieldType];
                }
                return true;
            }
        }
        return typeof value === 'undefined' || !!value;
    }
    private getValue(name: string): any {
        if (typeof name !== 'string' || name.length === 0) {
            return null;
        }
        return this.config[name];
    }

    public getConfigFor(name: string): DescriptionConfig {
        var value = this.getValue(name);
        if (this.dynamicGUI) {
            if (typeof value === 'undefined') {
                return new DefaultDescriptionConfig();
            }
        } else {
            if (value === true || typeof value === 'undefined') {
                return new TrueDescriptionConfig();
            } else if (!value) {
                return new FalseDescriptionConfig();
            }
        }
        return new JSONDescriptionConfig(value, this.dynamicGUI);
    }
}
