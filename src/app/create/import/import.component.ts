import { Component } from '@angular/core';
import { EditorService } from '../../services/EditorService';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { AbstractProcess } from '../../model/sml';

@Component({
  selector: 'import-description',
  template: require('./import.component.html'),
  styles: [require('./import.component.scss')]
})
export class ImportComponent {

  public description: AbstractProcess;

  public error: string;

  constructor(
    private editorService: EditorService) {
  }

  public changeListener($event): void {
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();

    this.error = null;
    this.description = null;

    myReader.onloadend = (e) => {
      try {
        this.description = new SensorMLXmlService().deserialize(myReader.result);
      } catch (error) {
        this.error = error.message;
      }
    };

    myReader.readAsText(file);
  }

  public openInEditor(): void {
    this.editorService.openEditorWithDescription(this.description);
  }
}
