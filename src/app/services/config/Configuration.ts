export interface Configuration {
    isFieldMandatory(name: string): boolean;
    getConfigFor(name: string): Configuration;
}
