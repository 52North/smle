import {OnlineFunction} from './OnlineFunction';

/**
 * Information about online sources from which the dataset, specification, or
 * community profile name and extended metadata elements can be obtained.
 */
export class OnlineResource {
    linkage: string;
    protocol: string;
    applicationProfile: string;
    name: string;
    description: string;
    function: OnlineFunction;

    toString() {
        return this.name || 'Online resource';
    }
}
