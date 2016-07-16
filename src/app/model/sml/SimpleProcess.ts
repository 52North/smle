
import { ProcessMethodProcess } from './ProcessMethodProcess';
import { ProcessMethod } from './ProcessMethod';
import { AbstractProcess } from './AbstractProcess';

export class SimpleProcess extends AbstractProcess implements ProcessMethodProcess {
  method: ProcessMethod;

  public static get SCHEMA(): string { return 'http://schemas.opengis.net/sensorML/2.0/simple_process.xsd'; }

  public static get NAME(): string { return 'SimpleProcess'; }

  toString() {
    return 'Simple process';
  }
}
