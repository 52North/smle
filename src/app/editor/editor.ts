import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractProcess } from '../model/sml';
import { DescriptionConfigService } from '../services/DescriptionConfigService';
import { DescriptionConfig } from '../services/config/DescriptionConfig';
import { EditorService } from '../services/EditorService';
import { PhysicalSystem } from '../model/sml/PhysicalSystem';
import { PhysicalComponent } from '../model/sml/PhysicalComponent';
import { SimpleProcess } from '../model/sml/SimpleProcess';
import { PROCEDURE_ID_PARAM, SOS_URL_PARAM } from '../routes';

enum DescriptionType {
    PhysicalSystem = 1,
    PhysicalComponent = 2,
    SimpleProcess = 3
}

@Component({
    selector: 'editor',
    template: require('./editor.html'),
    styles: [require('./editor.scss')]
})
export class Editor implements OnInit {
    public description: AbstractProcess;
    public config: DescriptionConfig;
    public actionBarNeeded: boolean = false;

    private descriptionType: DescriptionType;
    private descriptionLoadingError: string;
    private descriptionIsLoading: boolean = true;

    constructor(
        private descriptionConfigService: DescriptionConfigService,
        private editorService: EditorService,
        private route: ActivatedRoute
    ) { }

    publishDescription(): void {
        this.editorService.startPublishingDescription(this.description);
    }

    ngOnInit(): void {
        let snapshot = this.route.snapshot;
        if (snapshot.params['id']) {
            this.editorService.getDescriptionForId(snapshot.params['id']).then(desc => {
                this.descriptionIsLoading = false;
                if (desc != null) {
                    this.setDescription(desc);
                }
            }).catch(() => {
                this.descriptionIsLoading = false;
            });
        } else if (snapshot.queryParams[PROCEDURE_ID_PARAM] && snapshot.queryParams[SOS_URL_PARAM]) {
            this.editorService.loadDescriptionByIdAndUrl(
                snapshot.queryParams[PROCEDURE_ID_PARAM],
                snapshot.queryParams[SOS_URL_PARAM]
            ).subscribe(res => {
                this.actionBarNeeded = true;
                this.setDescription(res);
            }, error => {
                this.descriptionLoadingError = error;
            }, () => {
                this.descriptionIsLoading = false;
            });
        } else {
            this.descriptionIsLoading = false;
            this.setDescription(this.editorService.getDescription());
        }
        this.descriptionConfigService.getConfiguration().then(configuration => this.config = configuration);
    }

    public onSelectDescriptionType(type: string) {
        if (type === 'PhysicalSystem') {
            this.setDescription(new PhysicalSystem());
        } else if (type === 'PhysicalComponent') {
            this.setDescription(new PhysicalComponent());
        } else if (type === 'SimpleProcess') {
            this.setDescription(new SimpleProcess());
        }
    }

    private setDescription(desc: AbstractProcess) {
        this.description = desc;
        this.descriptionType = this.getDescriptionType(desc);
    }

    private getDescriptionType(desc: AbstractProcess) {
        if (desc instanceof PhysicalSystem) {
            return DescriptionType.PhysicalSystem;
        } else if (desc instanceof PhysicalComponent) {
            return DescriptionType.PhysicalComponent;
        } else if (desc instanceof SimpleProcess) {
            return DescriptionType.SimpleProcess;
        } else {
            return undefined;
        }
    }
}
