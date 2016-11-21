import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractProcess } from '../model/sml';
import { DescriptionConfigService } from '../services/DescriptionConfigService';
import { DescriptionConfig } from '../services/config/DescriptionConfig';
import { EditorService } from '../services/EditorService';
import { PhysicalSystem } from '../model/sml/PhysicalSystem';
import { PhysicalComponent } from '../model/sml/PhysicalComponent';
import { SimpleProcess } from '../model/sml/SimpleProcess';
import { PublishDescriptionService } from '../sos/publish/publish.service';

const PROCEDURE_ID_PARAM = 'procedureId';
const SERVICE_URL_PARAM = 'serviceUrl';

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

    private descriptionType: DescriptionType;
    private descriptionLoadingError: string;
    private descriptionIsLoading: boolean = true;

    constructor(
        private publish: PublishDescriptionService,
        private descriptionConfigService: DescriptionConfigService,
        private editorService: EditorService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    publishDescription(): void {
        this.publish.setDescription(this.description);
        this.router.navigate(['/publish']);
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let id = params['id'];
            if (id) {
                this.editorService.getDescriptionForId(id).then(desc => {
                    this.descriptionIsLoading = false;
                    if (desc != null) {
                        this.setDescription(desc);
                    }
                }).catch(() => {
                    this.descriptionIsLoading = false;
                });
            }
        });
        this.route.queryParams.subscribe(queryParams => {
            if (queryParams[PROCEDURE_ID_PARAM] && queryParams[SERVICE_URL_PARAM]) {
                this.editorService.loadDescriptionByIdAndUrl(
                    queryParams[PROCEDURE_ID_PARAM],
                    queryParams[SERVICE_URL_PARAM]
                ).subscribe(res => {
                    this.setDescription(res);
                }, error => {
                    this.descriptionLoadingError = error;
                    this.descriptionIsLoading = false;
                });
            }
        });
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
