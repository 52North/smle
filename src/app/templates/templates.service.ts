import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AbstractProcess} from '../model/sml/AbstractProcess';
import {SensorMLXmlService} from '../services/SensorMLXmlService';

@Injectable()
export class TemplatesService {

  private templatesPath = './templates/';

  private templates: Template[];

  constructor(
    private http: Http
  ) { }

  getTemplates(): Observable<Array<Template>> {
    return this.http.get(this.templatesPath + 'data.json').map(this.extractTemplates);
  }

  private extractTemplates(res: Response): Array<Template> {
    let json = res.json();
    return json;
  }

  getTemplateDescription(template: Template): Observable<AbstractProcess> {
    let url = this.templatesPath + template.file;
    return this.http.get(url).map(this.extractDescription);
  }

  private extractDescription(res: Response): AbstractProcess {
    let body = res.text();
    return new SensorMLXmlService().deserialize(body);
  }
}

export class Template {
  public name: string;
  public file: string;
}
