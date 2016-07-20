import { Injectable } from '@angular/core';
import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SosService } from '../sos.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PublishDescriptionService {

  private description: AbstractProcess;

  constructor(
    private sosService: SosService
  ) { }

  setDescription(desc: AbstractProcess): void {
    if (!desc.gmlId) {
      desc.gmlId = 'temp_123';
    }
    if (desc.identifier && !desc.identifier.codeSpace) {
      desc.identifier.codeSpace = 'uniqueID';
    }
    this.description = desc;
  }

  getDescription(): AbstractProcess {
    return this.description;
  }
}
