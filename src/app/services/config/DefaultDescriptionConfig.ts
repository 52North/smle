import { DescriptionConfig } from './DescriptionConfig';
import { DescriptionConfigDynamicGUI } from './DescriptionConfigDynamicGUI';

export class DefaultDescriptionConfig implements DescriptionConfigDynamicGUI {
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

    getConfigFor(name: string): DescriptionConfig {
        return new DefaultDescriptionConfig();
    }
}
