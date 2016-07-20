import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { ConnectDescriptionService } from './connect.service';
import { AbstractPhysicalProcess, AggregatingProcess } from '../../model/sml';
import { SosService } from '../sos.service';

@Component({
  selector: 'sos',
  template: require('./connect.template.html')
})
export class ConnectDescription implements OnInit {

  private descriptionIds: Array<string>;
  private childDescriptions: Array<AbstractPhysicalProcess> = new Array();
  private parentDescription: AggregatingProcess;
  private attachedTo: boolean;

  constructor(
    private router: Router,
    private connectDescService: ConnectDescriptionService,
    private editorService: EditorService,
    private sosService: SosService
  ) { }

  public ngOnInit() {
    this.attachedTo = this.connectDescService.attachedTo;
    this.childDescriptions = this.connectDescService.childDescriptions;
    this.sosService.fetchDescriptionIDs().subscribe(res => {
      this.descriptionIds = res;
    });
  }

  public onSelectDescriptionID(descId: string) {
    // TODO check if both are in sos
    this.sosService.fetchDescription(descId).subscribe(res => {
      // TODO parse to attachedToDescription
      let desc = new SensorMLXmlService().deserialize(res);
      debugger;
      if (this.isAggregatingProcess(desc)) {
        this.parentDescription = (desc as any as AggregatingProcess);
      } else {
        debugger;
        // TODO hint that the selected description is no AggregatingProcess
      }
    });
  }

  private isAggregatingProcess(object: any): object is AggregatingProcess {
    return 'components' in object;
  }

  public publishAttachedTo() {
    debugger;
    this.connectDescService.connectDescriptions(this.childDescriptions, this.parentDescription);

    // TODO update first

    // TODO update second
  }

  //openToEdit() {
  //  let desc = new SensorMLXmlService().deserialize(this.description);
  //  this.editorService.openEditorWithDescription(desc);
  //}

}
