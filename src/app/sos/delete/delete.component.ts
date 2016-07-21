import { Component, OnInit, Input } from '@angular/core';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { SosService } from '../sos.service';

@Component({
  selector: 'delete-description',
  template: require('./delete.template.html'),
  styles: [require('./delete.style.scss')],
})
export class DeleteDescription implements OnInit {

  private descriptionIds: Array<string>;
  private description: string;
  private selectDescriptionID: string;
  private successfullDeleted: boolean;

  constructor(
    private sosService: SosService
  ) { }

  public ngOnInit() {
    this.loadDescriptions();
  }

  public onSelectDescriptionID(descId: string) {
    this.selectDescriptionID = descId;
    this.sosService.fetchDescription(descId).subscribe(res => this.description = res);
  }

  public onDeleteDescription() {
    this.sosService.deleteDescription(this.selectDescriptionID).subscribe(res => {
      this.successfullDeleted = res;
      if (res) {
        this.loadDescriptions();
        this.description = null;
      }
    }, error => {
      this.successfullDeleted = false;
    })
  }

  private loadDescriptions() {
    this.sosService.fetchDescriptionIDs().subscribe(res => this.descriptionIds = res);
  }
}
