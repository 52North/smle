/**
 * Base substitution groups for all SWE Common objects other than value objects
 */
export abstract class AbstractSWE {
  id: string;
  /**
   * Extension slot for future extensions to this standard.
   */
  extension: any[];
}
