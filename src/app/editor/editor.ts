import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractProcess } from '../model/sml';
import { DescriptionConfig } from '../services/config/DescriptionConfig';
import { EditorService, DescriptionType } from '../services/EditorService';
import { EditorMode } from '../services/EditorMode';

@Component({
    selector: 'editor',
    templateUrl: './editor.html',
    styleUrls: ['./editor.scss']
})
export class EditorComponent implements OnInit {
    public description: AbstractProcess;
    public config: DescriptionConfig;
    public editorMode: EditorMode;
    public actionBarNeeded = false;

    public visualizerExpanded = false;

    public descriptionType: DescriptionType;
    public descriptionLoadingError: string;
    public descriptionIsLoading = true;

    constructor(
        private editorService: EditorService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const snapshot = this.route.snapshot;
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
            this.router.navigate(['/']);
        }
        this.description = this.editorService.getDescription();
        this.descriptionType = this.editorService.getDescriptionType();
        this.editorMode = this.editorService.getEditorMode();
        this.editorService.getConfiguration().subscribe((config) => this.config = config);
    }
}
