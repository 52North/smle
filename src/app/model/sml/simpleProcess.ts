import { AbstractProcess } from './core';
import { AbstractSWEIdentifiable } from '../swe';

export class SimpleProcess extends AbstractProcess {
  method: ProcessMethod;
}

export class ProcessMethod extends AbstractSWEIdentifiable {
  algorithm: AbstractAlgorithm[];
}

export interface AbstractAlgorithm {
  id: string;
}
