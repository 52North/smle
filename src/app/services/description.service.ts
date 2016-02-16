import { AbstractProcess } from '../model/sensorML';


export abstract class DescriptionRepository {
  /**
   * Get a list of desciption identifiers.
   */
  abstract getDescriptions(): Promise<string[]>;
  /**
   * Get the description with the specified id.
   */
  abstract getDescription(id: string): Promise<AbstractProcess>;
  /**
   * Save the description, fail if it was saved before.
   */
  abstract saveDescription(description: AbstractProcess): Promise<void>;
  /**
   * Update the description, fail if it wasn't saved before.
   */
  abstract updateDescription(description: AbstractProcess): Promise<void>;
}
