/**
 * This abstract class provides abstract methods for serialization and deserialization. <p>
 * serialization: description &lt;T&gt; to string <br>
 * deserialization: string or Document to &lt;T&gt; 
 */
export abstract class XmlService<T> {
  abstract serialize(description: T): string;
  abstract deserialize(xml: string | Document): T;
}
