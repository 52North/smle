import { DescriptionConfig } from './DescriptionConfig';

export class FalseDescriptionConfig implements DescriptionConfig {
    isFieldMandatory(name: string): boolean {
        return false;
    }
    isFieldFixed(name: string): boolean {
        return false;
    }
    isFieldVisible(name: string): boolean {
        return false;
    }
    existInForm(name: string): boolean {
        return true;
    }
    isExpanded(): boolean {
        return false;
    }
    isHidden(): boolean {
        return true;
    }
    showFlatten(name: string): boolean {
        return false;
    }
    elementFixQuantity(name: string): boolean {
        return false;
    }
    getLabel(name: string): string {
        return undefined;
    }
    getConfigFor(name: string): DescriptionConfig {
        return new FalseDescriptionConfig();
    }

}
