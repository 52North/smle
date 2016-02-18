import { AbstractProcess } from './core';
import { AbstractSWEIdentifiable } from '../swe';

export class SimpleProcess extends AbstractProcess implements ProcessMethodProcess {
  method: ProcessMethod;

  public static get SCHEMA(): string { return 'http://schemas.opengis.net/sensorML/2.0/simple_process.xsd'; }

  public static get NAME(): string { return 'SimpleProcess'; }
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
