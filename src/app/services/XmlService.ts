
export abstract class XmlService<T> {
    abstract serialize(description: T): string;
    abstract deserialize(xml: string | Document): T;
}
