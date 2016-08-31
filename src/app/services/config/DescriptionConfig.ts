export interface DescriptionConfig {
  isFieldMandatory(name: string): boolean;
  getConfigFor(name: string): DescriptionConfig;
}
