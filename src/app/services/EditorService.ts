import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractProcess, SimpleProcess } from '../model/sml';
import { DescriptionRepository } from '../services/DescriptionRepository';

/**
 * This service stores and manages the SensorML description (AbstractProcess object).
 */
@Injectable()
export class EditorService {
  public description: AbstractProcess;

  constructor(
    private service: DescriptionRepository,
    private router: Router
  ) {
  }

  /**
   * This methods opens the editor form with the specific SensorML description: desc:AbstractProcess.
   */
  openEditorWithDescription(desc: AbstractProcess) {
    this.description = desc;
    this.router.navigate(['/editor']);
  }

  /**
   * This method returns a SensorML description (AbstractProcess) using the identifier value:@id. <p>
   * 
   * @id identifier value of the AbstractProcess or "new" <br>
   * @return <br>
   *         <b>null</b>  if @id="new" or description is not initialized. <br>
   *        <b> AbstractProcess </b>  if there exist an initialized AbstractProcess <br>
   *         object with description.identifier.value=@id
   */
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
