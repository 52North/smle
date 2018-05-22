import { Component, OnInit } from '@angular/core';

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
    private ingestionHandler: IngestionHandlerService
  ) { }

  ngOnInit() {
    this.cncService.getStreams().subscribe((res) => this.streams = res);
  }

  public selectStream(stream: Stream) {
    this.cncService.getStreamDescription(stream.name)
      .subscribe(res => this.ingestionHandler.openEditorWithStreamId(stream.name));
  }

}
