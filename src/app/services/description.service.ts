import { AbstractProcess } from '../model/sensorML';

export abstract class DescriptionService {
  abstract getDescriptions(): Promise<string[]>;
  abstract getDescription(id: string): Promise<AbstractProcess>;
  abstract saveDescription(description: AbstractProcess): Promise<void>;
  abstract updateDescription(description: AbstractProcess): Promise<void>;
}
