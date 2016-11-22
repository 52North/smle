import { Injectable } from '@angular/core';
import { AbstractProcess } from '../../model/sml/AbstractProcess';

@Injectable()
export class PublishDescriptionService {

    private description: AbstractProcess;
    private sosUrl: string;

    constructor(
    ) { }

    setDescription(desc: AbstractProcess): void {
        if (!desc.gmlId) {
            desc.gmlId = 'temp_123';
        }
        if (desc.identifier && !desc.identifier.codeSpace) {
            desc.identifier.codeSpace = 'uniqueID';
        }
        this.description = desc;
    }

    getDescription(): AbstractProcess {
        return this.description;
    }

    setSosUrl(sosUrl: string) {
        this.sosUrl = sosUrl;
    }

    getSosUrl(): string {
        return this.sosUrl;
    }
}
