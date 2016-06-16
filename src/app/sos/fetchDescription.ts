import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { FetchDescriptionService } from './fetchDescriptionService';
import { DescriptionRepository } from '../services/DescriptionRepository';
import { SensorMLXmlService } from '../services/SensorMLXmlService';

@Component({
  selector: 'sos',
  template: require('./fetchDescription.html'),
  styles: [require('./fetchDescription.scss')],
})
export class FetchDescription implements OnInit {

  @Input()
  private sosUrl: string = "http://hspeed.trios.de:8888/52n-sos-webapp/service";

  private descriptionIds: Array<string>;

  private description: string;

  constructor(
    private descRepo: DescriptionRepository,
    private sosService: FetchDescriptionService,
    private router: Router) {
  }

  setUrl() {
    this.sosService.fetchDescriptionIDs(this.sosUrl).subscribe(res => this.descriptionIds = res);
  }

  selectDescriptionID(descId: string) {
    this.sosService.fetchDescription(this.sosUrl, descId).subscribe(res => this.description = res);
  }

  openToEdit() {
    let desc = new SensorMLXmlService().deserialize(this.description);
    this.descRepo.saveDescription(desc).then((descID => {
      this.router.navigate(['Editor', { id: descID }]);
    }));
  }

  ngOnInit() {
//    this.selectDescriptionID("http://www.52north.org/test/procedure/1");
  }

}
