import { AbstractSWEIdentifiable } from './AbstractSWEIdentifiable';

/**
 * Abstract base class for all data components
 */
export abstract class AbstractDataComponent extends AbstractSWEIdentifiable {
  /**
   * Reference to semantic information defining the precise nature of the
   * component
   */
  definition: string;
  /**
   * Specifies that data for this component can be omitted in the datastream
   */
  optional: boolean = false;
  /**
   * Specifies if the value of a data component can be updated externally
   * (i.e. is variable)
   */
  updatable: boolean;

  toString(fallbackLabel = 'Abstract data component') {
    return super.toString(fallbackLabel);
  }
}
