import { Component, Input } from '@angular/core';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { SosService } from '../sos.service';
import { DescriptionSelection, SelectedDescription } from '../components/selectDescription.component';

@Component({
  selector: 'fetch-description',
  directives: [DescriptionSelection],
  template: require('./fetch.template.html'),
  styles: [require('./fetch.style.scss')],
})
export class FetchDescription {

  private selectedDesc: SelectedDescription;

  constructor(
    private editorService: EditorService,
    private sosService: SosService
  ) { }

  onSelectedDescription(description: SelectedDescription) {
    this.selectedDesc = description;
  }

  openToEdit() {
    let desc = new SensorMLXmlService().deserialize(this.selectedDesc.description);
    this.editorService.openEditorWithDescription(desc);
  }
}
