import { Component, Input } from '@angular/core';
import { AbstractProcess } from '@helgoland/sensorml';

@Component({
  selector: 'preview-description',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

  @Input()
  public description: AbstractProcess;

}
