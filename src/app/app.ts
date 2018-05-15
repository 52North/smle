import { Component, ViewEncapsulation } from '@angular/core';

import { EditorService } from './services/EditorService';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    protected editorService: EditorService
  ) { }

  public createNew() {
    this.editorService.getDescriptionForId('ingestion-template').subscribe((desc) => {
      if (desc != null) { this.editorService.openEditorWithDescription(desc); }
    });
  }
}
