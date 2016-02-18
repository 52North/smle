
import { AbstractProcess } from './core';
import { AbstractSWE } from '../swe';

/**
 * A process that consist of a collection of linked component processes
 * resulting in a specified output.
 */
export class AggregateProcess extends AbstractProcess implements AggregatingProcess {
  components: ComponentList = new ComponentList();
  connections: ConnectionList = new ConnectionList();
}

export class ComponentList extends AbstractSWE {
  components: Component[] = [];
}

export class ConnectionList extends AbstractSWE {
  connections: Connection[] = [];
}

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

/**
 * The explicit definition of data links between outputs, inputs, and parameters
 * of the components within an aggregate process.
 */
export class Connection {
  /**
   * The output from which the link originates.
   */
  source: string;
  /**
   * The input or parameter into which the data flows.
   */
  destination: string;
}


export class Component {
  name: string;
  href: string;
}
