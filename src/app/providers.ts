import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor, HttpCache, LocalHttpCache, LocalOngoingHttpCache, OnGoingHttpCache } from '@helgoland/caching';

import { ConfigurationService } from './services/ConfigurationService';
import { DescriptionConfigService } from './services/DescriptionConfigService';
import { DescriptionRepository } from './services/DescriptionRepository';
import { DynamicGUIService } from './services/dynamicGUI/DynamicGUIService';
import { EditorService } from './services/EditorService';
import { InMemoryDescriptionRepository } from './services/InMemoryDescriptionRepository';
import { SampleDataLoader } from './services/SampleDataLoader';
import { SensorMLXmlService } from './services/SensorMLXmlService';
import { VocabularyService } from './services/vocabulary/vocabulary.service';
import { XmlService } from './services/XmlService';

export const APP_PROVIDERS: any[] = [
    { provide: DescriptionRepository, useClass: InMemoryDescriptionRepository },
    { provide: XmlService, useClass: SensorMLXmlService },
    { provide: OnGoingHttpCache, useClass: LocalOngoingHttpCache },
    { provide: HttpCache, useClass: LocalHttpCache },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    SampleDataLoader,
    DescriptionConfigService,
    ConfigurationService,
    EditorService,
    DynamicGUIService,
    VocabularyService
];
