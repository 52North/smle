export class ReturnObject<T> {
    private _value: T;
    private _docElement: Element;

    constructor(value: T, docElement: Element) {
        this._value = value;
        this._docElement = docElement;
    }
    get value(): T {
        return this._value;
    }
    set value(value: T) {
        this._value = value;
    }
    get docElement(): Element {
        return this._docElement;
    }
    set docElement(docElement: Element) {
        this._docElement = docElement;
    }
}
