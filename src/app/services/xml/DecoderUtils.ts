import { BidiMap } from '../dynamicGUI/BidiMap';
import { ReturnObject } from './ReturnObject';

export class DecoderUtils {

    public getAttributeOfElement(
        root: Element,
        elemName: string,
        elemNamespace: string,
        attributeName: string,
        attributeNamespace: string): ReturnObject<string> {
        const elem = this.getMatchingChildElements(root, elemName, elemNamespace);
        if (elem.length === 1) {
            if (elem[0].hasAttributeNS(attributeNamespace, attributeName)) {
                return new ReturnObject(elem[0].getAttributeNS(attributeNamespace, attributeName), elem[0]);
            }
        }
    }

    public getElement(root: Element, elemName: string, elemNamespace: string): Element {
        if (root.namespaceURI === elemNamespace && root.tagName.indexOf(elemName) > -1) {
            return root;
        }
        const elem = this.getMatchingChildElements(root, elemName, elemNamespace);
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
        decodeFunc: (elem: Element) => ReturnObject<T>): T[] {
        const list = new Array<T>();
        const elements = this.getMatchingChildElements(root, elemName, elemNamespace);
        if (elements.length >= 1) {
            for (const element of elements) {
                const returnObject: ReturnObject<T> = decodeFunc(element);
                const decodedElem = returnObject.value;
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
        const attribute = docElement.getAttribute('profileID');
        if (attribute != null) {
            const profileID = attribute;
            if (profileID && modelElement && mapProfileID) {
                mapProfileID.addLinkage(modelElement, modelElementProperty, profileID);
            }
        }
        let i = 0;
        let loop = true;
        while (loop) {
            const profileID = docElement.getAttribute('profileID_' + i);
            if (profileID != null) {
                const profileIDSplit = profileID.split('_');
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

    private getMatchingChildElements(root: Element, elemName: string, elemNamespace: string): Element[] {
        const childNodes = root.childNodes;
        const matches = new Array<Element>();
        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes.item(i) instanceof Element) {
                const elem = childNodes.item(i) as Element;
                if (elem.namespaceURI === elemNamespace && elem.tagName.indexOf(elemName) >= 0) {
                    matches.push(elem);
                }
            }
        }
        return matches;
    }
}
