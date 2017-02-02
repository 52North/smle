export class FormFields {
    private _calendar: boolean;
    private _textField: boolean;
    private _map: boolean;
    private _checkbox: boolean;
    private _selectionBox: boolean;
    private _numberField: boolean;

    get calendar(): boolean {
        return this._calendar;
    }
    set calendar(calendar: boolean) {
        this._calendar = calendar;
    }
    get textField(): boolean {
        return this._textField;
    }
    set textField(textField: boolean) {
        this._textField = textField;
    }
    get map(): boolean {
        return this._map;
    }
    set map(map: boolean) {
        this._map = map;
    }
    get checkbox(): boolean {
        return this._checkbox;
    }
    set checkbox(checkbox: boolean) {
        this._checkbox = checkbox;
    }
    get selectionBox(): boolean {
        return this._selectionBox;
    }
    set selectionBox(selectionBox: boolean) {
        this._selectionBox = selectionBox;
    }
    get numberField(): boolean {
        return this._numberField;
    }
    set numberField(numberField: boolean) {
        this._numberField = numberField;
    }
}


