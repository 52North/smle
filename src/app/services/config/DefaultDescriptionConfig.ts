import { DescriptionConfig } from './DescriptionConfig';
import { DescriptionConfigDynamicGUI } from './DescriptionConfigDynamicGUI';

export class DefaultDescriptionConfig implements DescriptionConfigDynamicGUI {
  isFieldMandatory(name: string): boolean {
    return false;
  }
  isFieldFixed(name: string): boolean{
      return true;
  }
  isFieldVisible(name:string):boolean{
      return true;
  }
  hasLabel(name:string):string{
      return null;
  }

  getConfigFor(name: string): DescriptionConfig {
    return new DefaultDescriptionConfig();
  }
}
