/**
 * The explicit definition of data links between outputs, inputs, and parameters
 * of the components within an aggregate process.
 */
export class Connection {
  /**
   * The output from which the link originates.
   */
  source: string;
  /**
   * The input or parameter into which the data flows.
   */
  destination: string;

  toString() {
    return 'Connection';
  }
}
