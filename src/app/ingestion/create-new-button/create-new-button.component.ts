import { Component } from '@angular/core';

import { EditorService } from '../../services/EditorService';

@Component({
  selector: 'app-create-new-button',
  templateUrl: './create-new-button.component.html',
  styleUrls: ['./create-new-button.component.scss']
})
export class CreateNewButtonComponent {

  constructor(
    protected editorService: EditorService
  ) { }

  public createNew() {
    this.editorService.getDescriptionForId('ingestion-template').subscribe((desc) => {
      if (desc != null) { this.editorService.openEditorWithDescription(desc); }
    });
  }

}
