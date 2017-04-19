import { DisplayName } from '../../common/decorators/DisplayName';
/**
 * Base substitution groups for all SWE Common objects other than value objects
 */
export abstract class AbstractSWE {
    @DisplayName('Id')
    id: string;
    /**
     * Extension slot for future extensions to this standard.
     */
    @DisplayName('Extension')
    extension: any[];

    toString(): string {
        return 'Abstract SWE';
    }
}
