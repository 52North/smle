import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TemplatesService} from './templates.service';
import {EditorService} from '../services/EditorService';
import {AbstractProcess} from '../model/sml/AbstractProcess';
import {SensorMLPipe} from '../editor/pipes/SensorMLPipe';
import {CodeType} from '../model/gml/CodeType';

@Component({
  selector: 'templates',
  styles: [require('./templates.scss')],
  providers: [TemplatesService],
  pipes: [SensorMLPipe],
  template: require('./templates.html')
})
export class Templates implements OnInit {

  templates: string[];
  description: AbstractProcess;

  constructor(
    private _router: Router,
    private templatesServ: TemplatesService,
    private editorServ: EditorService
  ) {
  }

  onSelect(id: string): void {
    this._router.navigate(['/editor', id]);
  }

  selectTemplate(id: string): void {
    this.templatesServ.getTemplateDescription(id).subscribe(
      res => {
        if (!res.identifier) {
          res.identifier = new CodeType("", "uniqueID");
        }
        this.description = res;
      }
    );
  }

  ngOnInit() {
    this.templates = this.templatesServ.getTemplates();
    //this.templatesServ.getTemplates().then(res => this.templates = res);
  }

  openToEdit() {
    this.editorServ.openEditorWithDescription(this.description);
  }

}
