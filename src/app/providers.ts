import { provide } from '@angular/core';
import { DescriptionRepository } from './services/DescriptionRepository';
import { InMemoryDescriptionRepository } from './services/InMemoryDescriptionRepository';
import { XmlService } from './services/XmlService';
import { SensorMLXmlService } from './services/SensorMLXmlService';
import { SampleDataLoader } from './services/SampleDataLoader';
import { ConfigurationService } from './services/ConfigurationService';
import { EditorService } from './services/EditorService';
import { PublishDescriptionService } from './sos/publish/publish.service';
import { ConnectDescriptionService } from './sos/connect/connect.service';
import { SosService } from './sos/sos.service';

export const APP_PROVIDERS: any[] = [
  { provide: DescriptionRepository, useClass: InMemoryDescriptionRepository },
  { provide: XmlService, useClass: SensorMLXmlService },
  { provide: SampleDataLoader, useClass: SampleDataLoader },
  { provide: ConfigurationService, useClass: ConfigurationService },
  { provide: EditorService, useClass: EditorService },
  { provide: PublishDescriptionService, useClass: PublishDescriptionService },
  { provide: ConnectDescriptionService, useClass: ConnectDescriptionService },
  { provide: SosService, useClass: SosService }
];
