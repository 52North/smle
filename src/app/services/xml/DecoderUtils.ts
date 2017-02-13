import { BidiMap } from '../dynamicGUI/BidiMap';
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
export class DecoderUtils {

    public getAttributeOfElement(
        root: Element,
        elemName: string,
        elemNamespace: string,
        attributeName: string,
        attributeNamespace: string): ReturnObject<string> {
        let elem = this.getMatchingChildElements(root, elemName, elemNamespace);
        if (elem.length === 1) {
            if (elem[0].hasAttributeNS(attributeNamespace, attributeName)) {

                return new ReturnObject(elem[0].getAttributeNS(attributeNamespace, attributeName), elem[0]);
            };
        }
    }

    public getElement(root: Element, elemName: string, elemNamespace: string): Element {
        if (root.namespaceURI === elemNamespace && root.tagName.indexOf(elemName) > -1) {
            return root;
        }
        let elem = this.getMatchingChildElements(root, elemName, elemNamespace);
        if (elem.length === 1) {
            return elem[0];
        }
        return null;
    }

    public getDecodedList<T>(
        root: Element,
        elemName: string,
        elemNamespace: string,
        profileIDMap: BidiMap,
        decodeFunc: (elem: Element) => ReturnObject<T>): Array<T> {
        let list = new Array<T>();
        let elements = this.getMatchingChildElements(root, elemName, elemNamespace);
        if (elements.length >= 1) {
            for (let i = 0; i < elements.length; i++) {
                let returnObject: ReturnObject<T> = decodeFunc(elements[i]);
                let decodedElem = returnObject.value;
                if (decodedElem != null && returnObject.docElement != null) {
                    this.processProfileID(returnObject.docElement, decodedElem, '', profileIDMap);
                    list.push(decodedElem);
                }
            }
        }
        return list;
    }

    public processProfileID(
        docElement: Element, modelElement: any, modelElementProperty: string, mapProfileID: BidiMap
    ): BidiMap {
        let attribute = docElement.getAttribute('profileID');
        if (attribute != null) {
            let profileID = attribute;
            if (profileID && modelElement && mapProfileID) {
                mapProfileID.addLinkage(modelElement, modelElementProperty, profileID);
            }
        }
        let i = 0;
        let loop = true;
        while (loop) {
            let profileID = docElement.getAttribute('profileID_' + i);
            if (profileID != null) {
                let profileIDSplit = profileID.split('_');
                if (profileIDSplit.length === 2) {
                    if (profileID && modelElement && mapProfileID) {
                        mapProfileID.addLinkage(modelElement, profileIDSplit[0], profileID);
                    }
                }
            } else {
                loop = false;
            }
            i = i + 1;
        }
        return mapProfileID;
    }

    private getMatchingChildElements(root: Element, elemName: string, elemNamespace: string): Array<Element> {
        let childNodes = root.childNodes;
        let matches = new Array<Element>();
        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes.item(i) instanceof Element) {
                let elem = childNodes.item(i) as Element;
                if (elem.namespaceURI === elemNamespace && elem.tagName.indexOf(elemName) > 0) {
                    matches.push(elem);
                }
            }
        }
        return matches;
    }
}
