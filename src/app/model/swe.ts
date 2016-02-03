
import {CodeWithAuthority} from './gml';

export abstract class AbstractSWE {
    extension: any[];
    constructor() {}
}


export abstract class AbstractSWEIdentifiable extends AbstractSWE {
    identifier: CodeWithAuthority;
    label: string;
    description: string;
    constructor() {
        super();
    }
}

export abstract class AbstractDataComponent extends AbstractSWEIdentifiable {
    definition: CodeWithAuthority;
    optional: boolean = false;
    updatable: boolean;
    constructor() {
        super();
    }
}

export abstract class AbstractEncoding {
    constructor() {}
}

export class EncodedValues {
    constructor() {}
}

export class AllowedTokens {
    constructor() {}
}

export class AllowedTimes {
    constructor() {}
}

export class AllowedValues {
    constructor() {}
}