import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TemplatesService, Template } from './templates.service';
import { EditorService } from '../services/EditorService';
import { AbstractProcess } from '../model/sml/AbstractProcess';
import { CodeType } from '../model/gml/CodeType';
import { UUID } from 'angular2-uuid';
import { SensorMLXmlService } from '../services/SensorMLXmlService';

@Component({
    selector: 'templates',
    styles: [require('./templates.scss')],
    providers: [TemplatesService],
    template: require('./templates.html')
})
export class Templates {

    searchTerm: string;
    resultCount: number;
    templates: Array<Template>;
    description: AbstractProcess;
    selection: Template;
    choosenTemplate: Template;

    constructor(
        private _router: Router,
        private templatesServ: TemplatesService,
        private editorServ: EditorService
    ) {
    }

    onStartSearch(): void {
        this.templates = undefined;
        this.resultCount = 0;
        this.choosenTemplate = undefined;
        this.description = undefined;
        this.selection = undefined;
        this.templatesServ.search(this.searchTerm).subscribe(
            res => {
                this.resultCount = res.count;
                this.templates = res.templates;
            }
        );
    }

    onSelect(id: string): void {
        this._router.navigate(['/editor', id]);
    }

    onSelectTemplate(): void {
        if (this.selection !== undefined)
            this.templatesServ.getTemplate(this.selection).subscribe(
                res => {
                    this.choosenTemplate = res;
                    this.description = new SensorMLXmlService().deserialize(res.plainText);
                    if (!this.description.identifier) {
                        this.description.identifier = new CodeType('', 'uniqueID');
                    }
                }
            );
    }

    createUUID() {
        this.description.identifier.value = UUID.UUID();
    }

    openToEdit() {
        this.editorServ.openEditorWithDescription(this.description);
    }

}
