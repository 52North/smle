import { DescriptionConfig } from './DescriptionConfig';

export class DefaultDescriptionConfig implements DescriptionConfig {
  isFieldMandatory(name: string): boolean {
    return false;
  }
  isFieldFixed(name: string): boolean{
      return true;
  }
  isFieldHidden(name:string):boolean{
      return true;
  }
  

  getConfigFor(name: string): DescriptionConfig {
    return new DefaultDescriptionConfig();
  }
}
