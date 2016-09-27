import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../services/ConfigurationService';

@Injectable()
export class TemplatesService {

    private templatesUrl = 'http://localhost:8983/solr/horst';

    constructor(
        private http: Http,
        private jsonp: Jsonp,
        private configurationSrvc: ConfigurationService
    ) {
        this.templatesUrl = this.configurationSrvc.config.templatesUrl;
    }

    search(searchTerm: string): Observable<Result> {
        searchTerm = searchTerm ? searchTerm : '*';
        let params: URLSearchParams = new URLSearchParams();
        params.set('fl', 'id,name');
        params.set('rows', '500');
        params.set('wt', 'json');
        params.set('q', searchTerm);
        params.set('json.wrf', 'JSONP_CALLBACK');
        return this.jsonp.request(this.templatesUrl + '/select', {
            search: params
        }).map(this.extractTemplates);
    }

    public getTemplate(template: Template): Observable<Template> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('wt', 'json');
        params.set('id', template.id);
        params.set('json.wrf', 'JSONP_CALLBACK');
        return this.jsonp.request(this.templatesUrl + '/get', {
            search: params
        }).map(this.extractDescription);
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

    private extractDescription(res: Response): Template {
        return res.json().doc;
    }
}

export class Template {
    public id: string;
    public name: string;
    public keywords: Array<string>;
    public description: string;
    public plainText: string;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class Result {
    public templates: Array<Template>;
    public count: number;
}
