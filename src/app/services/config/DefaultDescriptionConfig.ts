import { DescriptionConfig } from './DescriptionConfig';


export class DefaultDescriptionConfig implements DescriptionConfig {
    constructor(private elementConfig: any) {

    }
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
    elementFixQuantity(name: string): boolean {
        return false;
    }
    getLabel(name: string): string {
        return undefined;
    }
    getConfigFor(name: string): DescriptionConfig {
        return new DefaultDescriptionConfig(this.elementConfig);
    }

}
