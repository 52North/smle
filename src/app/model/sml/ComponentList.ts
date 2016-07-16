import { AbstractSWE } from '../swe/AbstractSWE';
import { Component } from './Component';

export class ComponentList extends AbstractSWE {
  components: Component[] = [];

  toString() {
    return 'Component list';
  }
}
