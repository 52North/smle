import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AbstractProcess } from '../model/sml';
import { FetchDescriptionService } from './fetchDescriptionService'
import 'rxjs/add/operator/map';

@Injectable()
export class PublishDescriptionService {
  
  private description: AbstractProcess;

  constructor(
    private http: Http,
    private fetch: FetchDescriptionService
  ) { }

  setDescription(desc: AbstractProcess): void {
    this.description = desc;
  }
  
  getDescription(): AbstractProcess {
    return this.description;
  }
  
//  hasSosDescription(sosUrl: string, descID: string): Observable<boolean> {
//    
//    this.fetch.fetchDescriptionIDs(sosUrl).subscribe((res) => {
//      debugger;
//      res.forEach((entry) => {
//        debugger;
//        if (entry === descID) {
//          return true;
//        }
//      })
//      return false;
//    })
//  }
}
