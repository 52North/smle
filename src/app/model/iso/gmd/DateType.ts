/**
 * identification of when a given event occurred
 */
export type DateType =
  /**
   * date identifies when the resource was brought into existence
   */
  'creation' |
  /**
   * date identifies when the resource was issued
   */
  'publication' |
  /**
   * date identifies when the resource was examined or re-examined and imporved or amended
   */
  'revision';
