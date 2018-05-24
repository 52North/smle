import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CncService, Stream } from '../services/cnc.service';
import { IngestionHandlerService } from '../services/handler.service';

@Component({
  selector: 'streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  public streams: Stream[];

  constructor(
    private cncService: CncService,
    private ingestionHandler: IngestionHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cncService.getStreams().subscribe((res) => this.streams = res);
  }

  public editStream(stream: Stream) {
    this.cncService.getStreamDescription(stream.name)
      .subscribe(res => this.ingestionHandler.openEditorWithStreamId(stream.name));
  }

  public showStatistics(stream: Stream) {
    this.router.navigate(['/statistics', stream.name]);
  }

  public deleteStream(stream: Stream) {
    this.cncService.deleteDescription(stream.name)
      .subscribe(response => this.cncService.getStreams().subscribe(streams => this.streams = streams));
  }

}
