import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpCache } from './caching-interceptor';

@Injectable()
export class LocalHttpCache extends HttpCache {

    private cache: any = {};

    public get(req: HttpRequest<any>): HttpResponse<any> {
        if (this.cache[req.urlWithParams]) {
            return this.cache[req.urlWithParams];
        }
        return null;
    }

    public put(req: HttpRequest<any>, resp: HttpResponse<any>) {
        this.cache[req.urlWithParams] = resp;
    }
}
