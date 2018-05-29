import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EditorService } from '../../services/EditorService';

@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrls: ['./create-view.component.scss']
})
export class CreateViewComponent {

  constructor(
    private editorService: EditorService,
    private router: Router
  ) { }

  public openTemplateWorkflow(template: string) {
    this.editorService.getDescriptionForId(template).subscribe((desc) => {
      if (desc != null) { this.editorService.setDescription(desc); this.router.navigate(['/workflow']); }
    });
  }

}
