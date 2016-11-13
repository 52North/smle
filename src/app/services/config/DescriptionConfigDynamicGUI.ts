import { DescriptionConfig } from './DescriptionConfig';

export interface DescriptionConfigDynamicGUI extends DescriptionConfig {
    isFieldFixed(name: string): boolean;
    isFieldMandatory(name: string): boolean;
}
