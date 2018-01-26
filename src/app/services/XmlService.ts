
export abstract class XmlService<T> {
    abstract serialize(description: T, prettify: boolean): string;
    abstract deserialize(xml: string | Document): T;
}
