import { DescriptionConfigDynamicGUI } from './DescriptionConfigDynamicGUI';
import { DefaultDescriptionConfig } from './DefaultDescriptionConfig';
import { DescriptionConfig } from './DescriptionConfig';
import { TrueDescriptionConfig } from './TrueDescriptionConfig';
import { FalseDescriptionConfig } from './FalseDescriptionConfig';

export class JSONDescriptionConfig implements DescriptionConfigDynamicGUI {
    constructor(private config: any, private dynamicGUI:boolean) {
      //  alert(JSON.stringify(config));
    }

    public isFieldMandatory(name: string): boolean {
        var value = this.getValue(name);
        if (this.dynamicGUI) {
            if(typeof value == 'undefined'){
                return false;
            }else {
                if(typeof value._requireValue != "undefined"){
                     return value._requireValue;
                }
                return true;
            } 
        }
        return typeof value === 'undefined' || !!value;
    }

    public isFieldFixed(name: string): boolean {
        var value = this.getValue(name);
        if (this.dynamicGUI) {
            return value._fixValue;
        }
        return false;
    }

    public isFieldVisible(name: string, formFieldType: string): boolean {
        var value = this.getValue(name);
        if (this.dynamicGUI) {
            if(typeof value == 'undefined'){
                return false;
            }else {
                if(typeof value._hideField != "undefined"){
                     return !value._hideField["_"+formFieldType];
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
