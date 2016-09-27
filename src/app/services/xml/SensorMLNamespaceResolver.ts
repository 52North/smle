
import { Resolver } from './Resolver';
import { NAMESPACES } from './Namespaces';
import { PREFIXES } from './Prefixes';

export class SensorMLNamespaceResolver implements Resolver {
    private _prefixToNamespace: { [key: string]: string };
    private _namespaceToPrefix: { [key: string]: string };

    constructor() {
        this._prefixToNamespace = {
            [PREFIXES.GCO]: NAMESPACES.GCO,
            [PREFIXES.GMD]: NAMESPACES.GMD,
            [PREFIXES.GML]: NAMESPACES.GML,
            [PREFIXES.SML]: NAMESPACES.SML,
            [PREFIXES.XSI]: NAMESPACES.XSI,
            [PREFIXES.SWE]: NAMESPACES.SWE,
            [PREFIXES.XLINK]: NAMESPACES.XLINK
        };
        this._namespaceToPrefix = {
            [NAMESPACES.GCO]: PREFIXES.GCO,
            [NAMESPACES.GMD]: PREFIXES.GMD,
            [NAMESPACES.GML]: PREFIXES.GML,
            [NAMESPACES.SML]: PREFIXES.SML,
            [NAMESPACES.XSI]: PREFIXES.XSI,
            [NAMESPACES.SWE]: PREFIXES.SWE,
            [NAMESPACES.XLINK]: PREFIXES.XLINK
        };
    }

    getPrefix(namespace: string): string {
        return this._namespaceToPrefix[namespace];
    }

    getNamespace(prefix: string): string {
        return this._prefixToNamespace[prefix];
    }

    getNamespaces(): string[] {
        return Object.keys(this._namespaceToPrefix);
    }

    getPrefixes(): string[] {
        return Object.keys(this._prefixToNamespace);
    }
}
