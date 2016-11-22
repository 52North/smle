import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractProcess } from '../model/sml';
import { DescriptionRepository } from '../services/DescriptionRepository';
import { PublishDescriptionService } from '../sos/publish/publish.service';
import { SosService } from '../sos/sos.service';
import { XmlService } from '../services/XmlService';
import { Observable } from 'rxjs/Observable';
import { Term } from '../model/sml/Term';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class EditorService {
    private description: AbstractProcess;
    private sosUrl: string;

    constructor(
        private service: DescriptionRepository,
        private publish: PublishDescriptionService,
        private router: Router,
        private sosService: SosService,
        private xmlService: XmlService<AbstractProcess>
    ) {
    }

    openEditorWithDescription(desc: AbstractProcess, sosUrl: string) {
        this.description = desc;
        this.router.navigate(['/editor']);
    }

    getDescriptionForId(id: string): Promise<AbstractProcess> {
        if (id) {
            if (id === 'new') {
                this.description = null;
            } else {
                return this.service.getDescription(id);
            }
        }
        if (!this.description) {
            this.description = null;
        }
        return Promise.resolve(this.description);
    }

    loadDescriptionByIdAndUrl(id: string, url: string): Observable<AbstractProcess> {
        return new Observable<AbstractProcess>((observer: Observer<AbstractProcess>) => {
            this.sosService.fetchDescription(id, url).subscribe(res => {
                let description = this.xmlService.deserialize(res);
                this.createOrUpdateVersion(description);
                this.sosUrl = url;
                observer.next(description);
                observer.complete();
            }, error => {
                observer.error(error);
                observer.complete();
            });
        });
    }

    createOrUpdateVersion(description: AbstractProcess) {
        if (description.identification
            && description.identification.length > 0) {
            let identifers = description.identification[0].identifiers;
            let versionElem = identifers.find(entry => {
                return entry.label === 'version' ? true : false;
            });
            if (versionElem) {
                versionElem.value = parseInt(versionElem.value, 10) + 1 + '';
            } else {
                let term = new Term();
                term.label = 'version';
                term.value = '1';
                identifers.push(term);
            }
        }
    }

    startPublishingDescription(description: AbstractProcess) {
        this.publish.setDescription(description);
        this.publish.setSosUrl(this.sosUrl);
        this.router.navigate(['/publish']);
    }

    setSosUrl(sosUrl: string) {
        this.sosUrl = sosUrl;
    }

    getDescription(): AbstractProcess {
        return this.description;
    }
}
