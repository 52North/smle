import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class IngestionHandlerService {

  public streamId: string;

  constructor(
    protected router: Router
  ) { }

  public openEditorWithStreamId(id: string) {
    this.router.navigate(['/editor', id]);
  }

}

