export class Series {
    name: string;
    issueIdentification: string;
    page: string;

    toString() {
        return this.name || 'Series';
    }
}
