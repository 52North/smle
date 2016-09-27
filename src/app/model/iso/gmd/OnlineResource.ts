import { OnlineFunction } from './OnlineFunction';
import { DisplayName } from '../../../decorators/DisplayName';

/**
 * Information about online sources from which the dataset, specification, or
 * community profile name and extended metadata elements can be obtained.
 */
export class OnlineResource {
    @DisplayName('Linkage')
    linkage: string;

    @DisplayName('Protocol')
    protocol: string;

    @DisplayName('Application profile')
    applicationProfile: string;

    @DisplayName('Name')
    name: string;

    @DisplayName('Description')
    description: string;

    @DisplayName('Function')
    function: OnlineFunction;

    toString() {
        return this.name || 'Online resource';
    }
}
