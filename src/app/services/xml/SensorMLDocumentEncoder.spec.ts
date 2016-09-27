
import { PhysicalSystem } from '../../model/sml/PhysicalSystem';
import { SensorMLDocumentEncoder } from './SensorMLDocumentEncoder';
import { XPathDocument } from './XPathDocument';
import { Component } from '../../model/sml/Component';

describe('SensorMLDocumentEncoder', () => {

    let service = new SensorMLDocumentEncoder();


    let ps = (function createPhysicalSystem(): PhysicalSystem {
        let physicalSystem = new PhysicalSystem();
        physicalSystem.components.id = 'components';
        physicalSystem.components.components = [
            new Component('My Component', 'http://example.com/MyComponent')
        ];
        return physicalSystem;
    })();

    it('should serialize the component', () => {

        let doc = new XPathDocument(service.encode(ps));

        expect(doc.eval('/sml:PhysicalSystem/sml:components/sml:ComponentList/sml:component/@xlink:href')[0].value)
            .toBe(ps.components.components[0].href);
    });

});
