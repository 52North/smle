export interface Resolver {
  getPrefix(namespace: string): string;
  getNamespace(prefix: string): string;
  getPrefixes(): string[];
  getNamespaces(): string[];
}
