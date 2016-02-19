import { CodeType } from './CodeType';

/**
 * gml:CodeWithAuthorityType requires that the codeSpace attribute is provided
 * in an instance.
 */
export class CodeWithAuthority extends CodeType {
  constructor(value: string, codeSpace: string) {
    super(value, codeSpace);
  }
}
