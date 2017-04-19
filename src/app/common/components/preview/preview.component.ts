import { Component, Input } from '@angular/core';
import { AbstractProcess } from '../../../model/sml';

@Component({
  selector: 'preview-description',
  template: require('./preview.component.html')
  // styles: [require('./preview.component.scss')]
})
export class PreviewComponent {

  @Input()
  public description: AbstractProcess;

}
