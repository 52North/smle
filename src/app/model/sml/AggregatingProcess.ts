
import { ComponentList } from './ComponentList';
import { ConnectionList } from './ConnectionList';

export interface AggregatingProcess {
  /**
   * A description of a component of the aggregate process. If by reference, the
   * uniqueID of the referenced process must be provided using the xlink:title
   * attribute while the URL to the process description must be provided by the
   * xlink:href attribute.
   */
  components: ComponentList;
  /**
   * The explicit definition of data links between outputs, inputs, and
   * parameters of the components within an aggregate process.
   */
  connections: ConnectionList;
}
