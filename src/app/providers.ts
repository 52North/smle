import { provide } from '@angular/core';
import { DescriptionRepository } from './services/DescriptionRepository';
import { InMemoryDescriptionRepository } from './services/InMemoryDescriptionRepository';
import { XmlService } from './services/XmlService';
import { SensorMLXmlService } from './services/SensorMLXmlService';
import { SampleDataLoader } from './services/SampleDataLoader';
import { PublishDescriptionService } from './sos/publishDescriptionService';
import { FetchDescriptionService } from './sos/fetchDescriptionService';
import { ConfigurationService } from './services/ConfigurationService';
import { EditorService } from './services/EditorService';

export const APP_PROVIDERS: any[] = [
  provide(DescriptionRepository, { useClass: InMemoryDescriptionRepository }),
  provide(XmlService, { useClass: SensorMLXmlService }),
  provide(SampleDataLoader, { useClass: SampleDataLoader }),
  provide(PublishDescriptionService, { useClass: PublishDescriptionService }),
  provide(FetchDescriptionService, { useClass: FetchDescriptionService }),
  provide(ConfigurationService, { useClass: ConfigurationService }),
  provide(EditorService, { useClass: EditorService })
];
