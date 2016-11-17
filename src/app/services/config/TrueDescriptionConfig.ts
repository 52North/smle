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
    elementFixQuantity(name: string): boolean {
        return false;
    }
    getConfigFor(name: string): DescriptionConfig {
        return new TrueDescriptionConfig();
    }
}