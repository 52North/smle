import { Component } from '@angular/core';
import { EditorService } from '../../services/EditorService';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { AbstractProcess } from '../../model/sml';

@Component({
  selector: 'import-description',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {

  public description: AbstractProcess;

  public error: string;

  constructor(
    private editorService: EditorService) {
  }

  public changeListener($event): void {
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();

    this.error = null;
    this.description = null;

    myReader.onloadend = (e) => {
      try {
        const readerResult = myReader.result as string;
        this.description = new SensorMLXmlService().deserialize(readerResult); // myReader.result);
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
