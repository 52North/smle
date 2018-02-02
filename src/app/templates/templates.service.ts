import { Injectable } from '@angular/core';
import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigurationService } from '../services/ConfigurationService';

@Injectable()
export class TemplatesService {

    private templatesUrl = 'http://localhost:8983/solr/horst';

    constructor(
        private jsonp: Jsonp,
        private configurationSrvc: ConfigurationService
    ) {
        this.configurationSrvc.getConfig().subscribe(config => {
            this.templatesUrl = config.templatesUrl;
        });
    }

    search(searchTerm: string): Observable<Result> {
        searchTerm = searchTerm ? searchTerm : '*';
        const params: URLSearchParams = new URLSearchParams();
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
        const params: URLSearchParams = new URLSearchParams();
        params.set('wt', 'json');
        params.set('id', template.id);
        params.set('json.wrf', 'JSONP_CALLBACK');
        return this.jsonp.request(this.templatesUrl + '/get', {
            search: params
        }).map(this.extractDescription);
    }

    private extractTemplates(res: Response): Result {
        // TODO resultscount mit ausgeben
        const json = res.json();
        const result = new Result();
        result.count = json.response.numFound;
        result.templates = new Array<Template>();
        json.response.docs.forEach((entry) => {
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
