import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { SosService } from '../sos.service';
import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { ObjectTreeComponent } from '../../editor/components/basic/ObjectTreeComponent';
import { DescriptionSelection, SelectedDescription } from '../components/selectDescription.component';

@Component({
  selector: 'view-description',
  directives: [DescriptionSelection, ObjectTreeComponent],
  template: require('./view.template.html'),
  styles: [require('./view.style.scss')],
})
export class ViewDescription implements OnInit {

  private selectedDesc: AbstractProcess;

  constructor(
    private editorService: EditorService,
    private route: ActivatedRoute,
    private router: Router,
    private sosService: SosService
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.sosService.fetchDescription(id).subscribe(res => {
          this.selectedDesc = new SensorMLXmlService().deserialize(res);
        });
      }
    });
  }

  private onSelectedDescription(description: SelectedDescription) {
    this.router.navigate(['/view', description.id]);
  }

  private openToEdit() {
    this.editorService.openEditorWithDescription(this.selectedDesc);
  }
}
