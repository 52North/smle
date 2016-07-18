import {DisplayName} from '../../decorators/DisplayName';

export class Component {
    @DisplayName('Name')
    name: string;

    @DisplayName('Href')
    href: string;

    constructor(name?: string, href?: string) {
        this.name = name;
        this.href = href;
    }

    toString() {
        return this.name || 'Component';
    }
}
