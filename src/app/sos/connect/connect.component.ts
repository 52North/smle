import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { ConnectDescriptionService } from './connect.service';
import { DescriptionSelection, SelectedDescription } from '../components/selectDescription.component';
import { AbstractPhysicalProcess, AggregatingProcess } from '../../model/sml';
import { SosService } from '../sos.service';

@Component({
  selector: 'connect-description',
  directives: [DescriptionSelection],
  template: require('./connect.template.html')
})
export class ConnectDescription implements OnInit {

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

    /*
    this.attachedTo = true;
    this.sosService.fetchDescription('80792264-e6d8-0fb5-66c7-0289fc691f7f').subscribe(res => {
      this.childDescriptions.push(new SensorMLXmlService().deserialize(res) as any as AbstractPhysicalProcess);
    });
    this.sosService.fetchDescription('a102221d-9bcb-0d3b-870c-6f1a4e5e7dc8').subscribe(res => {
      this.parentDescription = new SensorMLXmlService().deserialize(res) as any as AggregatingProcess;
    });
    */
  }

  public onSelectedDescription(selectedDesc: SelectedDescription) {
    let desc = new SensorMLXmlService().deserialize(selectedDesc.description);
    if (this.isAggregatingProcess(desc)) {
      this.parentDescription = (desc as any as AggregatingProcess);
    } else {
      debugger;
      // TODO hint that the selected description is no AggregatingProcess
    }
  }

  private isAggregatingProcess(object: any): object is AggregatingProcess {
    return 'components' in object;
  }

  public publishAttachedTo() {
    this.connectDescService.connectDescriptions(this.childDescriptions, this.parentDescription);
  }
}
