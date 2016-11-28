import { DescriptionRepository } from './services/DescriptionRepository';
import { InMemoryDescriptionRepository } from './services/InMemoryDescriptionRepository';
import { XmlService } from './services/XmlService';
import { SensorMLXmlService } from './services/SensorMLXmlService';
import { SampleDataLoader } from './services/SampleDataLoader';
import { DescriptionConfigService } from './services/DescriptionConfigService';
import { ConfigurationService } from './services/ConfigurationService';
import { EditorService } from './services/EditorService';
import { PublishDescriptionService } from './sos/publish/publish.service';
import { SosService } from './sos/sos.service';
import { DynamicGUIService } from './services/DynamicGUIService';

export const APP_PROVIDERS: any[] = [
    { provide: DescriptionRepository, useClass: InMemoryDescriptionRepository },
    { provide: XmlService, useClass: SensorMLXmlService },
    SampleDataLoader,
    DescriptionConfigService,
    ConfigurationService,
    EditorService,
    PublishDescriptionService,
    SosService,
    DynamicGUIService
];
