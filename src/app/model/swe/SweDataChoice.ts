
import { AbstractDataComponent } from './AbstractDataComponent';
import { SweCategory } from './SweCategory';
import { SweDataChoiceItem } from './SweDataChoiceItem';

/**
 * Implementation of a choice of two or more Data Components (also called
 * disjoint union)
 */
export class SweDataChoice extends AbstractDataComponent {
  /**
   * This category component marks the data stream element that will indicate
   * the actual choice made. Possible choices are listed in the Category
   * constraint section as an enumeration and should map to item names.
   */
  choiceValue: SweCategory[];

  items: SweDataChoiceItem[];
}
