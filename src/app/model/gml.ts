
export class Envelope {
    constructor() {}
}

export class CodeWithAuthority {
    codeSpace: string;
    value: string;
    constructor() {}
}

export abstract class AbstractGML {
    description: string;
    descriptionReference: string;
    name: string[];
    identifier: CodeWithAuthority[];
    constructor() {}
}

export abstract class AbstractFeature extends AbstractGML {
    boundedBy: Envelope;
    constructor() {
        super();
    }
}

