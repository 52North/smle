import { Component } from '@angular/core';

import { EditorService } from '../../services/EditorService';

@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrls: ['./create-view.component.scss']
})
export class CreateViewComponent {

  constructor(
    private editorService: EditorService
  ) { }

  public openTemplate(template: string) {
    this.editorService.getDescriptionForId(template).subscribe((desc) => {
      if (desc != null) { this.editorService.openEditorWithDescription(desc); }
    });
  }

}
