import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AbstractProcess, AbstractPhysicalProcess, AggregatingProcess } from '../../model/sml';
import { Component } from '../../model/sml/Component';
import { SosService } from '../sos.service';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';

@Injectable()
export class ConnectDescriptionService {

    public parentDescription: AggregatingProcess;
    public childDescription: AbstractPhysicalProcess;
    public attachedTo: boolean;

    constructor(
        private http: Http,
        private router: Router,
        private sosService: SosService
    ) { }

    public openAttachedToDescription(desc: AbstractPhysicalProcess) {
        this.attachedTo = true;
        this.parentDescription = null;
        this.childDescription = desc;
        this.openView();
    }

    public openComponentsDescription(desc: AggregatingProcess) {
        this.attachedTo = false;
        this.childDescription = null;
        this.parentDescription = desc;
        this.openView();
    }

    public clearAttachedTo(childDesc: AbstractPhysicalProcess, parentId: string): Observable<boolean> {
        return new Observable<boolean>((observer: Observer<boolean>) => {
            this.sosService.fetchDescription(parentId).subscribe((res) => {
                let parentDesc = new SensorMLXmlService().deserialize(res) as any as AggregatingProcess;
                let idx = -1;
                parentDesc.components.components.forEach((entry, i) => {
                    if (entry.title === childDesc.identifier.value) idx = i;
                });
                if (idx > -1) parentDesc.components.components.splice(idx, 1);
                this.updateDescription(parentDesc as any as AbstractProcess)
                    .subscribe(() => {
                        childDesc.attachedTo = null;
                        this.updateDescription(childDesc).subscribe(() => {
                            observer.next(true);
                            observer.complete();
                        });
                    });
            });
        });
    }

    public removeComponent(parentDesc: AggregatingProcess, idx: number): Observable<boolean> {
        return new Observable<boolean>((observer: Observer<boolean>) => {
            // remove in components
            let removedComponent = parentDesc.components.components.splice(idx, 1);
            this.updateDescription(parentDesc as any as AbstractProcess).subscribe((res) => {
                // remove attachedTo of description
                this.sosService.fetchDescription(removedComponent[0].title).subscribe((result) => {
                    let desc = new SensorMLXmlService().deserialize(result) as any as AbstractPhysicalProcess;
                    desc.attachedTo = null;
                    this.updateDescription(desc).subscribe(() => {
                        observer.next(true);
                        observer.complete();
                    });
                });
            });
        });
    }

    public connectDescriptions(
        childDesc: AbstractPhysicalProcess, parentDesc: AggregatingProcess
    ): Observable<boolean> {
        return new Observable<boolean>((observer: Observer<boolean>) => {
            let parentDescAbsPro = parentDesc as any as AbstractProcess;
            childDesc.attachedTo = this.sosService.createDescribeSensorUrl(parentDescAbsPro.identifier.value);
            this.updateDescription(childDesc).subscribe((res) => {
                let component = new Component(
                    childDesc.gmlId,
                    this.sosService.createDescribeSensorUrl(childDesc.identifier.value),
                    childDesc.identifier.value
                );
                parentDesc.components.components.push(component);
                this.updateDescription(parentDescAbsPro).subscribe(() => {
                    observer.next(true);
                    observer.complete();
                });
            });
        });
    }

    private updateDescription(desc: AbstractProcess): Observable<boolean> {
        return this.sosService.updateDescription(desc.identifier.value, desc);
    }

    private openView() {
        this.router.navigate(['/connect']);
    }
}
