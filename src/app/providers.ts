import { StreamDescriptionService } from './ingestion/services/stream-description.service';
import { DescriptionConfigService } from './services/DescriptionConfigService';
import { DescriptionRepository } from './services/DescriptionRepository';
import { DynamicGUIService } from './services/dynamicGUI/DynamicGUIService';
import { EditorService } from './services/EditorService';
import { SampleDataLoader } from './services/SampleDataLoader';
import { SensorMLXmlService } from './services/SensorMLXmlService';
import { NercVocabularyService } from './services/vocabulary/nerc/nerc-vocabulary.service';
import { VocabularyService } from './services/vocabulary/vocabulary.service';
import { XmlService } from './services/XmlService';

export const APP_PROVIDERS: any[] = [
    { provide: DescriptionRepository, useClass: StreamDescriptionService },
    { provide: XmlService, useClass: SensorMLXmlService },
    SampleDataLoader,
    DescriptionConfigService,
    EditorService,
    DynamicGUIService,
    { provide: VocabularyService, useClass: NercVocabularyService }
];
