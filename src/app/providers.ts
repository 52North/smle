import {provide} from '@angular/core';
import {DescriptionRepository} from './services/DescriptionRepository';
import {InMemoryDescriptionRepository} from './services/InMemoryDescriptionRepository';
import {XmlService} from './services/XmlService';
import {SensorMLXmlService} from './services/SensorMLXmlService';


export const APP_PROVIDERS:any[] = [
    provide(DescriptionRepository, {useClass: InMemoryDescriptionRepository}),
    provide(XmlService, {useClass: SensorMLXmlService})
];
