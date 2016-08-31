import { DescriptionConfig } from './DescriptionConfig';

export class TrueDescriptionConfig implements DescriptionConfig {
  isFieldMandatory(name: string): boolean {
    return true;
  }

  getConfigFor(name: string): DescriptionConfig {
    return new TrueDescriptionConfig();
  }
}
