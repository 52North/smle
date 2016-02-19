
import { Resolver } from './Resolver';
import { Namespaces } from './Namespaces';
import { Prefixes } from './Prefixes';

export class SensorMLNamespaceResolver implements Resolver {
  private _prefixToNamespace: { [Key: string]: string };
  private _namespaceToPrefix: { [Key: string]: string };

  constructor() {
    this._prefixToNamespace = {
      [Prefixes.GCO]: Namespaces.GCO,
      [Prefixes.GMD]: Namespaces.GMD,
      [Prefixes.GML]: Namespaces.GML,
      [Prefixes.SML]: Namespaces.SML,
      [Prefixes.XSI]: Namespaces.XSI,
      [Prefixes.SWE]: Namespaces.SWE,
      [Prefixes.XLINK]: Namespaces.XLINK
    };
    this._namespaceToPrefix = {
      [Namespaces.GCO]: Prefixes.GCO,
      [Namespaces.GMD]: Prefixes.GMD,
      [Namespaces.GML]: Prefixes.GML,
      [Namespaces.SML]: Prefixes.SML,
      [Namespaces.XSI]: Prefixes.XSI,
      [Namespaces.SWE]: Prefixes.SWE,
      [Namespaces.XLINK]: Prefixes.XLINK
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
