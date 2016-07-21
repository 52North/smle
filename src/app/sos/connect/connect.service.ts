import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AbstractProcess, AbstractPhysicalProcess, AggregatingProcess } from '../../model/sml';
import { Component } from '../../model/sml/Component';
import { SosService } from '../sos.service';

@Injectable()
export class ConnectDescriptionService {

  description: AbstractProcess;
  childDescriptions: Array<AbstractPhysicalProcess>;
  attachedTo: boolean;

  constructor(
    private http: Http,
    private router: Router,
    private sosService: SosService
  ) { }

  public openAttachedToDescription(desc: AbstractPhysicalProcess) {
    this.attachedTo = true;
    this.childDescriptions = [];
    this.childDescriptions.push(desc);
    this.openView(desc);
  }

  public openConnectDescriptions(desc: AbstractProcess) {
    this.attachedTo = false;
    this.openView(desc);
  }

  private openView(desc: AbstractProcess) {
    this.router.navigate(['/connect']);
  }

  public connectDescriptions(childDesc: Array<AbstractPhysicalProcess>, parentDesc: AggregatingProcess) {
    let parentDescAbsPro = parentDesc as any as AbstractProcess;

    childDesc.forEach(entry => {
      entry.attachedTo = this.sosService.createDescribeSensorUrl(parentDescAbsPro.identifier.value);
      // TODO remove old components which are obsolet
      let component = new Component(parentDescAbsPro.gmlId, this.sosService.createDescribeSensorUrl(entry.identifier.value));
      parentDesc.components.components.push(component);
    });

    childDesc.forEach(entry => {
      this.sosService.updateDescription(entry.identifier.value, entry).subscribe(res => {
        debugger;
      })
    })

    this.sosService.updateDescription(parentDescAbsPro.identifier.value, parentDescAbsPro).subscribe(res => {
      debugger;
    })
  }
}
