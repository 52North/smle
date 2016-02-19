import { AbstractAllowedValues } from './AbstractAllowedValues';

/**
 * Defines permitted values for the component, as an enumerated list of tokens
 * or a regular expression pattern
 */
export class AllowedTokens extends AbstractAllowedValues {
  values: string[] = [];
  pattern: string;
}
