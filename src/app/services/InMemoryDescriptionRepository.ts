import {AbstractProcess} from '../model/sml';
import {CodeType} from '../model/gml';
import {Injectable} from '@angular/core';
import {DescriptionRepository} from './DescriptionRepository';
import {SampleDataLoader} from '../services/SampleDataLoader';

/**
 * This class implements the abstract methods to get, update and save new SensorML descriptions.<p>
 * 
 * The descriptions can be loaded from sample SensorML XML files (/examples/) or returned from <br>
 * a private AbstractProcess key-value-array. <br>
 * 
 * AbstractProcess objects can be updated and saved within the private AbstractProcess array<br>
 * of this class.
 */
@Injectable()
export class InMemoryDescriptionRepository extends DescriptionRepository {
  private _descriptions: { [key: string]: AbstractProcess } = {};

  private _samples: string[] = [
    'physicalComponentInstance',
    'physicalComponentType',
    'physicalSystemInstance',
    'physicalSystemType',
    'lisaInstance',
    'lisaInstance_standardConform',
    'physicalSystemInstance_standardConform'
  ];

  constructor(private dataloader: SampleDataLoader) {
    super();
  }
  
  /**
   * This method returns the names of available SensorML descriptions. <br>
   * The names are from the _samples:string and the _descriptions:AbstractProcess key-value-array.<p>
   * 
   * @return string[]:Promise names of SensorML descriptions
   */
  getDescriptions(): Promise<Array<string>> {
    let list = this._samples;
    list = list.concat(Object.keys(this._descriptions));
    return Promise.resolve(list);
  }

  /**
   * This method returns an AbstractProcess object (SensorML description) that owns the transmitted id. <p>
   * 
   *  @id it can be the name of a sample XML file (/example/), or the identifier value of the requested <br>
   *  AbstractProcess object <p>
   *  
   *  @return AbstractProcess:Promise SensorML description object 
   */
  getDescription(id: string): Promise<AbstractProcess> {
    if (this._samples.indexOf(id) > -1) {
      return this.dataloader.loadSample('./examples/' + id + '.xml');
    }
    if (!this._descriptions[id]) {
      return Promise.reject<AbstractProcess>(new Error('does not exist'));
    }
    return Promise.resolve(this._descriptions[id]);
  }

/**
 * The method saves a new AbstractProcess object within a private key-value-array. <p>
 * key: identifier value of the AbstractProcess <br>
 * value: AbstractProcess<p>
 * 
 * @error AbstractProcess was already saved before -&gt; if the identifier value of the <br>
 * AbstractProcess already exist as a key within the key-value-array.
 */
  saveDescription(description: AbstractProcess): Promise<void> {
    let id = this._getId(description);
    if (this._descriptions[id]) {
      return Promise.reject(new Error('already saved'));
    }
    this._descriptions[id] = description;
    return Promise.resolve();
  }
/**
 * The method updates an  existing AbstractProcess object within a private key-value-array. <p>
 * key: identifier value of the AbstractProcess <br>
 * value: AbstractProcess<p>
 * 
 * @error AbstractProcess was not saved before -&gt; if the identifier value of the <br>
 * AbstractProcess not exist as a key within the key-value-array.
 */
  updateDescription(description: AbstractProcess): Promise<void> {
    let id = this._getId(description);
    if (!this._descriptions[id]) {
      return Promise.reject(new Error('not yet saved'));
    }
    this._descriptions[id] = description;
    return Promise.resolve();
  }

  /**
   * The method returns the identifier value of the description:AbstractProcess object. <p>
   * 
   * If the description:AbstractProcess does not have an indentifier value, then this <br>
   * method creates this value by using the actual Date in milliseconds running since 
   * 1 January 1970 00:00:00 UTC <br>
   * (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
   */
  private _getId(description: AbstractProcess): string {
    if (description.identifier == null || description.identifier.value == null) {
      description.identifier = new CodeType(Date.now().toString());
    }
    return description.identifier.value;
  }
}
