import { Component, OnInit, Input } from '@angular/core';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { SosService } from '../sos.service';

@Component({
  selector: 'fetch-description',
  template: require('./fetch.template.html'),
  styles: [require('./fetch.style.scss')],
})
export class FetchDescription implements OnInit {

  private descriptionIds: Array<string>;
  private description: string;

  constructor(
    private editorService: EditorService,
    private sosService: SosService
  ) { }

  selectDescriptionID(descId: string) {
    this.sosService.fetchDescription(descId).subscribe(res => this.description = res);
  }

  openToEdit() {
    let desc = new SensorMLXmlService().deserialize(this.description);
    this.editorService.openEditorWithDescription(desc);
  }

  ngOnInit() {
    this.sosService.fetchDescriptionIDs().subscribe(res => this.descriptionIds = res);
  }

}
