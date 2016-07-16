export class UnitOfMeasure {
    code: string;
    href: string;

    toString() {
        return this.code || 'Unit of measure';
    }
}
