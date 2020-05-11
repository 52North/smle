import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AbstractProcess, AggregateProcess, PhysicalComponent, PhysicalSystem, SimpleProcess, Term, XmlService } from '@helgoland/sensorml';

import { DescriptionRepository } from '../services/DescriptionRepository';
import { DescriptionConfig } from './config/DescriptionConfig';
import { DescriptionConfigService } from './DescriptionConfigService';
import { DynamicGUIObject } from './dynamicGUI/DynamicGUIObject';
import { DynamicGUIService } from './dynamicGUI/DynamicGUIService';
import { EditorMode } from './EditorMode';

export enum DescriptionType {
    PhysicalSystem = 1,
    PhysicalComponent = 2,
    SimpleProcess = 3,
    DynamicGUI = 4,
    AggregateProcess = 5
}

@Injectable()
export class EditorService {

    protected description: AbstractProcess;
    protected procedureId: string;
    protected sosUrl: string;
    protected editorMode: EditorMode;

    constructor(
        protected service: DescriptionRepository,
        protected router: Router,
        protected xmlService: XmlService<AbstractProcess>,
        protected configService: DescriptionConfigService,
        protected dynamicGUIService: DynamicGUIService
    ) { }

    openEditorWithDescription(desc: AbstractProcess) {
        this.description = desc;
        this.router.navigate(['/editor']);
    }

    getDescriptionForId(id: string): Observable<AbstractProcess> {
        this.sosUrl = null;
        this.procedureId = null;
        this.editorMode = EditorMode.Default;
        return new Observable<AbstractProcess>((observer: Observer<AbstractProcess>) => {
            if (id) {
                this.service.getDescription(id).subscribe(
                    (desc) => {
                        observer.next(desc);
                        observer.complete();
                    },
                    (error) => {
                        observer.error(error);
                        observer.complete();
                    });
            } else {
                if (!this.description) { this.description = null; }
                observer.next(this.description);
                observer.complete();
            }
        });
    }

    useDiscoveryProfiles(): Observable<DynamicGUIObject> {
        return new Observable<DynamicGUIObject>((observer: Observer<DynamicGUIObject>) => {
            this.dynamicGUIService.getModelAndConfiguration().subscribe((returnObject: DynamicGUIObject) => {
                this.editorMode = EditorMode.Dynamic;
                this.description = returnObject.model;
                observer.next(returnObject);
                observer.complete();
            });
        });
    }

    createOrUpdateVersion(description: AbstractProcess) {
        if (description.identification
            && description.identification.length > 0) {
            const identifers = description.identification[0].identifiers;
            const versionElem = identifers.find((entry) => {
                return entry.label === 'version' ? true : false;
            });
            if (versionElem) {
                versionElem.value = parseInt(versionElem.value, 10) + 1 + '';
            } else {
                const term = new Term();
                term.label = 'version';
                term.value = '1';
                identifers.push(term);
            }
        }
    }

    provideDownload(description: AbstractProcess) {
        const data = this.xmlService.serialize(description, true);
        const uriContent = 'data:application/octet-stream,' + encodeURIComponent(data);
        window.open(uriContent, 'neuesDokument');
    }

    getDescriptionType() {
        if (this.description instanceof PhysicalSystem) {
            return DescriptionType.PhysicalSystem;
        } else if (this.description instanceof PhysicalComponent) {
            return DescriptionType.PhysicalComponent;
        } else if (this.description instanceof SimpleProcess) {
            return DescriptionType.SimpleProcess;
        } else if (this.description instanceof AggregateProcess) {
            return DescriptionType.AggregateProcess;
        } else {
            return DescriptionType.DynamicGUI;
        }
    }

    getConfiguration(): Observable<DescriptionConfig> {
        return this.configService.getConfiguration(this.editorMode);
    }

    setSosUrl(sosUrl: string) {
        this.sosUrl = sosUrl;
    }

    getEditorMode(): EditorMode {
        return this.editorMode;
    }

    getDescription(): AbstractProcess {
        return this.description;
    }

    setDescription(desc: AbstractProcess) {
        this.description = desc;
    }
}
