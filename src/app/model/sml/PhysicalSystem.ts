
import { AbstractPhysicalProcess } from './AbstractPhysicalProcess';
import { AggregatingProcess } from './AggregatingProcess';
import { ComponentList } from './ComponentList';
import { ConnectionList } from './ConnectionList';


export class PhysicalSystem extends AbstractPhysicalProcess implements AggregatingProcess {
  components: ComponentList = new ComponentList();
  connections: ConnectionList = new ConnectionList();
  public static get SCHEMA(): string { return 'http://schemas.opengis.net/sensorML/2.0/physical_system.xsd'; }

  public static get NAME(): string { return 'PhysicalSystem'; }
}
