import { AbstractPhysicalProcess } from './physicalComponent';
import { ComponentList, ConnectionList, AggregatingProcess } from './aggregateProcess';

/**
 * A PhysicalSystem is an aggregate system that can include multiple components
 * (both physical and non-physical) with explicit links between the outputs,
 * inputs, and parameters of the individual components. In a PhysicalSystem,
 * the spatial position of the System itself is relevant to its application.
 */
export class PhysicalSystem extends AbstractPhysicalProcess implements AggregatingProcess {
  components: ComponentList = new ComponentList();
  connections: ConnectionList = new ConnectionList();
  public static get SCHEMA(): string { return 'http://schemas.opengis.net/sensorML/2.0/physical_system.xsd'; }

  public static get NAME(): string { return 'PhysicalSystem'; }
}
