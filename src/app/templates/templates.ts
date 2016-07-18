import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TemplatesService, Template} from './templates.service';
import {EditorService} from '../services/EditorService';
import {AbstractProcess} from '../model/sml/AbstractProcess';
import {SensorMLPipe} from '../editor/pipes/SensorMLPipe';
import {CodeType} from '../model/gml/CodeType';
import {UUID} from 'angular2-uuid';
import {TemplateSortPipe} from './templates.pipe';
import {SensorMLXmlService} from '../services/SensorMLXmlService';

@Component({
  selector: 'templates',
  styles: [require('./templates.scss')],
  providers: [TemplatesService],
  pipes: [SensorMLPipe, TemplateSortPipe],
  template: require('./templates.html')
})
export class Templates {

  searchTerm: string = "";
  resultCount: number = 0;
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
    this.templates = null;
    this.resultCount = 0;
    this.templatesServ.search(this.searchTerm).subscribe(
      res => {
        this.resultCount = res.count;
        this.templates = res.templates;
      }
    )
  }

  onSelect(id: string): void {
    this._router.navigate(['/editor', id]);
  }

  onSelectTemplate(): void {
    this.templatesServ.getTemplate(this.selection).subscribe(
      res => {
        this.choosenTemplate = res;
        this.description = new SensorMLXmlService().deserialize(res.plainText);
        if (!this.description.identifier) {
          this.description.identifier = new CodeType("", "uniqueID");
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
