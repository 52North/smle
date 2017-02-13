import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractProcess, PhysicalSystem, PhysicalComponent, SimpleProcess } from '../model/sml';
import { DescriptionConfigService } from '../services/DescriptionConfigService';
import { DescriptionConfig } from '../services/config/DescriptionConfig';

import { EditorService, DescriptionType } from '../services/EditorService';
import { EditorMode } from '../services/EditorMode';

import { DynamicGUIService} from '../services/dynamicGUI/DynamicGUIService';
import { DynamicGUIObject } from '../services/dynamicGUI/DynamicGUIObject';


@Component({
    selector: 'editor',
    template: require('./editor.html'),
    styles: [require('./editor.scss')]
})
export class Editor implements OnInit {
    public description: AbstractProcess;
    public config: DescriptionConfig;
    public editorMode: EditorMode;
    public actionBarNeeded: boolean = false;

    public visualizerExpanded: boolean = false;
    public descriptionTypes: string[] = ['PhysicalSystem', 'PhysicalComponent', 'DiscoveryProfile'];

    private descriptionType: DescriptionType;
    private descriptionLoadingError: string;
    private descriptionIsLoading: boolean = true;

    constructor(
        private descriptionConfigService: DescriptionConfigService,
        private editorService: EditorService,
        private route: ActivatedRoute,
        private dynamicGUIService: DynamicGUIService) {
    }

    ngOnInit(): void {
        let snapshot = this.route.snapshot;
        if (snapshot.params['id']) {
            this.editorService.getDescriptionForId(snapshot.params['id']).subscribe(desc => {
                if (desc != null) {
                    this.updateEditor();
                }
            }, error => {
                this.descriptionLoadingError = error;
            }, () => {
                this.descriptionIsLoading = false;
            });
        } else {
            this.descriptionIsLoading = false;
            this.updateEditor();
        }
    }

    public provideDownload() {
        this.editorService.provideDownload(this.description);
    }

    public onSelectDescriptionType(type: string) {
        if (type === 'PhysicalSystem') {
            this.editorService.setDescription(new PhysicalSystem());
            this.updateEditor();
        } else if (type === 'PhysicalComponent') {
            this.editorService.setDescription(new PhysicalComponent());
            this.updateEditor();
        } else if (type === 'SimpleProcess') {
            this.editorService.setDescription(new SimpleProcess());
            this.updateEditor();
        } else if (type === 'DiscoveryProfile') {
            this.editorService.useDiscoveryProfiles().subscribe(res => {
                this.description = res.model;
                this.config = res.configuration;
                this.descriptionType = this.editorService.getDescriptionType();
                this.editorMode = this.editorService.getEditorMode();
            });
        };
    }

    private updateEditor() {
        this.description = this.editorService.getDescription();
        this.descriptionType = this.editorService.getDescriptionType();
        this.editorMode = this.editorService.getEditorMode();
        this.editorService.getConfiguration().subscribe(config => this.config = config);
    }
}
