export interface DescriptionConfig {
    getConfigFor(name: string): DescriptionConfig;
    isFieldVisible(name: string, formFieldType?: string, model?: any, fieldName?: string): boolean;
    isFieldFixed(name: string, model?: any, fieldName?: string): boolean;
    isFieldMandatory(name: string, model?: any, fieldName?: string): boolean;
    existInForm(name: string, model?: any, fieldName?: string): boolean;
    isExpanded(): boolean;
    showFlatten(name: string): boolean;
    elementFixQuantity(name: string): boolean;
    getLabel(name: string): string;
}
