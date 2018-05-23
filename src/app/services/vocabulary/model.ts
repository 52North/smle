export enum VocabularyType {
    Identifier,
    Classifier,
    Characteristic,
    HistoryEvent,
    Capability,
    Contact,
    ObservedProperty
}

export interface VocabularyEntry {
    label: string;
    uri: string;
    description: string;
    hasNarrower?: boolean;
    narrower?: string[];
}
