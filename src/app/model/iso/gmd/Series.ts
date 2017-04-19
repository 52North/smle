import { DisplayName } from '../../../common/decorators/DisplayName';
export class Series {
    @DisplayName('Name')
    name: string;

    @DisplayName('Issue identification')
    issueIdentification: string;

    @DisplayName('Page')
    page: string;

    toString() {
        return this.name || 'Series';
    }
}
