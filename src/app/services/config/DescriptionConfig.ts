export interface DescriptionConfig {
    getConfigFor(name: string): DescriptionConfig;
    isFieldVisible(name: string, formFieldType?: string): boolean;
    isFieldFixed(name: string): boolean;
    isFieldMandatory(name: string): boolean;
    existInForm(name: string): boolean;
    isExpanded(): boolean;
    showFlatten(name: string): boolean;
    elementFixQuantity(name: string): boolean;
    getLabel(name: string): string;
}
