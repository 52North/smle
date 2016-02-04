

import { AbstractProcess } from '../model/sensorML';
import { Injectable } from 'angular2/core';
import { DescriptionService } from './description.service';

@Injectable()
export class InMemoryDescriptionService extends DescriptionService {
  private _descriptions: { [key: string]: AbstractProcess } = {};
  /*
  constructor(processes?: AbstractProcess[]) {
    super();
    if (processes) {
      processes.reduce((o, d) => {
        o[this._getId(d)] = d;
        return o;
      }, this._descriptions);
    }
  }
  */
  getDescriptions() {
    return Promise.resolve(Object.keys(this._descriptions));
  }

  getDescription(id) {
    return Promise.resolve(this._descriptions[id]);
  }

  saveDescription(description) {
    let id = this._getId(description);
    if (this._descriptions[id]) {
      return Promise.reject(new Error("already saved"));
    }
    this._descriptions[id] = description;
    return Promise.resolve()
  }

  updateDescription(description) {
    let id = this._getId(description);
    if (!this._descriptions[id]) {
      return Promise.reject(new Error("not yet saved"));
    }
    this._descriptions[id] = description;
    return Promise.resolve()
  }

  private _getId(description: AbstractProcess): string {
    return description.identifier[0].value;
  }
}