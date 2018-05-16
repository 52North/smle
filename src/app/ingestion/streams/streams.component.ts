import { Component, OnInit } from '@angular/core';

import { EditorService } from '../../services/EditorService';
import { CncService, Stream } from '../services/cnc.service';

@Component({
  selector: 'streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  public streams: Stream[];

  constructor(
    private cncService: CncService,
    private editorService: EditorService
  ) { }

  ngOnInit() {
    this.cncService.getStreams().subscribe((res) => this.streams = res);
  }

  public selectStream(stream: Stream) {
    this.cncService.getStreamDescription(stream)
      .subscribe(res => this.editorService.openEditorWithDescription(res));
  }

}
