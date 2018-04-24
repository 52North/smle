import { Component, OnInit } from '@angular/core';

import { EditorService } from '../../services/EditorService';
import { Stream, StreamService } from './streams.service';

@Component({
  selector: 'streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  public streams: Stream[];

  constructor(
    private streamsService: StreamService,
    private editorService: EditorService
  ) { }

  ngOnInit() {
    this.streamsService.getStreams().subscribe((res) => this.streams = res);
  }

  public selectStream(stream: Stream) {
    this.streamsService.getStreamDescription(stream)
      .subscribe(res => this.editorService.openEditorWithDescription(res));
  }

}
