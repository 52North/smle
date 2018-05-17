export enum VocabularyType {
    Identifier,
    Classifier,
    Characteristic,
    HistoryEvent,
    Capability,
    Contact
}

export interface VocabularyEntry {
    label: string;
    uri: string;
    description: string;
    hasNarrower?: boolean;
    narrower?: string[];
}
