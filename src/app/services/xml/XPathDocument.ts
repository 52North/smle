import { SensorMLNamespaceResolver } from './SensorMLNamespaceResolver';

export class XPathDocument {

    private static MEDIA_TYPE = 'application/xml';

    public static parse(xml: string): XPathDocument {
        let parser = new DOMParser();
        let document = parser.parseFromString(xml, XPathDocument.MEDIA_TYPE);
        return new XPathDocument(document);
    }

    constructor(public document: Document) { }

    public eval(expr: string, context?: Node): boolean | string | number | Node | Node[] {
        let result = this._eval(expr, context);

        switch (result.resultType) {
            case XPathResult.FIRST_ORDERED_NODE_TYPE:
                return result.singleNodeValue;
            case XPathResult.ANY_UNORDERED_NODE_TYPE:
                return result.singleNodeValue;
            case XPathResult.BOOLEAN_TYPE:
                return result.booleanValue;
            case XPathResult.NUMBER_TYPE:
                return result.numberValue;
            case XPathResult.STRING_TYPE:
                return result.stringValue;
            case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
                return this.parseIterator(result);
            case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
                return this.parseIterator(result);
            case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
                return this.parseSnapshot(result);
            case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
                return this.parseSnapshot(result);
            default:
                throw new Error('Unsupported result type: ' + result.resultType);
        }
    }

    private parseSnapshot(result: XPathResult): Node[] {
        let array: Node[] = new Array<Node>(result.snapshotLength);
        for (let i = 0; i < result.snapshotLength; ++i) {
            array[i] = result.snapshotItem(i);
        }
        return array;
    }

    private parseIterator(result: XPathResult): Node[] {
        let array: Node[] = [];
        let node: Node = result.iterateNext();
        while (node != null) {
            array.push(node);
            node = result.iterateNext();
        }
        return array;
    }

    private _eval(expression: string, context?: Node) {
        context = context || this.document.documentElement;
        let resolver: XPathNSResolver = {
            lookupNamespaceURI(prefix: string): string {
                return new SensorMLNamespaceResolver().getNamespace(prefix);
            }
        };
        return this.document.evaluate(
            expression, context, resolver, XPathResult.ANY_TYPE, null);
    }

}
