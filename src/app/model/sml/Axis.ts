export class Axis {
    name: string;
    description: string;

    toString() {
        if (this.name && this.name.length) {
            return this.name;
        }

        return 'Axis';
    }
}
