import { DescriptionConfig } from './DescriptionConfig';

export class TrueDescriptionConfig implements DescriptionConfig {
    isFieldMandatory(name: string): boolean {
        return false;
    }
    isFieldFixed(name: string): boolean {
        return false;
    }
    isFieldVisible(name: string): boolean {
        return true;
    }
    existInForm(name: string): boolean {
        return true;
    }
    isExpanded(): boolean {
        return true;
    }
    showFlatten(name: string): boolean {
        return true;
    }
    elementFixQuantity(name: string): boolean {
        return false;
    }
    getLabel(name: string): string {
        return undefined;
    }
    getConfigFor(name: string): DescriptionConfig {
        return new TrueDescriptionConfig();
    }
}
