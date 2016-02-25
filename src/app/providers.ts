import { provide } from 'angular2/core';
import { LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { DescriptionRepository } from './services/DescriptionRepository';
import { InMemoryDescriptionRepository } from './services/InMemoryDescriptionRepository';
import { XmlService } from './services/XmlService';
import { SensorMLXmlService } from './services/SensorMLXmlService';


export const APP_PROVIDERS: any[] = [
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(DescriptionRepository, { useClass: InMemoryDescriptionRepository }),
  provide(XmlService, { useClass: SensorMLXmlService })
];
