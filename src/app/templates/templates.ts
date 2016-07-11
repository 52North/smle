import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TemplatesService, Template} from './templates.service';
import {EditorService} from '../services/EditorService';
import {AbstractProcess} from '../model/sml/AbstractProcess';
import {SensorMLPipe} from '../editor/pipes/SensorMLPipe';
import {CodeType} from '../model/gml/CodeType';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'templates',
  styles: [require('./templates.scss')],
  providers: [TemplatesService],
  pipes: [SensorMLPipe],
  template: require('./templates.html')
})
export class Templates implements OnInit {

  templates: Array<Template>;
  description: AbstractProcess;
  selectedTemplate: Template;

  constructor(
    private _router: Router,
    private templatesServ: TemplatesService,
    private editorServ: EditorService
  ) {
  }

  onSelect(id: string): void {
    this._router.navigate(['/editor', id]);
  }

  onSelectTemplate(template: Template): void {
    this.templatesServ.getTemplateDescription(this.selectedTemplate).subscribe(
      res => {
        if (!res.identifier) {
          res.identifier = new CodeType("", "uniqueID");
        }
        this.description = res;
      }
    );
  }

  createUUID() {
    this.description.identifier.value = UUID.UUID();
  }

  ngOnInit() {
    this.templatesServ.getTemplates().subscribe(res => this.templates = res);
  }

  openToEdit() {
    this.editorServ.openEditorWithDescription(this.description);
  }

}
