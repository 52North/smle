import { AbstractProcess } from './core';
import { AbstractSWEIdentifiable } from '../swe';

export class SimpleProcess extends AbstractProcess implements ProcessMethodProcess {
  method: ProcessMethod;
}

export class ProcessMethod extends AbstractSWEIdentifiable {
  algorithm: AbstractAlgorithm[];
}

export interface ProcessMethodProcess {
  method: ProcessMethod;
}

export interface AbstractAlgorithm {
  id: string;
}
