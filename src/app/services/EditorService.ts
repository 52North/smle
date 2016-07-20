import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractProcess, SimpleProcess } from '../model/sml';
import { DescriptionRepository } from '../services/DescriptionRepository';

@Injectable()
export class EditorService {
  public description: AbstractProcess;

  constructor(
    private service: DescriptionRepository,
    private router: Router
  ) {
  }

  openEditorWithDescription(desc: AbstractProcess) {
    this.description = desc;
    this.router.navigate(['/editor']);
  }

  getDescriptionForId(id: string): Promise<AbstractProcess> {
    if (id) {
      if (id === 'new') {
        this.description = null;
      } else {
        return this.service.getDescription(id);
      }
    }
    if (!this.description) {
      this.description = null;
    }
    return Promise.resolve(this.description);
  }
}
