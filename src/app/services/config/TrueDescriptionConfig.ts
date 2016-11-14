import { DescriptionConfig } from './DescriptionConfig';

export class TrueDescriptionConfig implements DescriptionConfig {
  isFieldVisible(name: string): boolean {
    return true;
  }

  getConfigFor(name: string): DescriptionConfig {
    return new TrueDescriptionConfig();
  }
}