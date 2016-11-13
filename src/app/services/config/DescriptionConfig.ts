export interface DescriptionConfig {
  isFieldHidden(name: string, formFieldType?: string): boolean;
  getConfigFor(name: string): DescriptionConfig;
}
