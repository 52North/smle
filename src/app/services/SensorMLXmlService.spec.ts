const physicalComponentInstance = require('../../examples/physicalComponentInstance.xml');
const physicalComponentType = require('../../examples/physicalComponentType.xml');
const physicalSystemInstance = require('../../examples/physicalSystemInstance.xml');
const physicalSystemType = require('../../examples/physicalSystemType.xml');
const allinone = require('../../examples/lisaInstance.xml');

import { PhysicalSystem } from '../model/sml';
import { SensorMLXmlService } from './SensorMLXmlService';
import { XPathDocument } from './xml/XPathDocument';

describe('SensorMLXmlService', () => {

    const service = new SensorMLXmlService();

    it('should parse the physicalComponentInstance', () => {
        const xml = physicalComponentInstance;
        const description = service.deserialize(xml);
        const xmlSerialized = service.serialize(description);
        const descriptionDeserialized = service.deserialize(xmlSerialized);
        expect(description).toEqual(descriptionDeserialized);
    });

    it('should parse the physicalComponentType', () => {
        const xml = physicalComponentType;
        const description = service.deserialize(xml);
        const xmlSerialized = service.serialize(description);
        const descriptionDeserialized = service.deserialize(xmlSerialized);
        console.log(JSON.stringify(description.contacts, null, 2));
        console.log(JSON.stringify(descriptionDeserialized.contacts, null, 2));
        expect(description.contacts).toEqual(descriptionDeserialized.contacts);
    });

    it('should parse the physicalSystemInstance', () => {
        const xml = physicalSystemInstance;
        const description = service.deserialize(xml);
        const xmlSerialized = service.serialize(description);
        const descriptionDeserialized = service.deserialize(xmlSerialized);
        expect(description).toEqual(descriptionDeserialized);
    });

    it('should parse the physicalSystemType', () => {
        const xml = physicalSystemType;
        const description = service.deserialize(xml);
        const xmlSerialized = service.serialize(description);
        const descriptionDeserialized = service.deserialize(xmlSerialized);
        expect(description).toEqual(descriptionDeserialized);
    });

    it('should parse the allInOn', () => {
        const xml = allinone;
        const description = service.deserialize(xml);
        const xmlSerialized = service.serialize(description);
        const descriptionDeserialized = service.deserialize(xmlSerialized);
        expect(description).toEqual(descriptionDeserialized);
    });

    it('should serialize the document', () => {
        const ps = new PhysicalSystem();
        const doc = XPathDocument.parse(service.serialize(ps));
        expect(doc.eval('/sml:PhysicalSystem')).not.toBeNull();
    });

});
