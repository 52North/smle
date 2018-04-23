import { DisplayName } from '../../common/decorators/DisplayName';
/**
 * The explicit definition of data links between outputs, inputs, and parameters
 * of the components within an aggregate process.
 */
export class Connection {
    /**
     * The output from which the link originates.
     */
    @DisplayName('Source')
    source: string;
    /**
     * The input or parameter into which the data flows.
     */
    @DisplayName('Destination')
    destination: string;

    toString() {
        if (this.source && this.destination) {
            return this.source + ' → ' + this.destination;
        } else {
            return 'empty connection';
        }
    }
}
