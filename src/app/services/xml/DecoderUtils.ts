export class DecoderUtils {
/**
 * The method finds attributes of the children of the @root element. <p>
 *  @root Element for starting the search
 *  */
  public getAttributeOfElement(
    root: Element,
    elemName: string,
    elemNamespace: string,
    attributeName: string,
    attributeNamespace: string): string {
    let elem = this.getMatchingChildElements(root, elemName, elemNamespace);
    if (elem.length === 1) {
      if (elem[0].hasAttributeNS(attributeNamespace, attributeName)) {
        return elem[0].getAttributeNS(attributeNamespace, attributeName);
      };
    }
  }
/**
 * Search for an element with a specific name and namespace. 
 * First test: root element, then the children of the root element. <p>
 * 
 * @root     Element for starting the search <br>
 * @return   Element or null
 */
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

/**
 * Decodation of all children(@elemName, @elemNamespace) of @root element. <p>
 * 
 * @return Array&lt;T&gt;
 */
  public getDecodedList<T>(
    root: Element,
    elemName: string,
    elemNamespace: string,
    decodeFunc: (elem: Element) => T): Array<T> {
    let list = new Array<T>();
    let elements = this.getMatchingChildElements(root, elemName, elemNamespace);
    if (elements.length >= 1) {
      for (let i = 0; i < elements.length; i++) {
        let decodedElem = decodeFunc(elements[i]);
        if (decodedElem != null) {
          list.push(decodedElem);
        }
      }
    }
    return list;
  }
/**
 * @return Array &lt;Element&gt;
 */
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
