import { AbstractAlgorithm } from '../../model/sml/AbstractAlgorithm';
import { AbstractMetadataList } from '../../model/sml/AbstractMetadataList';
import { AbstractModes } from '../../model/sml/AbstractModes';
import { AbstractPhysicalProcess } from '../../model/sml/AbstractPhysicalProcess';
import { AbstractDataComponent } from '../../model/swe/AbstractDataComponent';
import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { AggregateProcess } from '../../model/sml/AggregateProcess';
import { AggregatingProcess } from '../../model/sml/AggregatingProcess';
import { CapabilityList } from '../../model/sml/CapabilityList';
import { CharacteristicList } from '../../model/sml/CharacteristicList';
import { ClassifierList } from '../../model/sml/ClassifierList';
import { ComponentList } from '../../model/sml/ComponentList';
import { Connection } from '../../model/sml/Connection';
import { ConnectionList } from '../../model/sml/ConnectionList';
import { ContactList } from '../../model/sml/ContactList';
import { DataInterface } from '../../model/sml/DataInterface';
import { DescribedObject } from '../../model/sml/DescribedObject';
import { DocumentList } from '../../model/sml/DocumentList';
import { Event } from '../../model/sml/Event';
import { EventList } from '../../model/sml/EventList';
import { FeatureList } from '../../model/sml/FeatureList';
import { GmlEncoder } from './GmlEncoder';
import { IdentifierList } from '../../model/sml/IdentifierList';
import { InputList } from '../../model/sml/InputList';
import { InputOrOutputOrParameter } from '../../model/sml/InputOrOutputOrParameter';
import { IsoEncoder } from './IsoEncoder';
import { KeywordList } from '../../model/sml/KeywordList';
import { Mode } from '../../model/sml/Mode';
import { ModeChoice } from '../../model/sml/ModeChoice';
import { NAMESPACES } from './Namespaces';
import { ObservableProperty } from '../../model/sml/ObservableProperty';
import { OutputList } from '../../model/sml/OutputList';
import { ParameterList } from '../../model/sml/ParameterList';
import { PhysicalComponent } from '../../model/sml/PhysicalComponent';
import { PhysicalSystem } from '../../model/sml/PhysicalSystem';
import { Point } from '../../model/gml';
import { Position } from '../../model/sml/Position';
import { ProcessMethod } from '../../model/sml/ProcessMethod';
import { ProcessMethodProcess } from '../../model/sml/ProcessMethodProcess';
import { Settings } from '../../model/sml/Settings';
import { SimpleProcess } from '../../model/sml/SimpleProcess';
import { SpatialFrame } from '../../model/sml/SpatialFrame';
import { SweDataArray } from '../../model/swe/SweDataArray';
import { SweDataComponent } from '../../model/swe/SweDataComponent';
import { SweDataRecord } from '../../model/swe/SweDataRecord';
import { SweEncoder } from './SweEncoder';
import { SweMatrix } from '../../model/swe/SweMatrix';
import { SweText } from '../../model/swe/SweText';
import { SweVector } from '../../model/swe/SweVector';
import { TemporalFrame } from '../../model/sml/TemporalFrame';
import { Term } from '../../model/sml/Term';

export class SensorMLEncoder {

    private sweEncoder = new SweEncoder();
    private isoEncoder = new IsoEncoder();
    private gmlEncoder = new GmlEncoder();

    public encodeTerm(term: Term, document: Document): Node {
        const termNode = document.createElementNS(NAMESPACES.SML, 'sml:Term');

        if (term.definition) {
            termNode.setAttribute('definition', term.definition);
        }

        if (typeof term.label !== 'undefined') {
            const labelNode = document.createElementNS(NAMESPACES.SML, 'sml:label');
            labelNode.textContent = term.label;
            termNode.appendChild(labelNode);
        }

        if (term.codeSpace) {
            const codeSpaceNode = document.createElementNS(NAMESPACES.SML, 'sml:codeSpace');
            codeSpaceNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', term.codeSpace);
            termNode.appendChild(codeSpaceNode);
        }

        if (typeof term.value !== 'undefined') {
            const labelNode = document.createElementNS(NAMESPACES.SML, 'sml:value');
            labelNode.textContent = term.value;
            termNode.appendChild(labelNode);
        }

        if (term.extension && term.extension.length > 0) {
            throw new Error('Extensions are not supported!');
        }

        return termNode;
    }

    public encodeAbstractMetadataList(node: Element, object: AbstractMetadataList, document: Document): void {

        this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);

        if (object.definition) {
            node.setAttribute('definition', object.definition);
        }

    }

    public encodeIdentifierList(object: IdentifierList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:IdentifierList');

        this.encodeAbstractMetadataList(node, object, document);

        if (object.identifiers) {
            object.identifiers.forEach((term) => {
                const identifierNode = document.createElementNS(NAMESPACES.SML, 'sml:identifier');
                identifierNode.appendChild(this.encodeTerm(term, document));
                node.appendChild(identifierNode);
            });
        }

        return node;
    }

    public encodeKeywordList(object: KeywordList, document: Document): Node {

        const node = document.createElementNS(NAMESPACES.SML, 'sml:KeywordList');

        this.encodeAbstractMetadataList(node, object, document);

        if (object.codeSpace) {
            const codeSpaceNode = document.createElementNS(NAMESPACES.SML, 'sml:codeSpace');
            codeSpaceNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', object.codeSpace);
            node.appendChild(codeSpaceNode);
        }

        if (object.keywords) {
            object.keywords.forEach((keyword) => {
                const keywordNode = document.createElementNS(NAMESPACES.SML, 'sml:keyword');
                keywordNode.textContent = keyword;
                node.appendChild(keywordNode);
            });
        }

        return node;
    }

    public encodeClassifierList(object: ClassifierList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:ClassifierList');

        this.encodeAbstractMetadataList(node, object, document);

        if (object.classifiers) {
            object.classifiers.forEach((term) => {
                const classifierNode = document.createElementNS(NAMESPACES.SML, 'sml:classifier');
                classifierNode.appendChild(this.encodeTerm(term, document));
                node.appendChild(classifierNode);
            });
        }

        return node;
    }

    public encodeCharacteristicList(object: CharacteristicList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:CharacteristicList');

        this.encodeAbstractMetadataList(node, object, document);

        if (object.characteristics) {
            object.characteristics.forEach((c) => {
                const n = document.createElementNS(NAMESPACES.SML, 'sml:characteristic');

                if (c.name) {
                    n.setAttribute('name', c.name);
                }
                if (c.component) {
                    n.appendChild(this.sweEncoder.encodeDataComponent(c.component, document));
                }

                node.appendChild(n);
            });
        }
        return node;
    }

    public encodeEventList(object: EventList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:EventList');

        this.encodeAbstractMetadataList(node, object, document);

        if (object.events) {
            object.events.forEach((event) => {
                const eventNode = document.createElementNS(NAMESPACES.SML, 'sml:event');
                eventNode.appendChild(this.encodeEvent(event, document));
                node.appendChild(eventNode);
            });
        }

        return node;
    }

    public encodeCapabilityList(object: CapabilityList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:CapabilityList');

        this.encodeAbstractMetadataList(node, object, document);

        if (object.capabilities) {
            object.capabilities.forEach((c) => {

                const n = document.createElementNS(NAMESPACES.SML, 'sml:capability');

                if (c.name) {
                    n.setAttribute('name', c.name);
                }

                if (c.component) {
                    n.appendChild(this.sweEncoder.encodeDataComponent(c.component, document));
                }

                node.appendChild(n);
            });
        }


        return node;
    }

    public encodeContactList(object: ContactList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:ContactList');

        this.encodeAbstractMetadataList(node, object, document);

        if (object.contacts) {
            object.contacts.forEach((contact) => {
                const contactNode = document.createElementNS(NAMESPACES.SML, 'sml:contact');
                contactNode.appendChild(this.isoEncoder.encodeResponsibleParty(contact, document));
                node.appendChild(contactNode);
            });
        }

        return node;
    }

    public encodeDocumentList(object: DocumentList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:DocumentList');

        this.encodeAbstractMetadataList(node, object, document);

        if (object.documents) {
            object.documents.forEach((onlineResource) => {
                const onlineResourceNode = document.createElementNS(NAMESPACES.SML, 'sml:document');
                onlineResourceNode.appendChild(this.isoEncoder.encodeOnlineResource(onlineResource, document));
                node.appendChild(onlineResourceNode);
            });
        }

        return node;
    }

    public encodeEvent(object: Event, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:Event');

        this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);

        if (object.keywords) {
            object.keywords.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:keywords');
                listNode.appendChild(this.encodeKeywordList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.identification) {
            object.identification.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:identification');
                listNode.appendChild(this.encodeIdentifierList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.classification) {
            object.classification.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:classification');
                listNode.appendChild(this.encodeClassifierList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.contacts) {
            object.contacts.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:contacts');
                listNode.appendChild(this.encodeContactList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.documentation) {
            object.documentation.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:documentation');
                listNode.appendChild(this.encodeDocumentList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.time) {
            const timeNode = document.createElementNS(NAMESPACES.SML, 'sml:time');
            timeNode.appendChild(this.gmlEncoder.encodeTime(object.time, document));
            node.appendChild(timeNode);
        }

        if (object.properties) {
            object.properties.forEach((property) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:property');
                listNode.appendChild(this.sweEncoder.encodeDataComponent(property, document));
                node.appendChild(listNode);
            });
        }

        if (object.configuration) {
            const configurationNode = document.createElementNS(NAMESPACES.SML, 'sml:configuration');
            configurationNode.appendChild(this.encodeSettings(object.configuration, document));
            node.appendChild(configurationNode);
        }

        return node;
    }

    public encodeDescribedObject(node: Element, object: DescribedObject, document: Document): void {

        this.gmlEncoder.encodeAbstractFeature(node, object, document);

        if (object.extension && object.extension.length > 0) {
            throw new Error('Extensions are currently unsupported');
        }

        if (object.keywords) {
            object.keywords.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:keywords');
                listNode.appendChild(this.encodeKeywordList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.identification) {
            object.identification.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:identification');
                listNode.appendChild(this.encodeIdentifierList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.classification) {
            object.classification.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:classification');
                listNode.appendChild(this.encodeClassifierList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.validTime) {
            object.validTime.forEach((time) => {
                const validTimeNode = document.createElementNS(NAMESPACES.SML, 'sml:validTime');
                validTimeNode.appendChild(this.gmlEncoder.encodeTime(time, document));
                node.appendChild(validTimeNode);
            });
        }

        if (object.securityConstraints && object.securityConstraints.length > 0) {
            throw new Error('Currently not supported');
        }

        if (object.legalConstraints) {
            object.legalConstraints.forEach((legalConstraints) => {
                const legalConstraintsNode = document.createElementNS(NAMESPACES.SML, 'sml:legalConstraints');
                legalConstraintsNode.appendChild(this.isoEncoder.encodeLegalConstraints(legalConstraints, document));
                node.appendChild(legalConstraintsNode);
            });
        }

        if (object.characteristics) {
            object.characteristics.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:characteristics');
                listNode.appendChild(this.encodeCharacteristicList(list, document));
                if (list.name) {
                    listNode.setAttribute('name', list.name);
                }
                node.appendChild(listNode);
            });
        }

        if (object.capabilities) {
            object.capabilities.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:capabilities');
                listNode.appendChild(this.encodeCapabilityList(list, document));
                if (list.name) {
                    listNode.setAttribute('name', list.name);
                }
                node.appendChild(listNode);
            });
        }

        if (object.contacts) {
            object.contacts.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:contacts');
                listNode.appendChild(this.encodeContactList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.documentation) {
            object.documentation.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:documentation');
                listNode.appendChild(this.encodeDocumentList(list, document));
                node.appendChild(listNode);
            });
        }

        if (object.history) {
            object.history.forEach((list) => {
                const listNode = document.createElementNS(NAMESPACES.SML, 'sml:history');
                listNode.appendChild(this.encodeEventList(list, document));
                node.appendChild(listNode);
            });
        }
    }

    public encodeAbstractProcess(node: Element, object: AbstractProcess, document: Document): void {

        this.encodeDescribedObject(node, object, document);

        if (object.typeOf) {
            const typeOfNode = document.createElementNS(NAMESPACES.SML, 'sml:typeOf');
            typeOfNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', object.typeOf);
            node.appendChild(typeOfNode);
        }

        if (object.configuration) {
            const configurationNode = document.createElementNS(NAMESPACES.SML, 'sml:configuration');
            configurationNode.appendChild(this.encodeSettings(object.configuration, document));
            node.appendChild(configurationNode);
        }

        if (object.featureOfInterest && object.featureOfInterest.features.length > 0) {
            const featureOfInterestNode = document.createElementNS(NAMESPACES.SML, 'sml:featuresOfInterest');
            featureOfInterestNode.appendChild(this.encodeFeatureList(object.featureOfInterest, document));
            node.appendChild(featureOfInterestNode);
        }

        if (object.inputs && object.inputs.inputs.length > 0) {
            const inputsNode = document.createElementNS(NAMESPACES.SML, 'sml:inputs');
            inputsNode.appendChild(this.encodeInputList(object.inputs, document));
            node.appendChild(inputsNode);
        }

        if (object.outputs && object.outputs.outputs.length > 0) {
            const outputsNode = document.createElementNS(NAMESPACES.SML, 'sml:outputs');
            outputsNode.appendChild(this.encodeOutputList(object.outputs, document));
            node.appendChild(outputsNode);
        }

        if (object.parameters && object.parameters.parameters.length > 0) {
            const parametersNode = document.createElementNS(NAMESPACES.SML, 'sml:parameters');
            parametersNode.appendChild(this.encodeParameterList(object.parameters, document));
            node.appendChild(parametersNode);
        }

        if (object.modes) {
            object.modes.forEach((modes) => {
                const modesNode = document.createElementNS(NAMESPACES.SML, 'sml:modes');
                modesNode.appendChild(this.encodeModes(modes, document));
                node.appendChild(modesNode);
            });
        }

        if (object.definition) {
            node.setAttribute('definiton', object.definition);
        }

    }

    public encodeModes(object: AbstractModes, document: Document): Node {

        if (object instanceof ModeChoice) {
            return this.encodeModeChoice(object, document);
        }

        throw new Error('Unsupported modes type');

    }

    public encodeModeChoice(object: ModeChoice, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:ModeChoice');

        this.sweEncoder.encodeAbstractSwe(node, object, document);

        if (object.modes) {
            object.modes.forEach((mode) => {
                const modeNode = document.createElementNS(NAMESPACES.SML, 'sml:mode');
                modeNode.appendChild(this.encodeMode(mode, document));
                node.appendChild(modeNode);
            });
        }

        return node;
    }

    public encodeMode(object: Mode, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:Mode');
        this.encodeDescribedObject(node, object, document);

        if (object.configuration) {
            const configurationNode = document.createElementNS(NAMESPACES.SML, 'sml:configuration');
            configurationNode.appendChild(this.encodeSettings(object.configuration, document));
            node.appendChild(configurationNode);
        }

        return node;
    }

    public encodeSettings(object: Settings, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:Settings');
        this.sweEncoder.encodeAbstractSwe(node, object, document);

        if (object.setValue) {

            object.setValue.forEach((setting) => {
                const valueNode = document.createElementNS(NAMESPACES.SML, 'sml:setValue');
                if (setting.ref) {
                    valueNode.setAttribute('ref', setting.ref);
                }
                if (setting.value != null) {
                    const value = setting.value;
                    if (value instanceof Date) {
                        valueNode.textContent = value.toISOString();
                    } else {
                        valueNode.textContent = value.toString();
                    }
                }
                node.appendChild(valueNode);
            });
        }

        if (object.setArrayValue) {
            object.setArrayValue.forEach((setting) => {
                const arrayValueNode = document.createElementNS(NAMESPACES.SML, 'sml:setArrayValue');
                if (setting.ref) {
                    arrayValueNode.setAttribute('ref', setting.ref);
                }

                if (setting.encoding) {
                    const encodingNode = document.createElementNS(NAMESPACES.SML, 'sml:encoding');
                    encodingNode.appendChild(this.sweEncoder.encodeAbstractEncoding(setting.encoding, document));
                    arrayValueNode.appendChild(encodingNode);
                }

                if (setting.value) {
                    const valueNode = document.createElementNS(NAMESPACES.SML, 'sml:value');
                    valueNode.textContent = setting.value.toString();
                    arrayValueNode.appendChild(valueNode);
                }
                node.appendChild(arrayValueNode);
            });
        }

        if (object.setConstraint) {
            object.setConstraint.forEach((setting) => {
                const constraintNode = document.createElementNS(NAMESPACES.SML, 'sml:setConstraint');
                if (setting.ref) {
                    constraintNode.setAttribute('ref', setting.ref);
                }
                if (setting.value) {
                    constraintNode.appendChild(this.sweEncoder.encodeConstraint(setting.value, document));
                }
                node.appendChild(constraintNode);
            });
        }

        if (object.setMode) {
            object.setMode.forEach((setting) => {
                const modeNode = document.createElementNS(NAMESPACES.SML, 'sml:setMode');
                if (setting.ref) {
                    modeNode.setAttribute('ref', setting.ref);
                }
                if (setting.value) {
                    modeNode.textContent = setting.value;
                }
                node.appendChild(modeNode);
            });
        }

        if (object.setStatus) {
            object.setStatus.forEach((setting) => {
                const statusNode = document.createElementNS(NAMESPACES.SML, 'sml:setStatus');
                if (setting.ref) {
                    statusNode.setAttribute('ref', setting.ref);
                }
                if (setting.value) {
                    statusNode.textContent = setting.value;
                }
                node.appendChild(statusNode);
            });
        }

        return node;
    }

    public encodeFeatureList(object: FeatureList, document: Document) {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:FeatureList');

        this.encodeAbstractMetadataList(node, object, document);

        if (object.features) {
            object.features.forEach((feature) => {
                const featureNode = document.createElementNS(NAMESPACES.SML, 'sml:feature');
                featureNode.appendChild(this.gmlEncoder.encodeFeature(feature, document));
                node.appendChild(featureNode);
            });
        }

        return node;
    }

    public encodeInputList(object: InputList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:InputList');
        this.sweEncoder.encodeAbstractSwe(node, object, document);

        if (object.inputs) {
            object.inputs.forEach((input) => {
                const inputNode = document.createElementNS(NAMESPACES.SML, 'sml:input');
                this.encodeInputOrOutputOrParameter(inputNode, input, document);
                node.appendChild(inputNode);
            });
        }

        return node;
    }

    public encodeOutputList(object: OutputList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:OutputList');
        this.sweEncoder.encodeAbstractSwe(node, object, document);

        if (object.outputs) {
            object.outputs.forEach((input) => {
                const outputNode = document.createElementNS(NAMESPACES.SML, 'sml:output');
                this.encodeInputOrOutputOrParameter(outputNode, input, document);
                node.appendChild(outputNode);
            });
        }

        return node;
    }

    public encodeParameterList(object: ParameterList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:ParameterList');
        this.sweEncoder.encodeAbstractSwe(node, object, document);

        if (object.parameters) {
            object.parameters.forEach((parameter) => {
                const parameterNode = document.createElementNS(NAMESPACES.SML, 'sml:parameter');
                this.encodeInputOrOutputOrParameter(parameterNode, parameter, document);
                node.appendChild(parameterNode);
            });
        }

        return node;
    }

    public encodeDataInterface(object: DataInterface, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:DataInterface');

        this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);


        if (object.data) {
            const dataNode = document.createElementNS(NAMESPACES.SML, 'sml:data');
            dataNode.appendChild(this.sweEncoder.encodeDataStream(object.data, document));
            node.appendChild(dataNode);
        }

        if (object.interfaceParameters) {
            const interfaceParametersNode = document.createElementNS(NAMESPACES.SML, 'sml:interfaceParameters');
            interfaceParametersNode.appendChild(this.sweEncoder.encodeDataRecord(object.interfaceParameters, document));
            node.appendChild(interfaceParametersNode);
        }

        return node;
    }

    public encodeObservableProperty(object: ObservableProperty, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:ObservableProperty');

        this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);

        if (object.definition) {
            node.setAttribute('definition', object.definition);
        }

        return node;
    }

    public encodeInputOrOutputOrParameter(node: Element, object: InputOrOutputOrParameter, document: Document): void {
        if (object.name) {
            node.setAttribute('name', object.name);
        }

        if (object.value) {
            node.appendChild(this.encodeInputOrOutputOrParameterValue(object.value));
        }
    }

    public encodeSimpleProcess(object: SimpleProcess, document: Document, node?: Element): Node {
        if (!node) {
            node = document.createElementNS(NAMESPACES.SML, 'sml:SimpleProcess');
        }
        this.encodeAbstractProcess(node, object, document);
        this.encodeProcessMethodProcess(node, object, document);

        return node;
    }

    public encodeProcessMethod(object: ProcessMethod, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:ProcessMethod');
        this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);

        if (object.algorithm) {
            object.algorithm.forEach((algorithm) => {
                const algorithmNode = document.createElementNS(NAMESPACES.SML, 'sml:algorithm');
                algorithmNode.appendChild(this.encodeAlgorithm(algorithm, document));
                node.appendChild(algorithmNode);
            });
        }

        return node;
    }

    public encodeAlgorithm(object: AbstractAlgorithm, document: Document): Node {
        // TODO implement algorithm
        throw new Error('not yet implemented');
    }

    public encodeAggregateProcess(object: AggregateProcess, document: Document, node?: Element): Node {
        if (!node) {
            node = document.createElementNS(NAMESPACES.SML, 'sml:AggregateProcess');
        }
        this.encodeAbstractProcess(node, object, document);
        this.encodeAggregatingProcess(node, object, document);

        return node;
    }

    public encodeConnectionList(object: ConnectionList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:ConnectionList');
        this.sweEncoder.encodeAbstractSwe(node, object, document);

        if (object.connections) {
            object.connections.forEach((connection) => {
                const connectionNode = document.createElementNS(NAMESPACES.SML, 'sml:connection');
                connectionNode.appendChild(this.encodeConnection(connection, document));
                node.appendChild(connectionNode);
            });
        }

        return node;
    }

    public encodeConnection(object: Connection, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:Link');
        if (object.source) {
            const sourceNode = document.createElementNS(NAMESPACES.SML, 'sml:source');
            sourceNode.setAttribute('ref', object.source);
            node.appendChild(sourceNode);
        }
        if (object.destination) {
            const destinationNode = document.createElementNS(NAMESPACES.SML, 'sml:destination');
            destinationNode.setAttribute('ref', object.destination);
            node.appendChild(destinationNode);
        }
        return node;
    }

    public encodeComponentList(object: ComponentList, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:ComponentList');
        this.sweEncoder.encodeAbstractSwe(node, object, document);

        if (object.components) {
            object.components.forEach((component) => {
                const componentNode = document.createElementNS(NAMESPACES.SML, 'sml:component');
                if (component.name) {
                    componentNode.setAttribute('name', component.name);
                }
                // TODO set new abstract process element
                
                // if (component.href) {
                //     componentNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', component.href);
                // }
                // if (component.title) {
                //     componentNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:title', component.title);
                // }
                node.appendChild(componentNode);
            });
        }
        return node;
    }

    public encodeAbstractPhysicalProcess(node: Element, object: AbstractPhysicalProcess, document: Document): void {

        this.encodeAbstractProcess(node, object, document);

        if (object.attachedTo) {
            const attachedToNode = document.createElementNS(NAMESPACES.SML, 'sml:attachedTo');
            attachedToNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', object.attachedTo);
            node.appendChild(attachedToNode);
        }

        if (object.localReferenceFrame) {
            object.localReferenceFrame.forEach((frame) => {
                const frameNode = document.createElementNS(NAMESPACES.SML, 'sml:localReferenceFrame');
                frameNode.appendChild(this.encodeSpatialFrame(frame, document));
                node.appendChild(frameNode);
            });
        }

        if (object.localTimeFrame) {
            object.localTimeFrame.forEach((frame) => {
                const frameNode = document.createElementNS(NAMESPACES.SML, 'sml:localTimeFrame');
                frameNode.appendChild(this.encodeTemporalFrame(frame, document));
                node.appendChild(frameNode);
            });
        }

        if (object.position) {
            object.position.forEach((position) => {
                const positionNode = document.createElementNS(NAMESPACES.SML, 'sml:position');
                positionNode.appendChild(this.encodePosition(position, document));
                node.appendChild(positionNode);
            });
        }

        if (object.timePosition) {
            object.timePosition.forEach((position) => {
                const positionNode = document.createElementNS(NAMESPACES.SML, 'sml:timePosition');
                positionNode.appendChild(this.sweEncoder.encodeTime(position, document));
                node.appendChild(positionNode);
            });
        }

    }

    public encodePosition(object: Position, document: Document): Node {
        if (object instanceof Point) {
            return this.gmlEncoder.encodePoint(object, document);
        }
        if (object instanceof SweText) {
            return this.sweEncoder.encodeText(object, document);
        }
        if (object instanceof SweVector) {
            return this.sweEncoder.encodeVector(object, document);
        }
        if (object instanceof SweDataRecord) {
            return this.sweEncoder.encodeDataRecord(object, document);
        }
        if (object instanceof SweMatrix) {
            return this.sweEncoder.encodeMatrix(object, document);
        }
        if (object instanceof SweDataArray) {
            return this.sweEncoder.encodeDataArray(object, document);
        }
        if (object instanceof AbstractProcess) {
            return this.encodeProcess(object, document);
        }
    }

    public encodeProcess(object: AbstractProcess, document: Document, node?: Element): Node {
        if (object instanceof SimpleProcess) {
            return this.encodeSimpleProcess(object, document, node);
        }
        if (object instanceof AggregateProcess) {
            return this.encodeAggregateProcess(object, document, node);
        }
        if (object instanceof PhysicalSystem) {
            return this.encodePhysicalSystem(object, document, node);
        }
        if (object instanceof PhysicalComponent) {
            return this.encodePhysicalComponent(object, document, node);
        }

        throw new Error('Unsupported process type');
    }

    public encodeSpatialFrame(object: SpatialFrame, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:SpatialFrame');
        this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);

        if (object.origin) {
            const originNode = document.createElementNS(NAMESPACES.SML, 'sml:origin');
            originNode.textContent = object.origin;
            node.appendChild(originNode);
        }

        if (object.axis) {
            object.axis.forEach((axis) => {
                const axisNode = document.createElementNS(NAMESPACES.SML, 'sml:axis');
                if (axis.name) {
                    axisNode.setAttribute('name', axis.name);
                }
                if (axis.description) {
                    axisNode.textContent = axis.description;
                }
                node.appendChild(axisNode);
            });
        }

        return node;
    }

    public encodeTemporalFrame(object: TemporalFrame, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:TemporalFrame');
        this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);

        if (object.origin) {
            const originNode = document.createElementNS(NAMESPACES.SML, 'sml:origin');
            originNode.textContent = object.origin;
            node.appendChild(originNode);
        }

        return node;
    }

    public encodePhysicalSystem(object: PhysicalSystem, document: Document, node?: Element): Node {
        if (!node) {
            node = document.createElementNS(NAMESPACES.SML, 'sml:PhysicalSystem');
        }

        this.encodeAbstractPhysicalProcess(node, object, document);
        this.encodeAggregatingProcess(node, object, document);

        return node;
    }

    public encodeAggregatingProcess(node: Element, object: AggregatingProcess, document: Document): void {
        if (object.components && object.components.components.length > 0) {
            const componentsNode = document.createElementNS(NAMESPACES.SML, 'sml:components');
            componentsNode.appendChild(this.encodeComponentList(object.components, document));
            node.appendChild(componentsNode);
        }

        if (object.connections && object.connections.connections.length > 0) {
            const connectionsNode = document.createElementNS(NAMESPACES.SML, 'sml:connections');
            connectionsNode.appendChild(this.encodeConnectionList(object.connections, document));
            node.appendChild(connectionsNode);
        }
    }

    public encodeProcessMethodProcess(node: Element, object: ProcessMethodProcess, document: Document): void {

        if (object.method) {
            const methodNode = document.createElementNS(NAMESPACES.SML, 'sml:method');
            methodNode.appendChild(this.encodeProcessMethod(object.method, document));
            node.appendChild(methodNode);
        }
    }

    public encodePhysicalComponent(object: PhysicalComponent, document: Document, node?: Element): Node {
        if (!node) {
            node = document.createElementNS(NAMESPACES.SML, 'sml:PhysicalComponent');
        }
        this.encodeAbstractPhysicalProcess(node, object, document);
        this.encodeProcessMethodProcess(node, object, document);
        return node;
    }

    private encodeInputOrOutputOrParameterValue(
        value: SweDataComponent | DataInterface | ObservableProperty): Node {
        if (value instanceof AbstractDataComponent) {
            return this.sweEncoder.encodeDataComponent(value, document);
        } else if (value instanceof ObservableProperty) {
            return this.encodeObservableProperty(value, document);
        } else if (value instanceof DataInterface) {
            return this.encodeDataInterface(value, document);
        }
    }
}
