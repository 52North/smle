import { DisplayName } from '../../common/decorators/DisplayName';
export class UnitOfMeasure {
    @DisplayName('Code')
    code: string;

    @DisplayName('Href')
    href: string;

    toString() {
        return this.code || 'Unit of measure';
    }
}
