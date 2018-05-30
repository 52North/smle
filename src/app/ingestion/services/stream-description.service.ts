import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AbstractProcess } from '../../model/sml';
import { DescriptionRepository } from '../../services/DescriptionRepository';
import { SampleDataLoader } from '../../services/SampleDataLoader';
import { CncService } from './cnc.service';
import { IngestionHandlerService } from './handler.service';

@Injectable({
  providedIn: 'root'
})
export class StreamDescriptionService extends DescriptionRepository {

  private _samples: string[] = [
    'mqtt-sample',
    'mqtt-template',
    'csv-sample',
    'csv-template'
  ];

  constructor(
    private dataloader: SampleDataLoader,
    private cncService: CncService,
    private ingestionHandler: IngestionHandlerService
  ) {
    super();
  }

  getDescription(id: string): Observable<AbstractProcess> {
    this.ingestionHandler.streamId = null;
    if (this._samples.indexOf(id) > -1) {
      return this.dataloader.loadSample('./examples/' + id + '.xml');
    }
    return this.cncService.getStreamDescription(id).pipe(tap(res => this.ingestionHandler.streamId = id));
  }

  getDescriptions(): Observable<string[]> {
    throw new Error('Method not implemented.');
  }

  saveDescription(description: AbstractProcess): Observable<void> {
    throw new Error('Method not implemented.');
  }

  updateDescription(description: AbstractProcess): Observable<void> {
    throw new Error('Method not implemented.');
  }

}
