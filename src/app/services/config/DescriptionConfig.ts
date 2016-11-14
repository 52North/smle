export interface DescriptionConfig {
  isFieldVisible(name: string, formFieldType?: string): boolean;
  getConfigFor(name: string): DescriptionConfig;
}
