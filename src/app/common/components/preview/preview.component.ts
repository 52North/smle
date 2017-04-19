import { Component, Input, OnInit } from '@angular/core';
import { AbstractProcess } from '../../../model/sml';
import { EditorService } from '../../../services/EditorService';
import { SensorMLXmlService } from '../../../services/SensorMLXmlService';

@Component({
  selector: 'preview-description',
  template: require('./preview.component.html')
  // styles: [require('./preview.component.scss')]
})
export class PreviewComponent implements OnInit {

  @Input()
  public description: string;

  public process: AbstractProcess;

  constructor(
    private editorService: EditorService
  ) {}

  public ngOnInit() {
    this.process = new SensorMLXmlService().deserialize(this.description);
  }
}
