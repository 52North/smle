import { provide } from '@angular/core';
import { DescriptionRepository } from './services/DescriptionRepository';
import { InMemoryDescriptionRepository } from './services/InMemoryDescriptionRepository';
import { XmlService } from './services/XmlService';
import { SensorMLXmlService } from './services/SensorMLXmlService';
import { SampleDataLoader } from './services/SampleDataLoader';
import { DescriptionConfigService } from './services/DescriptionConfigService';
import { EditorService } from './services/EditorService';
// import { MODAL_BROWSER_PROVIDERS } from 'angular2-modal/platform-browser';

export const APP_PROVIDERS: any[] = [
  { provide: DescriptionRepository, useClass: InMemoryDescriptionRepository },
  { provide: XmlService, useClass: SensorMLXmlService },
  { provide: SampleDataLoader, useClass: SampleDataLoader },
  { provide: DescriptionConfigService, useClass: DescriptionConfigService },
  { provide: EditorService, useClass: EditorService }
];
