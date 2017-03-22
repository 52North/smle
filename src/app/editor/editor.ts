import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractProcess } from '../model/sml';
import { DescriptionConfigService } from '../services/DescriptionConfigService';
import { DescriptionConfig } from '../services/config/DescriptionConfig';
import { EditorService, DescriptionType } from '../services/EditorService';
import { EditorMode } from '../services/EditorMode';
import { DynamicGUIService } from '../services/dynamicGUI/DynamicGUIService';

@Component({
    selector: 'editor',
    template: require('./editor.html'),
    styles: [require('./editor.scss')]
})
export class EditorComponent implements OnInit {
    public description: AbstractProcess;
    public config: DescriptionConfig;
    public editorMode: EditorMode;
    public actionBarNeeded: boolean = false;

    public visualizerExpanded: boolean = false;

    public descriptionType: DescriptionType;
    public descriptionLoadingError: string;
    public descriptionIsLoading: boolean = true;

    constructor(
        private descriptionConfigService: DescriptionConfigService,
        private editorService: EditorService,
        private router: Router,
        private route: ActivatedRoute,
        private dynamicGUIService: DynamicGUIService) {
    }

    ngOnInit(): void {
        let snapshot = this.route.snapshot;
        if (snapshot.params['id']) {
            this.editorService.getDescriptionForId(snapshot.params['id']).subscribe((desc) => {
                if (desc != null) {
                    this.updateEditor();
                }
            }, (error) => {
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

    private updateEditor() {
        if (this.editorService.getDescription() == null) {
            this.router.navigate(['/create']);
        }
        this.description = this.editorService.getDescription();
        this.descriptionType = this.editorService.getDescriptionType();
        this.editorMode = this.editorService.getEditorMode();
        this.editorService.getConfiguration().subscribe((config) => this.config = config);
    }
}
