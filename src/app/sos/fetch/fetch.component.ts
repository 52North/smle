import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { SensorMLPipe } from '../../editor/pipes/SensorMLPipe';
import { SosService } from '../sos.service';
import { ObjectTreeComponent } from '../../editor/components/basic/object-tree/ObjectTreeComponent';
import { DescriptionSelection, SelectedDescription } from '../components/selectDescription.component';

@Component({
  selector: 'fetch-description',
  directives: [DescriptionSelection, ObjectTreeComponent],
  pipes: [SensorMLPipe],
  template: require('./fetch.template.html'),
  styles: [require('./fetch.style.scss')],
})
export class FetchDescription implements OnInit {

  private selectedDesc: AbstractProcess;

  constructor(
    private editorService: EditorService,
    private sosService: SosService,
    private route: ActivatedRoute,
    private router: Router
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
    this.router.navigate(['/fetch', description.id]);
  }

  private openToEdit() {
    this.editorService.openEditorWithDescription(this.selectedDesc);
  }

  private openToCopy() {
    if (this.selectedDesc.identifier && this.selectedDesc.identifier.value) {
      this.selectedDesc.identifier = null;
    }
    this.editorService.openEditorWithDescription(this.selectedDesc);
  }

}
