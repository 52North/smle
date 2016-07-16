
import { AbstractSWEIdentifiable } from '../swe/AbstractSWEIdentifiable';
import { AbstractAlgorithm } from './AbstractAlgorithm';

export class ProcessMethod extends AbstractSWEIdentifiable {
  algorithm: AbstractAlgorithm[] = [];

  toString() {
    return super.toString('Process method');
  }
}
