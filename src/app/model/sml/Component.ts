export class Component {
  name: string;
  href: string;

  constructor(name?: string, href?: string) {
    this.name = name;
    this.href = href;
  }

  toString() {
    return this.name || 'Component';
  }
}
