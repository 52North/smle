const physicalComponentInstance = require('../../examples/physicalComponentInstance.xml');
const physicalComponentType = require('../../examples/physicalComponentType.xml');
const physicalSystemInstance = require('../../examples/physicalSystemInstance.xml');
const physicalSystemType = require('../../examples/physicalSystemType.xml');
const allinone = require('../../examples/lisaInstance.xml');

import { PhysicalSystem } from '../model/sml';
import { SensorMLXmlService } from './SensorMLXmlService';
import { XPathDocument } from './xml/XPathDocument';

describe('SensorMLXmlService', () => {

  let service = new SensorMLXmlService();

  it('should parse the physicalComponentInstance', () => {
    let xml = physicalComponentInstance;
    let description = service.deserialize(xml);
    //    let xmlSerialized = service.serialize(description);
    //    let descriptionDeserialized = service.deserialize(xmlSerialized);
    //    expect(description).toEqual(descriptionDeserialized);
  });

  it('should parse the physicalComponentType', () => {
    let xml = physicalComponentType;
    let description = service.deserialize(xml);
    //    let xmlSerialized = service.serialize(description);
    //    let descriptionDeserialized = service.deserialize(xmlSerialized);
    //    console.log(JSON.stringify(description.contacts, null, 2));
    //    console.log(JSON.stringify(descriptionDeserialized.contacts, null, 2));
    //    expect(description.contacts).toEqual(descriptionDeserialized.contacts);
  });

  it('should parse the physicalSystemInstance', () => {
    let xml = physicalSystemInstance;
    let description = service.deserialize(xml);
    //    let xmlSerialized = service.serialize(description);
    //    let descriptionDeserialized = service.deserialize(xmlSerialized);
    //    expect(description).toEqual(descriptionDeserialized);
  });

  it('should parse the physicalSystemType', () => {
    let xml = physicalSystemType;
    let description = service.deserialize(xml);
    //    let xmlSerialized = service.serialize(description);
    //    let descriptionDeserialized = service.deserialize(xmlSerialized);
    //    expect(description).toEqual(descriptionDeserialized);
  });

  it('should parse the allInOn', () => {
    let xml = allinone;
    let description = service.deserialize(xml);
    console.log(JSON.stringify(description.parameters.parameters[0], null, 2));
    //    let xmlSerialized = service.serialize(description);
    //    let descriptionDeserialized = service.deserialize(xmlSerialized);
    //    expect(description).toEqual(descriptionDeserialized);
  });

  it('should serialize the document', () => {
    let ps = new PhysicalSystem();
    let doc = XPathDocument.parse(service.serialize(ps));
    expect(doc.eval('/sml:PhysicalSystem')).not.toBeNull();
  });

})
