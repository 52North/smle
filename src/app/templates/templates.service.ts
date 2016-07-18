import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AbstractProcess} from '../model/sml/AbstractProcess';
import {SensorMLXmlService} from '../services/SensorMLXmlService';

@Injectable()
export class TemplatesService {

  private dictionaryURL = 'http://localhost:8983/solr/yellowPages/select';
  //private templatesPath = './templates/';
  //private templates: Template[];

  constructor(
    private http: Http,
    private jsonp: Jsonp
  ) { }

  search(searchTerm: string): Observable<Result> {
    var searchTerm = searchTerm ? searchTerm : '*';
    let params: URLSearchParams = new URLSearchParams();
    params.set('fl', 'id,name');
    params.set('wt', 'json');
    params.set('rows', '500');
    params.set('q', searchTerm);
    params.set('json.wrf', 'JSONP_CALLBACK');
    return this.jsonp.request(this.dictionaryURL, {
      search: params
    }).map(this.extractTemplates);
  }

  private extractTemplates(res: Response): Result {
    // TODO resultscount mit ausgeben
    let json = res.json();
    let result = new Result();
    result.count = json.response.numFound;
    result.templates = new Array<Template>();
    json.response.docs.forEach(entry => {
      result.templates.push(entry);
    });
    return result;
  }

  /*
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
  */

}

export class Template {
  public id: string;
  public name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Result {
  public templates: Array<Template>;
  public count: number;
}
