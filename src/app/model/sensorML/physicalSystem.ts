import { AbstractPhysicalProcess } from './physicalComponent';
import { AbstractProcess } from './core';
import { Connection } from './aggregateProcess';

/**
 * A PhysicalSystem is an aggregate system that can include multiple components (both physical and non-physical) with explicit links between the outputs, inputs, and parameters of the individual components. In a PhysicalSystem, the spatial position of the System itself is relevant to its application.
 */
export class PhysicalSystem extends AbstractPhysicalProcess {
  /**
   * The collection of processes that make up a process aggregation.
   */
  components: AbstractProcess[];
  /**
   * The explicit definition of data links between outputs, inputs, and parameters of the components within an aggregate process.
   */
  connections: Connection[];
}