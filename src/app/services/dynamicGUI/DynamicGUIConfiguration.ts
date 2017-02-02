import { FormFields } from './FormFields';

export class DynamicGUIConfiguration {
    private _fixValue: boolean;
    private _requireValue: boolean;
    private _hideField: FormFields;
    private _existInForm: boolean;
    private _fixQuantity: boolean;
    private _valueFix: any;
    private _valueDefault: any;
    private _label: string;
    constructor() {
        this._hideField = new FormFields();
    }
    get fixValue(): boolean {
        return this._fixValue;
    }
    set fixValue(fixValue: boolean) {
        this._fixValue = fixValue;
    }
    get requireValue(): boolean {
        return this._requireValue;
    }
    set requireValue(requireValue: boolean) {
        this._requireValue = requireValue;
    }
    get hideField(): FormFields {
        return this._hideField;
    }
    set hideField(hideField: FormFields) {
        this._hideField = hideField;
    }

    get existInForm(): boolean {
        return this._existInForm;
    }
    set existInForm(existInForm: boolean) {
        this._existInForm = existInForm;
    }
    get fixQuantity(): boolean {
        return this._fixQuantity;
    }
    set fixQuantity(fixQuantity: boolean) {
        this._fixQuantity = fixQuantity;
    }
    get valueFix(): any {
        return this._valueFix;
    }
    set valueFix(valueFix: any) {
        this._valueFix = valueFix;
    }
    get valueDefault(): any {
        return this._valueDefault;
    }
    set valueDefault(valueDefault: any) {
        this._valueDefault = valueDefault;
    }
    get label(): any {
        return this._label;
    }
    set label(label: any) {
        this._label = label;
    }
    public getDefaultConfiguration(): DynamicGUIConfiguration {
        let configuration = new DynamicGUIConfiguration();
        configuration.fixValue = false;
        configuration.requireValue = false;
        configuration.existInForm = true;
        configuration.fixQuantity = false;
        configuration.valueFix = null;
        configuration.valueDefault = null;
        return configuration;
    }
}

