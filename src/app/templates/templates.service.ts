import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AbstractProcess} from '../model/sml/AbstractProcess';
import {SensorMLXmlService} from '../services/SensorMLXmlService';

@Injectable()
export class TemplatesService {

  private templates: string[] = [
    'physicalComponentInstance',
    'physicalComponentType',
    'physicalSystemInstance',
    'physicalSystemType',
    'lisaInstance',
    'lisaInstance_standardConform',
    'physicalSystemInstance_standardConform'
  ];

  constructor(
    private http: Http
  ) { }

  getTemplates(): Array<string> {
    return this.templates;
  }

  getTemplateDescription(id: string): Observable<AbstractProcess> {
    let url = './examples/' + id + '.xml';
    return this.http.get(url).map(this.extractDescription);
  }

  private extractDescription(res: Response): AbstractProcess {
    let body = res.text();
    return new SensorMLXmlService().deserialize(body);
  }
}
