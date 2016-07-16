import { AbstractSWE } from '../swe/AbstractSWE';
import { Connection } from './Connection';

export class ConnectionList extends AbstractSWE {
  connections: Connection[] = [];

  toString() {
    return 'Connection list';
  }
}
