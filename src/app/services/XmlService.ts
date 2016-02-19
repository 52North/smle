
export interface XmlService<T> {
  serialize(description: T): string;
  deserialize(xml: string | Document): T;
}
