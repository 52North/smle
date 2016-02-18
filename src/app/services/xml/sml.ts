import {
  AbstractAlgorithm,
  AbstractMetadataList,
  AbstractModes,
  AbstractNamedMetadataList,
  AbstractPhysicalProcess,
  AbstractProcess,
  AbstractSetting,
  AggregateProcess,
  AggregatingProcess,
  ArrayValueSetting,
  Axis,
  Capabilitiy,
  CapabilityList,
  Characteristic,
  CharacteristicList,
  ClassifierList,
  ComponentList,
  Connection,
  ConnectionList,
  ConstraintSetting,
  ContactList,
  DataInterface,
  DescribedObject,
  DocumentList,
  Event,
  EventList,
  FeatureList,
  IdentifierList,
  Input,
  InputList,
  InputOrOutputOrParameter,
  KeywordList,
  Mode,
  ModeChoice,
  ModeSetting,
  NamedSweDataComponent,
  ObservableProperty,
  Output,
  OutputList,
  Parameter,
  ParameterList,
  PhysicalComponent,
  PhysicalSystem,
  Position,
  ProcessMethod,
  ProcessMethodProcess,
  Settings,
  SimpleProcess,
  SpatialFrame,
  Status,
  StatusSetting,
  TemporalFrame,
  Term,
  ValueSetting
} from '../../model/sml';

import { Point } from '../../model/gml';
import { SweDataComponent, SweText, SweVector, SweDataRecord, SweDataArray, SweMatrix } from '../../model/swe';
import * as Namespaces from './namespaces';
import { SweEncoder } from './swe';
import { IsoEncoder } from './iso';
import { GmlEncoder } from './gml';

export class SmlEncoder {

  private sweEncoder = new SweEncoder();
  private isoEncoder = new IsoEncoder();
  private gmlEncoder = new GmlEncoder();

  public encodeTerm(term: Term, document: Document): Node {
    var termNode = document.createElementNS(Namespaces.SML, 'sml:Term');

    if (term.definition) {
      termNode.setAttribute('definition', term.definition);
    }

    if (term.label) {
      let labelNode = document.createElementNS(Namespaces.SML, 'sml:label');
      labelNode.textContent = term.label;
      termNode.appendChild(labelNode);
    }

    if (term.codeSpace) {
      let codeSpaceNode = document.createElementNS(Namespaces.SML, 'sml:codeSpace');
      codeSpaceNode.setAttributeNS(Namespaces.XLINK, 'xlink:href', term.codeSpace);
      termNode.appendChild(codeSpaceNode);
    }

    if (term.value) {
      let labelNode = document.createElementNS(Namespaces.SML, 'sml:value');
      labelNode.textContent = term.value;
      termNode.appendChild(labelNode);
    }

    if (term.extension) {
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
    let node = document.createElementNS(Namespaces.SML, 'sml:IdentifierList');

    this.encodeAbstractMetadataList(node, object, document);

    if (object.identifiers) {
      object.identifiers.forEach(term => {
        let identifierNode = document.createElementNS(Namespaces.SML, 'sml:identifier');
        identifierNode.appendChild(this.encodeTerm(term, document));
        return identifierNode;
      });
    }

    return node;
  }

  public encodeKeywordList(object: KeywordList, document: Document): Node {

    let node = document.createElementNS(Namespaces.SML, 'sml:KeywordList');

    this.encodeAbstractMetadataList(node, object, document);

    if (object.codeSpace) {
      let codeSpaceNode = document.createElementNS(Namespaces.SML, 'sml:codeSpace');
      codeSpaceNode.setAttributeNS(Namespaces.XLINK, 'xlink:href', object.codeSpace);
      node.appendChild(codeSpaceNode);
    }

    if (object.keywords) {
      object.keywords.forEach(keyword => {
        let keywordNode = document.createElementNS(Namespaces.SML, 'sml:keyword');
        keywordNode.textContent = keyword;
        node.appendChild(keywordNode);
      });
    }

    return node;
  }

  public encodeClassifierList(object: ClassifierList, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:ClassifierList');

    this.encodeAbstractMetadataList(node, object, document);

    if (object.classifiers) {
      object.classifiers.forEach(term => {
        let classifierNode = document.createElementNS(Namespaces.SML, 'sml:classifier');
        classifierNode.appendChild(this.encodeTerm(term, document));
        return classifierNode;
      });
    }

    return node;
  }

  public encodeCharacteristicList(object: CharacteristicList, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:CharacteristicList');

    this.encodeAbstractMetadataList(node, object, document);

    if (object.characteristics) {
      object.characteristics.forEach(c => {
        let n = document.createElementNS(Namespaces.SML, 'sml:characteristic');

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
    let node = document.createElementNS(Namespaces.SML, 'sml:EventList');

    this.encodeAbstractMetadataList(node, object, document);

    if (object.events) {
      object.events.forEach(event => {
        let eventNode = document.createElementNS(Namespaces.SML, 'sml:event');
        eventNode.appendChild(this.encodeEvent(event, document));
        node.appendChild(eventNode);
      });
    }

    return node;
  }

  public encodeCapabilityList(object: CapabilityList, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:CapabilityList');

    this.encodeAbstractMetadataList(node, object, document);

    if (object.capabilities) {
      object.capabilities.forEach(c => {

        let n = document.createElementNS(Namespaces.SML, 'sml:capability');

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
    let node = document.createElementNS(Namespaces.SML, 'sml:ContactsList');

    this.encodeAbstractMetadataList(node, object, document);

    if (object.contacts) {
      object.contacts.forEach(contact => {
        let contactNode = document.createElementNS(Namespaces.SML, 'sml:contact');
        contactNode.appendChild(this.isoEncoder.encodeResponsibleParty(contact, document));
        node.appendChild(contactNode);
      });
    }

    return node;
  }

  public encodeDocumentList(object: DocumentList, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:DocumentList');

    this.encodeAbstractMetadataList(node, object, document);

    if (object.documents) {
      object.documents.forEach(onlineResource => {
        let onlineResourceNode = document.createElementNS(Namespaces.SML, 'sml:document');
        onlineResourceNode.appendChild(this.isoEncoder.encodeOnlineResource(onlineResource, document));
        node.appendChild(onlineResourceNode);
      });
    }

    return node;
  }

  public encodeEvent(object: Event, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:Event');

    this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);


    if (object.keywords) {
      //TODO implement GMD keywords
      throw new Error('Not yet supported');
    }

    if (object.identification) {
      object.identification.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:identification');
        listNode.appendChild(this.encodeIdentifierList(list, document));
        node.appendChild(listNode);
      });
    }

    if (object.classification) {
      object.classification.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:classification');
        listNode.appendChild(this.encodeClassifierList(list, document));
        node.appendChild(listNode);
      });
    }

    if (object.contacts) {
      object.contacts.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:contacts');
        listNode.appendChild(this.encodeContactList(list, document));
        node.appendChild(listNode);
      });
    }

    if (object.documentation) {
      object.documentation.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:documentation');
        listNode.appendChild(this.encodeDocumentList(list, document));
        node.appendChild(listNode);
      });
    }

    if (object.time) {
      let timeNode = document.createElementNS(Namespaces.SML, 'sml:time');
      timeNode.appendChild(this.gmlEncoder.encodeTime(object.time, document));
      node.appendChild(timeNode);
    }

    if (object.properties) {
      object.properties.forEach(property => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:property');
        listNode.appendChild(this.sweEncoder.encodeDataComponent(property, document));
        node.appendChild(listNode);
      });
    }

    if (object.configuration) {
      let configurationNode = document.createElementNS(Namespaces.SML, 'sml:configuration');
      configurationNode.appendChild(this.encodeSettings(object.configuration, document));
      node.appendChild(configurationNode);
    }

    return node;
  }

  public encodeDescribedObject(node: Element, object: DescribedObject, document: Document): void {

    this.gmlEncoder.encodeAbstractFeature(node, object, document);

    if (object.extension) {
      throw new Error('Extensions are currently unsupported');
    }

    if (object.keywords) {
      object.keywords.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:keywords');
        listNode.appendChild(this.encodeKeywordList(list, document));
        node.appendChild(listNode);
      });
    }

    if (object.identification) {
      object.identification.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:identification');
        listNode.appendChild(this.encodeIdentifierList(list, document));
        node.appendChild(listNode);
      });
    }

    if (object.classification) {
      object.classification.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:classification');
        listNode.appendChild(this.encodeClassifierList(list, document));
        node.appendChild(listNode);
      });
    }

    if (object.validTime) {
      object.validTime.forEach(time => {
        let validTimeNode = document.createElementNS(Namespaces.SML, 'sml:validTime');
        validTimeNode.appendChild(this.gmlEncoder.encodeTime(time, document));
        node.appendChild(validTimeNode);
      });
    }

    if (object.securityConstraints) {
      throw new Error('Currently not supported');
    }

    if (object.legalConstraints) {
      object.legalConstraints.forEach(legalConstraints => {
        let legalConstraintsNode = document.createElementNS(Namespaces.SML, 'sml:legalConstraints');
        legalConstraintsNode.appendChild(this.isoEncoder.encodeLegalConstraints(legalConstraints, document));
        node.appendChild(legalConstraintsNode);
      });
    }

    if (object.characteristics) {
      object.characteristics.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:characteristics');
        listNode.appendChild(this.encodeCharacteristicList(list, document));
        if (list.name) {
          listNode.setAttribute('name', list.name);
        }
        node.appendChild(listNode);
      });
    }

    if (object.capabilities) {
      object.capabilities.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:capabilities');
        listNode.appendChild(this.encodeCapabilityList(list, document));
        if (list.name) {
          listNode.setAttribute('name', list.name);
        }
        node.appendChild(listNode);
      });
    }

    if (object.contacts) {
      object.contacts.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:contacts');
        listNode.appendChild(this.encodeContactList(list, document));
        node.appendChild(listNode);
      });
    }

    if (object.documentation) {
      object.documentation.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:documentation');
        listNode.appendChild(this.encodeDocumentList(list, document));
        node.appendChild(listNode);
      });
    }

    if (object.history) {
      object.history.forEach(list => {
        let listNode = document.createElementNS(Namespaces.SML, 'sml:history');
        listNode.appendChild(this.encodeEventList(list, document));
        node.appendChild(listNode);
      });
    }
  }

  public encodeAbstractProcess(node: Element, object: AbstractProcess, document: Document): void {

    this.encodeDescribedObject(node, object, document);

    if (object.typeOf) {
      let typeOfNode = document.createElementNS(Namespaces.SML, 'sml:typeOf');
      typeOfNode.setAttributeNS(Namespaces.XLINK, 'xlink:href', object.typeOf);
      node.appendChild(typeOfNode);
    }

    if (object.configuration) {
      let configurationNode = document.createElementNS(Namespaces.SML, 'sml:configuration');
      configurationNode.appendChild(this.encodeSettings(object.configuration, document));
      node.appendChild(configurationNode);
    }

    if (object.featureOfInterest) {
      let featureOfInterestNode = document.createElementNS(Namespaces.SML, 'sml:featuresOfInterest');
      featureOfInterestNode.appendChild(this.encodeFeatureList(object.featureOfInterest, document));
      node.appendChild(featureOfInterestNode);
    }

    if (object.inputs) {
      let inputsNode = document.createElementNS(Namespaces.SML, 'sml:inputs');
      inputsNode.appendChild(this.encodeInputList(object.inputs, document));
      node.appendChild(inputsNode);
    }

    if (object.outputs) {
      let outputsNode = document.createElementNS(Namespaces.SML, 'sml:outputs');
      outputsNode.appendChild(this.encodeOutputList(object.outputs, document));
      node.appendChild(outputsNode);
    }

    if (object.parameters) {
      let parametersNode = document.createElementNS(Namespaces.SML, 'sml:parameters');
      parametersNode.appendChild(this.encodeParameterList(object.parameters, document));
      node.appendChild(parametersNode);
    }

    if (object.modes) {
      object.modes.forEach(modes => {
        let modesNode = document.createElementNS(Namespaces.SML, 'sml:modes');
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
    let node = document.createElementNS(Namespaces.SML, 'sml:ModeChoice');

    this.sweEncoder.encodeAbstractSwe(node, object, document);

    if (object.modes) {
      object.modes.forEach(mode => {
        let modeNode = document.createElementNS(Namespaces.SML, 'sml:mode');
        modeNode.appendChild(this.encodeMode(mode, document));
        node.appendChild(modeNode);
      });
    }

    return node;
  }

  public encodeMode(object: Mode, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:Mode');
    this.encodeDescribedObject(node, object, document);

    if (object.configuration) {
      let configurationNode = document.createElementNS(Namespaces.SML, 'sml:configuration');
      configurationNode.appendChild(this.encodeSettings(object.configuration, document));
      node.appendChild(configurationNode);
    }

    return node;
  }

  public encodeSettings(object: Settings, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:Settings');
    this.sweEncoder.encodeAbstractSwe(node, object, document);

    if (object.setValue) {

      object.setValue.forEach(setting => {
        let valueNode = document.createElementNS(Namespaces.SML, 'sml:setValue');
        if (setting.ref) {
          valueNode.setAttribute('ref', setting.ref);
        }
        if (setting.value != null) {
          let value = setting.value;
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
      object.setArrayValue.forEach(setting => {
        let arrayValueNode = document.createElementNS(Namespaces.SML, 'sml:setArrayValue');
        if (setting.ref) {
          arrayValueNode.setAttribute('ref', setting.ref);
        }

        if (setting.encoding) {
          let encodingNode = document.createElementNS(Namespaces.SML, 'sml:encoding');
          encodingNode.appendChild(this.sweEncoder.encodeAbstractEncoding(setting.encoding, document));
          arrayValueNode.appendChild(encodingNode);
        }

        if (setting.value) {
          let valueNode = document.createElementNS(Namespaces.SML, 'sml:value');
          valueNode.textContent = setting.value.toString();
          arrayValueNode.appendChild(valueNode);
        }
        node.appendChild(arrayValueNode);
      });
    }

    if (object.setConstraint) {
      object.setConstraint.forEach(setting => {
        let constraintNode = document.createElementNS(Namespaces.SML, 'sml:setConstraint');
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
      object.setMode.forEach(setting => {
        let modeNode = document.createElementNS(Namespaces.SML, 'sml:setMode');
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
      object.setStatus.forEach(setting => {
        let statusNode = document.createElementNS(Namespaces.SML, 'sml:setStatus');
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
    let node = document.createElementNS(Namespaces.SML, 'sml:FeatureList');

    this.encodeAbstractMetadataList(node, object, document);

    if (object.features) {
      object.features.forEach(feature => {
        let featureNode = document.createElementNS(Namespaces.SML, 'sml:feature');
        featureNode.appendChild(this.gmlEncoder.encodeFeature(feature, document));
        node.appendChild(featureNode);
      });
    }

    return node;
  }

  public encodeInputList(object: InputList, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:InputList');
    this.sweEncoder.encodeAbstractSwe(node, object, document);

    if (object.inputs) {
      object.inputs.forEach(input => {
        let inputNode = document.createElementNS(Namespaces.SML, 'sml:input');
        this.encodeInputOrOutputOrParameter(inputNode, input, document);
        node.appendChild(inputNode);
      });
    }

    return node;
  }

  public encodeOutputList(object: OutputList, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:OutputList');
    this.sweEncoder.encodeAbstractSwe(node, object, document);

    if (object.outputs) {
      object.outputs.forEach(input => {
        let outputNode = document.createElementNS(Namespaces.SML, 'sml:output');
        this.encodeInputOrOutputOrParameter(outputNode, input, document);
        node.appendChild(outputNode);
      });
    }

    return node;
  }

  public encodeParameterList(object: ParameterList, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:ParameterList');
    this.sweEncoder.encodeAbstractSwe(node, object, document);

    if (object.parameters) {
      object.parameters.forEach(parameter => {
        let parameterNode = document.createElementNS(Namespaces.SML, 'sml:parameter');
        this.encodeInputOrOutputOrParameter(parameterNode, parameter, document);
        node.appendChild(parameterNode);
      });
    }

    return node;
  }

  public encodeDataInterface(object: DataInterface, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:DataInterface');

    this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);


    if (object.data) {
      let dataNode = document.createElementNS(Namespaces.SML, 'sml:data');
      dataNode.appendChild(this.sweEncoder.encodeDataStream(object.data, document));
      node.appendChild(dataNode);
    }

    if (object.interfaceParameters) {
      let interfaceParametersNode = document.createElementNS(Namespaces.SML, 'sml:interfaceParameters');
      interfaceParametersNode.appendChild(this.sweEncoder.encodeDataRecord(object.interfaceParameters, document));
      node.appendChild(interfaceParametersNode);
    }

    return node;
  }

  public encodeObservableProperty(object: ObservableProperty, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:ObservableProperty');

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

    function encodeInputOrOutputOrParameterValue(
      value: SweDataComponent | ObservableProperty | DataInterface): Node {

      if (value instanceof ObservableProperty) {
        return this.encodeObservableProperty(value, document);
      } else if (value instanceof DataInterface) {
        return this.encodeDataInterface(value, document);
      } else {
        return this.sweEncoder.encodeDataComponent(value, document);
      }
    }

    if (object.value) {
      node.appendChild(encodeInputOrOutputOrParameterValue(object.value));
    }
  }

  public encodeSimpleProcess(object: SimpleProcess, document: Document, node?: Element): Node {
    if (!node) {
      node = document.createElementNS(Namespaces.SML, 'sml:SimpleProcess');
    }
    this.encodeAbstractProcess(node, object, document);
    this.encodeProcessMethodProcess(node, object, document);

    return node;
  }

  public encodeProcessMethod(object: ProcessMethod, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:ProcessMethod');
    this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);

    if (object.algorithm) {
      object.algorithm.forEach(algorithm => {
        let algorithmNode = document.createElementNS(Namespaces.SML, 'sml:algorithm');
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
      node = document.createElementNS(Namespaces.SML, 'sml:AggregateProcess');
    }
    this.encodeAbstractProcess(node, object, document);
    this.encodeAggregatingProcess(node, object, document);

    return node;
  }

  public encodeConnectionList(object: ConnectionList, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:ConnectionList');
    this.sweEncoder.encodeAbstractSwe(node, object, document);

    if (object.connections) {
      object.connections.forEach(connection => {
        let connectionNode = document.createElementNS(Namespaces.SML, 'sml:connection');
        connectionNode.appendChild(this.encodeConnection(connection, document));
        node.appendChild(connectionNode);
      });
    }

    return node;
  }

  public encodeConnection(object: Connection, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:Link');
    if (object.source) {
      let sourceNode = document.createElementNS(Namespaces.SML, 'sml:source');
      sourceNode.setAttribute('ref', object.source);
      node.appendChild(node);
    }
    if (object.destination) {
      let destinationNode = document.createElementNS(Namespaces.SML, 'sml:destination');
      destinationNode.setAttribute('ref', object.destination);
      node.appendChild(node);
    }
    return node;
  }

  public encodeComponentList(object: ComponentList, document: Document): Node {
    let node = document.createElementNS(Namespaces.SML, 'sml:ComponentList');
    this.sweEncoder.encodeAbstractSwe(node, object, document);

    if (object.components) {
      object.components.forEach(component => {
        let componentNode = document.createElementNS(Namespaces.SML, 'sml:component');
        if (component.name) {
          componentNode.setAttribute('name', component.name);
        }
        if (component.href) {
          componentNode.setAttributeNS(Namespaces.XLINK, 'xlink:href', component.href);
        }
        node.appendChild(componentNode);
      });
    }
    return node;
  }

  public encodeAbstractPhysicalProcess(node: Element, object: AbstractPhysicalProcess, document: Document): void {

    this.encodeAbstractProcess(node, object, document);

    if (object.attachedTo) {
      let attachedToNode = document.createElementNS(Namespaces.SML, 'sml:attachedTo');
      attachedToNode.setAttributeNS(Namespaces.XLINK, 'xlink:href', object.attachedTo);
      node.appendChild(attachedToNode);
    }

    if (object.localReferenceFrame) {
      object.localReferenceFrame.forEach(frame => {
        let frameNode = document.createElementNS(Namespaces.SML, 'sml:localReferenceFrame');
        frameNode.appendChild(this.encodeSpatialFrame(frame, document));
        node.appendChild(frameNode);
      });
    }

    if (object.localTimeFrame) {
      object.localTimeFrame.forEach(frame => {
        let frameNode = document.createElementNS(Namespaces.SML, 'sml:localTimeFrame');
        frameNode.appendChild(this.encodeTemporalFrame(frame, document));
        node.appendChild(frameNode);
      });
    }

    if (object.position) {
      object.position.forEach(position => {
        let positionNode = document.createElementNS(Namespaces.SML, 'sml:position');
        positionNode.appendChild(this.encodePosition(position, document));
        node.appendChild(positionNode);
      });
    }

    if (object.timePosition) {
      object.timePosition.forEach(position => {
        let positionNode = document.createElementNS(Namespaces.SML, 'sml:timePosition');
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
    let node = document.createElementNS(Namespaces.SML, 'sml:SpatialFrame');
    this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);

    if (object.origin) {
      let originNode = document.createElementNS(Namespaces.SML, 'sml:origin');
      originNode.textContent = object.origin;
      node.appendChild(originNode);
    }

    if (object.axis) {
      object.axis.forEach(axis => {
        let axisNode = document.createElementNS(Namespaces.SML, 'sml:axis');
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
    let node = document.createElementNS(Namespaces.SML, 'sml:TemporalFrame');
    this.sweEncoder.encodeAbstractSweIdentifiable(node, object, document);

    if (object.origin) {
      let originNode = document.createElementNS(Namespaces.SML, 'sml:origin');
      originNode.textContent = object.origin;
      node.appendChild(originNode);
    }

    return node;
  }

  public encodePhysicalSystem(object: PhysicalSystem, document: Document, node?: Element): Node {
    if (!node) {
      node = document.createElementNS(Namespaces.SML, 'sml:PhysicalSystem');
    }

    this.encodeAbstractPhysicalProcess(node, object, document);
    this.encodeAggregatingProcess(node, object, document);

    return node;
  }

  public encodeAggregatingProcess(node: Element, object: AggregatingProcess, document: Document): void {
    if (object.components) {
      let componentsNode = document.createElementNS(Namespaces.SML, 'sml:components');
      componentsNode.appendChild(this.encodeComponentList(object.components, document));
      node.appendChild(componentsNode);
    }

    if (object.connections) {
      let connectionsNode = document.createElementNS(Namespaces.SML, 'sml:connections');
      connectionsNode.appendChild(this.encodeConnectionList(object.connections, document));
      node.appendChild(connectionsNode);
    }
  }

  public encodeProcessMethodProcess(node: Element, object: ProcessMethodProcess, document: Document): void {

    if (object.method) {
      let methodNode = document.createElementNS(Namespaces.SML, 'sml:method');
      methodNode.appendChild(this.encodeProcessMethod(object.method, document));
      node.appendChild(methodNode);
    }
  }

  public encodePhysicalComponent(object: PhysicalComponent, document: Document, node?: Element): Node {
    if (!node) {
      node = document.createElementNS(Namespaces.SML, 'sml:PhysicalComponent');
    }
    this.encodeAbstractPhysicalProcess(node, object, document);
    this.encodeProcessMethodProcess(node, object, document);
    return node;
  }
}
