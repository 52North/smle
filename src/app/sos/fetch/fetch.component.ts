import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { SosService } from '../sos.service';
import { SelectedDescription } from '../components/selectDescription.component';

@Component({
    selector: 'fetch-description',
    template: require('./fetch.template.html'),
    styles: [require('./fetch.style.scss')],
})
export class FetchDescriptionComponent implements OnInit {

    private selectedDesc: AbstractProcess;

    private isEditable = false;

    constructor(
        private editorService: EditorService,
        private sosService: SosService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
                this.sosService.fetchDescription(id).subscribe((res) => {
                    this.selectedDesc = new SensorMLXmlService().deserialize(res);
                });
                this.sosService.hasSosDescription(id, true).subscribe(
                    (res) => { this.isEditable = res; }
                );
            }
        });
    }

    protected onSelectedDescription(description: SelectedDescription) {
        this.router.navigate(['/fetch', description.id]);
    }

    protected openToEdit() {
        this.editorService.openEditorWithDescription(this.selectedDesc);
    }

    protected openToCopy() {
        if (this.selectedDesc.identifier && this.selectedDesc.identifier.value) {
            this.selectedDesc.identifier = null;
        }
        this.editorService.openEditorWithDescription(this.selectedDesc);
    }

}
