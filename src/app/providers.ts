import { SensorMLXmlService, XmlService } from '@helgoland/sensorml';

import { DescriptionConfigService } from './services/DescriptionConfigService';
import { DescriptionRepository } from './services/DescriptionRepository';
import { DynamicGUIService } from './services/dynamicGUI/DynamicGUIService';
import { EditorService } from './services/EditorService';
import { InMemoryDescriptionRepository } from './services/InMemoryDescriptionRepository';
import { SampleDataLoader } from './services/SampleDataLoader';
import { NercVocabularyService } from './services/vocabulary/nerc/nerc-vocabulary.service';
import { VocabularyService } from './services/vocabulary/vocabulary.service';

export const APP_PROVIDERS: any[] = [
    { provide: DescriptionRepository, useClass: InMemoryDescriptionRepository },
    { provide: XmlService, useClass: SensorMLXmlService },
    SampleDataLoader,
    DescriptionConfigService,
    EditorService,
    DynamicGUIService,
    { provide: VocabularyService, useClass: NercVocabularyService }
];
