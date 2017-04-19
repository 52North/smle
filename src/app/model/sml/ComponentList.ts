import { AbstractSWE } from '../swe/AbstractSWE';
import { Component } from './Component';
import { DisplayName } from '../../common/decorators/DisplayName';

export class ComponentList extends AbstractSWE {
    @DisplayName('Components')
    components: Component[] = [];

    toString() {
        return 'Component list';
    }
}
