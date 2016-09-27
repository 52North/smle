import { DisplayName } from '../../decorators/DisplayName';

export class Component {
    @DisplayName('Name')
    name: string;

    @DisplayName('Href')
    href: string;

    @DisplayName('Title')
    title: string;

    constructor(name?: string, href?: string, title?: string) {
        this.name = name;
        this.href = href;
        this.title = title;
    }

    toString() {
        return this.title || 'Component';
    }
}
