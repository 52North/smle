const physicalComponentInstance =
  require('../../../examples/physicalComponentInstance.xml');
const physicalComponentType =
  require('../../../examples/physicalComponentType.xml');
const physicalSystemInstance =
  require('../../../examples/physicalSystemInstance.xml');
const physicalSystemType =
  require('../../../examples/physicalSystemType.xml');

import { SensorMLNamespaceResolver } from './xml/SensorMLNamespaceResolver';
import { PhysicalSystem } from '../model/sml/PhysicalSystem';
import { SensorMLXmlService } from './SensorMLXmlService';
import { XPathDocument } from './xml/XPathDocument';

describe('SensorMLXmlService', () => {

  let service = new SensorMLXmlService();

  /*
  it('should parse the physicalComponentInstance', () => {
    expect(physicalComponentInstance).not.toBeNull();
    expect(service.deserialize(physicalComponentInstance)).not.toBeNull();
  });

  it('should parse the physicalComponentType', () => {
    expect(physicalComponentType).not.toBeNull();
    expect(service.deserialize(physicalComponentType)).not.toBeNull();
  });

  it('should parse the physicalSystemInstance', () => {
    expect(physicalSystemInstance).not.toBeNull();
    expect(service.deserialize(physicalSystemInstance)).not.toBeNull();
  });

  it('should parse the physicalSystemType', () => {
    expect(physicalSystemType).not.toBeNull();
    expect(service.deserialize(physicalSystemType)).not.toBeNull();
  });
  */

  it('should serialize the document', () => {
    let ps = new PhysicalSystem();
    let doc = XPathDocument.parse(service.serialize(ps));

    expect(doc.eval('/sml:PhysicalSystem')).toBeNull();
  });

});
