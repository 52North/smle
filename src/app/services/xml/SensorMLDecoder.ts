import { AbstractAlgorithm } from '../../model/sml/AbstractAlgorithm';
import { AbstractMetadataList } from '../../model/sml/AbstractMetadataList';
import { AbstractModes } from '../../model/sml/AbstractModes';
import { AbstractNamedMetadataList } from '../../model/sml/AbstractNamedMetadataList';
import { AbstractPhysicalProcess } from '../../model/sml/AbstractPhysicalProcess';
import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { AbstractSetting } from '../../model/sml/AbstractSetting';
import { AggregateProcess } from '../../model/sml/AggregateProcess';
import { AggregatingProcess } from '../../model/sml/AggregatingProcess';
import { ArrayValueSetting } from '../../model/sml/ArrayValueSetting';
import { Axis } from '../../model/sml/Axis';
import { Capability } from '../../model/sml/Capability';
import { CapabilityList } from '../../model/sml/CapabilityList';
import { Characteristic } from '../../model/sml/Characteristic';
import { CharacteristicList } from '../../model/sml/CharacteristicList';
import { ClassifierList } from '../../model/sml/ClassifierList';
import { ComponentList } from '../../model/sml/ComponentList';
import { Component } from '../../model/sml/Component';
import { Connection } from '../../model/sml/Connection';
import { ConnectionList } from '../../model/sml/ConnectionList';
import { ConstraintSetting } from '../../model/sml/ConstraintSetting';
import { ContactList } from '../../model/sml/ContactList';
import { DataInterface } from '../../model/sml/DataInterface';
import { DescribedObject } from '../../model/sml/DescribedObject';
import { DocumentList } from '../../model/sml/DocumentList';
import { Event } from '../../model/sml/Event';
import { EventList } from '../../model/sml/EventList';
import { FeatureList } from '../../model/sml/FeatureList';
import { AbstractFeature } from '../../model/gml';
import { GmlDecoder } from './GmlDecoder';
import { IdentifierList } from '../../model/sml/IdentifierList';
import { Input } from '../../model/sml/Input';
import { InputList } from '../../model/sml/InputList';
import { InputOrOutputOrParameter } from '../../model/sml/InputOrOutputOrParameter';
import { IsoDecoder } from './IsoDecoder';
import { KeywordList } from '../../model/sml/KeywordList';
import { Mode } from '../../model/sml/Mode';
import { ModeChoice } from '../../model/sml/ModeChoice';
import { ModeSetting } from '../../model/sml/ModeSetting';
import { NamedSweDataComponent } from '../../model/sml/NamedSweDataComponent';
import { Namespaces } from './Namespaces';
import { ObservableProperty } from '../../model/sml/ObservableProperty';
import { Output } from '../../model/sml/Output';
import { OutputList } from '../../model/sml/OutputList';
import { Parameter } from '../../model/sml/Parameter';
import { ParameterList } from '../../model/sml/ParameterList';
import { PhysicalComponent } from '../../model/sml/PhysicalComponent';
import { PhysicalSystem } from '../../model/sml/PhysicalSystem';
import { Point } from '../../model/gml';
import { Position } from '../../model/sml/Position';
import { ProcessMethod } from '../../model/sml/ProcessMethod';
import { ProcessMethodProcess } from '../../model/sml/ProcessMethodProcess';
import { SensorMLNamespaceResolver } from './SensorMLNamespaceResolver';
import { Settings } from '../../model/sml/Settings';
import { SimpleProcess } from '../../model/sml/SimpleProcess';
import { SpatialFrame } from '../../model/sml/SpatialFrame';
import { StatusSetting } from '../../model/sml/StatusSetting';
import { SweDataArray } from '../../model/swe/SweDataArray';
import { SweDataComponent } from '../../model/swe/SweDataComponent';
import { SweDataRecord } from '../../model/swe/SweDataRecord';
import { SweDecoder } from './SweDecoder';
import { SweMatrix } from '../../model/swe/SweMatrix';
import { SweText } from '../../model/swe/SweText';
import { SweVector } from '../../model/swe/SweVector';
import { TemporalFrame } from '../../model/sml/TemporalFrame';
import { Term } from '../../model/sml/Term';
import { ValueSetting } from '../../model/sml/ValueSetting';
import { DecoderUtils } from './DecoderUtils';

export class SensorMLDecoder {

  private gmlDecoder = new GmlDecoder();
  private sweDecoder = new SweDecoder();
  private isoDecoder = new IsoDecoder();
  private utils = new DecoderUtils();

  public decodeDocument(elem: Element, process: AbstractProcess): void {
    if (process instanceof SimpleProcess) {
      this.decodeSimpleProcess(elem, process);
    } else if (process instanceof AggregateProcess) {
      this.decodeAggregateProcess(elem, process);
    } else if (process instanceof PhysicalSystem) {
      this.decodePhysicalSystem(elem, process);
    } else if (process instanceof PhysicalComponent) {
      this.decodePhysicalComponent(elem, process);
    } else {
      throw new Error('Unsupported process type');
    }
  }

  public decodeSimpleProcess(elem: Element, object: SimpleProcess): void {
    this.decodeAbstractProcess(elem, object);
    this.decodeProcessMethodProcess(elem, object);
  }

  public decodeAggregateProcess(elem: Element, object: AggregateProcess): void {
    this.decodeAbstractProcess(elem, object);
    this.decodeAggregatingProcess(elem, object);
  }

  public decodePhysicalSystem(elem: Element, object: PhysicalSystem): void {
    this.decodeAbstractPhysicalProcess(elem, object);
    this.decodeAggregatingProcess(elem, object);
  }

  public decodePhysicalComponent(elem: Element, object: PhysicalComponent): void {
    this.decodeAbstractPhysicalProcess(elem, object);
    this.decodeProcessMethodProcess(elem, object);
  }

  public decodeAbstractPhysicalProcess(elem: Element, object: AbstractPhysicalProcess): void {
    this.decodeAbstractProcess(elem, object);

    object.attachedTo = this.utils.getAttributeOfElement(elem, 'attachedTo', Namespaces.SML, 'href', Namespaces.XLINK);

    object.localReferenceFrame = this.utils.getDecodedList(
      elem,
      'localReferenceFrame',
      Namespaces.SML,
      (lrf) => this.decodeSpatialFrame(lrf));

    object.localTimeFrame = this.utils.getDecodedList(
      elem,
      'localTimeFrame',
      Namespaces.SML,
      (ltf) => this.decodeTemporalFrame(ltf));

    object.position = this.utils.getDecodedList(elem, 'position', Namespaces.SML, (pos) => this.decodePosition(pos));

    object.timePosition = this.utils.getDecodedList(
      elem,
      'timePosition',
      Namespaces.SML,
      (timePos) => this.sweDecoder.decodeTime(timePos));
  }

  public decodeSpatialFrame(elem: Element): SpatialFrame {
    let spatialFrame = new SpatialFrame();

    let spatialFrameElem = this.utils.getElement(elem, 'SpatialFrame', Namespaces.SML);
    if (spatialFrameElem != null) {
      this.sweDecoder.decodeAbstractSweIdentifiable(spatialFrameElem, spatialFrame);

      let originElem = this.utils.getElement(spatialFrameElem, 'origin', Namespaces.SML);
      if (originElem != null) {
        spatialFrame.origin = originElem.textContent.trim();
      }

      spatialFrame.axis = this.utils.getDecodedList<Axis>(
        spatialFrameElem,
        'axis',
        Namespaces.SML,
        (axisNode) => this.decodeAxis(axisNode));

    }
    return spatialFrame;
  }

  public decodeTemporalFrame(elem: Element): TemporalFrame {
    let temporalFrame = new TemporalFrame();

    let temporalFrameElem = this.utils.getElement(elem, 'TemporalFrame', Namespaces.SML);
    if (temporalFrameElem != null) {
      this.sweDecoder.decodeAbstractSweIdentifiable(temporalFrameElem, temporalFrame);

      let originElem = this.utils.getElement(temporalFrameElem, 'origin', Namespaces.SML);
      if (originElem != null) {
        temporalFrame.origin = originElem.textContent.trim();
      }
    }
    return temporalFrame;
  }

  public decodeAxis(elem: Element): Axis {
    let axis = new Axis();

    let name = elem.getAttribute('name');
    if (name != null) {
      axis.name = name;
    }

    let description = elem.textContent.trim();
    if (description != null) {
      axis.description = description;
    }
    return axis;
  }

  public decodePosition(elem: Element): Position {
    let point = this.gmlDecoder.decodePoint(elem);
    if (point != null) return point;
    let text = this.sweDecoder.decodeText(elem);
    if (text != null) return text;
    let vector = this.sweDecoder.decodeVector(elem);
    if (vector != null) return vector;
    let dataRecord = this.sweDecoder.decodeDataRecord(elem);
    if (dataRecord != null) return dataRecord;
    let matrix = this.sweDecoder.decodeMatrix(elem);
    if (matrix != null) return matrix;
    let dataArray = this.sweDecoder.decodeDataArray(elem);
    if (dataArray != null) return dataArray;
    // TODO decode if process
  }

  public decodeAggregatingProcess(elem: Element, object: AggregatingProcess): void {
    let componentsElem = this.utils.getElement(elem, 'components', Namespaces.SML);
    if (componentsElem != null) object.components = this.decodeComponentList(componentsElem);

    let connectionsElem = this.utils.getElement(elem, 'connections', Namespaces.SML);
    if (connectionsElem != null) object.connections = this.decodeConnectionList(connectionsElem);
  }

  public decodeAbstractProcess(elem: Element, object: AbstractProcess): void {
    this.decodeDescribedObject(elem, object);

    object.typeOf = this.utils.getAttributeOfElement(elem, 'typeOf', Namespaces.SML, 'href', Namespaces.XLINK);

    let settings = this.utils.getElement(elem, 'configuration', Namespaces.SML);
    if (settings != null) object.configuration = this.decodeSettings(settings);

    let features = this.utils.getElement(elem, 'featuresOfInterest', Namespaces.SML);
    if (features != null) object.featureOfInterest = this.decodeFeatureList(features);

    let inputsElem = this.utils.getElement(elem, 'inputs', Namespaces.SML);
    if (inputsElem != null) object.inputs = this.decodeInputList(inputsElem);

    let outputsElem = this.utils.getElement(elem, 'outputs', Namespaces.SML);
    if (outputsElem != null) object.outputs = this.decodeOutputList(outputsElem);

    let parameters = this.utils.getElement(elem, 'parameters', Namespaces.SML);
    if (parameters != null) object.parameters = this.decodeParameterList(parameters);

    object.modes = this.utils.getDecodedList(elem, 'modes', Namespaces.SML, (mode) => this.decodeModes(mode));

    if (elem.hasAttribute('definition')) {
      object.definition = elem.getAttribute('definition');
    }
  }

  public decodeFeatureList(elem: Element): FeatureList {
    let featureListElem = this.utils.getElement(elem, 'FeatureList', Namespaces.SML);
    if (featureListElem != null) {
      let featureList = new FeatureList();
      // TODO implement
      //      this.decodeAbstractMetadataList(featureListElem, featureList);
      //      featureList.features = this.utils.getDecodedList(
      //      featureListElem,
      //      'feature',
      //      Namespaces.SML,
      //      (feature) => this.gmlDecoder.decodeAbstractFeature(feature));
      return featureList;
    }
  }

  public decodeModes(elem: Element): AbstractModes {
    let modeChoice = this.decodeModeChoice(elem);
    if (modeChoice != null) return modeChoice;
  }

  public decodeModeChoice(elem: Element): ModeChoice {
    let modeChoiceElem = this.utils.getElement(elem, 'ModeChoice', Namespaces.SML);
    if (modeChoiceElem != null) {
      let modeChoice = new ModeChoice();

      this.sweDecoder.decodeAbstractSwe(modeChoiceElem, modeChoice);

      modeChoice.modes = this.utils.getDecodedList(
        modeChoiceElem,
        'mode',
        Namespaces.SML,
        (mode) => this.decodeMode(mode));
      return modeChoice;
    }
  }

  public decodeMode(elem: Element): Mode {
    let modeElem = this.utils.getElement(elem, 'Mode', Namespaces.SML);
    if (modeElem != null) {
      let mode = new Mode();

      this.decodeDescribedObject(modeElem, mode);

      let settingsElem = this.utils.getElement(modeElem, 'configuration', Namespaces.SML);
      if (settingsElem != null) {
        mode.configuration = this.decodeSettings(settingsElem);
      }

      return mode;
    }
  }

  public decodeDescribedObject(elem: Element, describedObject: DescribedObject): void {
    this.gmlDecoder.decodeAbstractFeature(elem, describedObject);

    describedObject.keywords = this.utils.getDecodedList(
      elem,
      'keywords',
      Namespaces.SML,
      (keywords) => this.decodeKeywordList(keywords));

    describedObject.identification = this.utils.getDecodedList(
      elem,
      'identification',
      Namespaces.SML,
      (identifications) => this.decodeIdentifierList(identifications));

    describedObject.classification = this.utils.getDecodedList(
      elem,
      'classification',
      Namespaces.SML,
      (classifier) => this.decodeClassifierList(classifier));

    describedObject.validTime = this.utils.getDecodedList(
      elem,
      'validTime',
      Namespaces.SML,
      (validTime) => this.gmlDecoder.decodeTime(validTime));

    let secConstElem = this.utils.getElement(elem, 'securityConstraints', Namespaces.SML);
    if (secConstElem != null) {
      throw new Error('Security Constraints currently not supported');
    }

    describedObject.legalConstraints = this.utils.getDecodedList(
      elem,
      'legalConstraints',
      Namespaces.SML,
      (legalConst) => this.isoDecoder.decodeLegalConstraints(legalConst));

    describedObject.characteristics = this.utils.getDecodedList(
      elem,
      'characteristics',
      Namespaces.SML,
      (characteristic) => this.decodeCharacteristicList(characteristic));

    describedObject.capabilities = this.utils.getDecodedList(
      elem,
      'capabilities',
      Namespaces.SML,
      (capa) => this.decodeCapabilitiesList(capa));

    describedObject.contacts = this.utils.getDecodedList(
      elem,
      'contacts',
      Namespaces.SML,
      (contactList) => this.decodeContactList(contactList));

    describedObject.documentation = this.utils.getDecodedList(
      elem,
      'documentation',
      Namespaces.SML,
      (documentation) => this.decodeDocumentList(documentation));

    describedObject.history = this.utils.getDecodedList(
      elem,
      'history',
      Namespaces.SML,
      (history) => this.decodeEventList(history));
  }

  public decodeComponentList(elem: Element): ComponentList {
    let componentListElem = this.utils.getElement(elem, 'ComponentList', Namespaces.SML);
    if (componentListElem != null) {
      let compList = new ComponentList();

      this.sweDecoder.decodeAbstractSwe(componentListElem, compList);

      compList.components = this.utils.getDecodedList(
        componentListElem,
        'component',
        Namespaces.SML,
        (component) => this.decodeComponent(component));

      return compList;
    }
  }

  public decodeComponent(elem: Element): Component {
    let component = new Component();

    if (elem.hasAttribute('name')) {
      component.name = elem.getAttribute('name');
    }

    if (elem.hasAttributeNS(Namespaces.XLINK, 'href')) {
      component.href = elem.getAttributeNS(Namespaces.XLINK, 'href');
    }

    if (elem.hasAttributeNS(Namespaces.XLINK, 'title')) {
      component.title = elem.getAttributeNS(Namespaces.XLINK, 'title');
    }

    return component;
  }

  public decodeConnectionList(elem: Element): ConnectionList {
    let connectionListElem = this.utils.getElement(elem, 'ConnectionList', Namespaces.SML);
    if (connectionListElem != null) {
      let connList = new ConnectionList();
      this.sweDecoder.decodeAbstractSwe(connectionListElem, connList);

      connList.connections = this.utils.getDecodedList(
        connectionListElem,
        'connection',
        Namespaces.SML,
        (connection) => this.decodeConnection(connection));

      return connList;
    }
  }

  public decodeConnection(elem: Element): Connection {
    let connectionElem = this.utils.getElement(elem, 'Link', Namespaces.SML);
    if (connectionElem != null) {
      let conn = new Connection();
      conn.source = this.utils.getAttributeOfElement(connectionElem, 'source', Namespaces.SML, 'ref', '');
      conn.destination = this.utils.getAttributeOfElement(connectionElem, 'destination', Namespaces.SML, 'ref', '');
      return conn;
    }
  }

  public decodeContactList(elem: Element): ContactList {
    let contactListElem = this.utils.getElement(elem, 'ContactList', Namespaces.SML);
    if (contactListElem != null) {
      let contactList = new ContactList();
      this.decodeAbstractMetadataList(contactListElem, contactList);

      contactList.contacts = this.utils.getDecodedList(
        contactListElem,
        'contact',
        Namespaces.SML,
        (contact) => this.isoDecoder.decodeResponsibleParty(contact));
      return contactList;
    }
  }

  public decodeInputList(elem: Element): InputList {
    let inputListElem = this.utils.getElement(elem, 'InputList', Namespaces.SML);
    if (inputListElem != null) {
      let inputList = new InputList();

      this.sweDecoder.decodeAbstractSwe(inputListElem, inputList);

      inputList.inputs = this.utils.getDecodedList(
        inputListElem,
        'input',
        Namespaces.SML,
        (input) => this.decodeInputOrOutputOrParameter(input));

      return inputList;
    }
  }

  public decodeOutputList(elem: Element): OutputList {
    let outputListElem = this.utils.getElement(elem, 'OutputList', Namespaces.SML);
    if (outputListElem != null) {
      let outputList = new OutputList();

      this.sweDecoder.decodeAbstractSwe(outputListElem, outputList);

      outputList.outputs = this.utils.getDecodedList(
        outputListElem,
        'output',
        Namespaces.SML,
        (output) => this.decodeInputOrOutputOrParameter(output));

      return outputList;
    }
  }

  public decodeParameterList(elem: Element): ParameterList {
    let parameterListElem = this.utils.getElement(elem, 'ParameterList', Namespaces.SML);
    if (parameterListElem != null) {
      let parameterList = new ParameterList();
      this.sweDecoder.decodeAbstractSwe(parameterListElem, parameterList);

      parameterList.parameters = this.utils.getDecodedList(
        parameterListElem,
        'parameter',
        Namespaces.SML,
        (param) => this.decodeInputOrOutputOrParameter(param));

      return parameterList;
    }
  }

  public decodeInputOrOutputOrParameter(elem: Element): InputOrOutputOrParameter {
    let param = new InputOrOutputOrParameter();

    if (elem.hasAttribute('name')) {
      param.name = elem.getAttribute('name');
    }

    if (elem.firstElementChild != null) {
      let observableProperty = this.decodeObservableProperty(elem);
      if (observableProperty != null) param.value = observableProperty;

      let dataInterface = this.decodeDataInterface(elem);
      if (dataInterface != null) param.value = dataInterface;

      let dataComponent = this.sweDecoder.decodeDataComponent(elem);
      if (dataComponent != null) param.value = dataComponent;
    }
    return param;
  }

  public decodeObservableProperty(elem: Element): ObservableProperty {
    let obsPropElem = this.utils.getElement(elem, 'ObservableProperty', Namespaces.SML);
    if (obsPropElem != null) {
      let obsProp = new ObservableProperty();

      this.sweDecoder.decodeAbstractSweIdentifiable(obsPropElem, obsProp);

      if (obsPropElem.hasAttribute('definition')) {
        obsProp.definition = obsPropElem.getAttribute('definition');
      }
      return obsProp;
    }
  }

  public decodeDataInterface(elem: Element): DataInterface {
    let dataInterfaceElem = this.utils.getElement(elem, 'DataInterface', Namespaces.SML);

    if (dataInterfaceElem != null) {
      let dataInterface = new DataInterface();

      this.sweDecoder.decodeAbstractSweIdentifiable(dataInterfaceElem, dataInterface);

      let dataElem = this.utils.getElement(dataInterfaceElem, 'data', Namespaces.SML);
      if (dataElem != null) {
        dataInterface.data = this.sweDecoder.decodeDataStream(dataElem);
      }

      let interfaceParams = this.utils.getElement(dataInterfaceElem, 'interfaceParameters', Namespaces.SML);
      if (interfaceParams != null) {
        dataInterface.interfaceParameters = this.sweDecoder.decodeDataRecord(interfaceParams);
      }

      return dataInterface;
    }
  }

  public decodeCharacteristicList(elem: Element): CharacteristicList {
    let characteristicListElem = this.utils.getElement(elem, 'CharacteristicList', Namespaces.SML);
    if (characteristicListElem != null) {
      let characteristicList = new CharacteristicList();

      this.decodeAbstractNamedMetadataList(elem, characteristicList);

      characteristicList.characteristics = this.utils.getDecodedList(
        characteristicListElem,
        'characteristic',
        Namespaces.SML,
        (char) => this.decodeNamedSweDataComponent(char));

      return characteristicList;
    }
  }

  public decodeCapabilitiesList(elem: Element): CapabilityList {
    let capabilitiesListElem = this.utils.getElement(elem, 'CapabilityList', Namespaces.SML);
    if (capabilitiesListElem != null) {
      let capabilitiesList = new CapabilityList();

      this.decodeAbstractNamedMetadataList(elem, capabilitiesList);

      capabilitiesList.capabilities = this.utils.getDecodedList(
        capabilitiesListElem,
        'capability',
        Namespaces.SML,
        (char) => this.decodeNamedSweDataComponent(char));

      return capabilitiesList;
    }
  }

  public decodeNamedSweDataComponent(elem: Element): NamedSweDataComponent {
    if (elem != null) {
      let comp = new NamedSweDataComponent();

      if (elem.hasAttribute('name')) {
        comp.name = elem.getAttribute('name');
      }

      if (elem.firstElementChild != null) {
        comp.component = this.sweDecoder.decodeDataComponent(elem.firstElementChild);
      }

      return comp;
    }
  }

  public decodeKeywordList(elem: Element): KeywordList {
    let keywordListElem = this.utils.getElement(elem, 'KeywordList', Namespaces.SML);
    if (keywordListElem != null) {
      let keywordList = new KeywordList();
      this.decodeAbstractMetadataList(keywordListElem, keywordList);

      keywordList.codeSpace = this.utils.getAttributeOfElement(
        keywordListElem,
        'codeSpace',
        Namespaces.SML,
        'href',
        Namespaces.XLINK);

      this.utils.getDecodedList(
        keywordListElem,
        'keyword',
        Namespaces.SML,
        (keywords) => keywordList.keywords.push(keywords.textContent));
      return keywordList;
    }
  }

  public decodeIdentifierList(elem: Element): IdentifierList {
    let identifierListElem = this.utils.getElement(elem, 'IdentifierList', Namespaces.SML);
    if (identifierListElem != null) {
      let identifierList = new IdentifierList();
      this.decodeAbstractMetadataList(identifierListElem, identifierList);
      identifierList.identifiers = this.utils.getDecodedList(
        identifierListElem,
        'identifier',
        Namespaces.SML,
        (identifier) => this.decodeTerm(identifier));
      return identifierList;
    }
  }

  public decodeClassifierList(elem: Element): ClassifierList {
    let classifierListElem = this.utils.getElement(elem, 'ClassifierList', Namespaces.SML);
    if (classifierListElem != null) {
      let classifierList = new ClassifierList();
      this.decodeAbstractMetadataList(classifierListElem, classifierList);
      classifierList.classifiers = this.utils.getDecodedList(
        classifierListElem,
        'classifier',
        Namespaces.SML,
        (classifier) => this.decodeTerm(classifier));
      return classifierList;
    }
  }

  public decodeEventList(elem: Element): EventList {
    let eventListElem = this.utils.getElement(elem, 'EventList', Namespaces.SML);
    if (eventListElem != null) {
      let eventList = new EventList();
      this.decodeAbstractMetadataList(eventListElem, eventList);
      eventList.events = this.utils.getDecodedList(
        eventListElem,
        'event',
        Namespaces.SML,
        (event) => this.decodeEvent(event));
      return eventList;
    }
  }

  public decodeDocumentList(elem: Element): DocumentList {
    let documentListElem = this.utils.getElement(elem, 'DocumentList', Namespaces.SML);
    if (documentListElem != null) {
      let documentList = new DocumentList();
      this.decodeAbstractMetadataList(documentListElem, documentList);
      documentList.documents = this.utils.getDecodedList(
        documentListElem,
        'document',
        Namespaces.SML,
        (doc) => this.isoDecoder.decodeOnlineResource(doc));
      return documentList;
    }
  }

  public decodeProcessMethodProcess(elem: Element, object: ProcessMethodProcess): void {
    let methodElem = this.utils.getElement(elem, 'method', Namespaces.SML);
    if (methodElem != null) {
      object.method = this.decodeProcessMethod(methodElem);
    }
  }

  public decodeProcessMethod(elem: Element): ProcessMethod {
    let processMethodElem = this.utils.getElement(elem, 'ProcessMethod', Namespaces.SML);
    if (processMethodElem != null) {
      let processMethod = new ProcessMethod();
      this.sweDecoder.decodeAbstractSweIdentifiable(processMethodElem, processMethod);
      processMethod.algorithm = this.utils.getDecodedList(
        processMethodElem,
        'algorithm',
        Namespaces.SML,
        (algorithm) => this.decodeAlgorithm(algorithm));
      return processMethod;
    }
  }

  public decodeAlgorithm(elem: Element): AbstractAlgorithm {
    // TODO implement algorithm
    throw new Error('not yet implemented');
  }

  public decodeAbstractMetadataList(elem: Element, object: AbstractMetadataList): void {
    this.sweDecoder.decodeAbstractSweIdentifiable(elem, object);
    if (elem.hasAttribute('definition')) {
      object.definition = elem.getAttribute('definition');
    }
  }

  public decodeAbstractNamedMetadataList(elem: Element, object: AbstractNamedMetadataList): void {
    if (elem.hasAttribute('name')) {
      object.name = elem.getAttribute('name');
    }
  }

  public decodeEvent(elem: Element): Event {
    let eventElem = this.utils.getElement(elem, 'Event', Namespaces.SML);
    if (eventElem != null) {
      let event = new Event();

      this.sweDecoder.decodeAbstractSweIdentifiable(eventElem, event);

      event.identification = this.utils.getDecodedList(
        eventElem,
        'identification',
        Namespaces.SML,
        (identifier) => this.decodeIdentifierList(identifier));

      event.classification = this.utils.getDecodedList(eventElem,
        'classification',
        Namespaces.SML,
        (classification) => this.decodeClassifierList(classification));

      event.contacts = this.utils.getDecodedList(
        eventElem,
        'contacts',
        Namespaces.SML,
        (contacts) => this.decodeContactList(contacts));

      event.documentation = this.utils.getDecodedList(
        eventElem,
        'documentation',
        Namespaces.SML,
        (documentation) => this.decodeDocumentList(documentation));

      event.keywords = this.utils.getDecodedList(
        eventElem,
        'keywords',
        Namespaces.SML,
        (keyword) => this.decodeKeywordList(keyword));

      let timeElem = this.utils.getElement(eventElem, 'time', Namespaces.SML);
      if (timeElem != null) {
        event.time = this.gmlDecoder.decodeTime(timeElem);
      }

      let propertiesElem = this.utils.getElement(eventElem, 'property', Namespaces.SML);
      if (propertiesElem != null) {
        throw new Error('not implemented');
        //                event.properties = this.sweDecoder.decodeDataComponent(propertiesElem);
      }

      let configurationElem = this.utils.getElement(eventElem, 'configuration', Namespaces.SML);
      if (configurationElem != null) {
        event.configuration = this.decodeSettings(configurationElem);
      }

      return event;
    }
  }

  public decodeSettings(elem: Element): Settings {
    let settingsElem = this.utils.getElement(elem, 'Settings', Namespaces.SML);
    if (settingsElem != null) {
      let settings = new Settings();

      this.sweDecoder.decodeAbstractSwe(settingsElem, settings);

      settings.setValue = this.utils.getDecodedList(
        settingsElem,
        'setValue',
        Namespaces.SML,
        (val) => this.decodeSetValue(val));

      settings.setArrayValue = this.utils.getDecodedList(
        settingsElem,
        'setArrayValue',
        Namespaces.SML,
        (arr) => this.decodeSetArrayValue(arr));

      settings.setConstraint = this.utils.getDecodedList(
        settingsElem,
        'setConstraint',
        Namespaces.SML,
        (constraint) => this.decodeSetConstraint(constraint));

      settings.setMode = this.utils.getDecodedList(
        settingsElem,
        'setMode',
        Namespaces.SML,
        (mode) => this.decodeSetMode(mode));

      settings.setStatus = this.utils.getDecodedList(
        settingsElem,
        'setStatus',
        Namespaces.SML,
        (status) => this.decodeSetStatus(status));

      return settings;
    }
  }

  public decodeSetStatus(elem: Element): StatusSetting {
    let statusSett = new StatusSetting();

    if (elem.hasAttribute('ref')) {
      statusSett.ref = elem.getAttribute('ref');
    }

    if (elem.textContent === 'enabled')
      statusSett.value = 'enabled';

    if (elem.textContent === 'disabled')
      statusSett.value = 'disabled';

    return statusSett;
  }

  public decodeSetMode(elem: Element): ModeSetting {
    let modeSett = new ModeSetting();

    if (elem.hasAttribute('ref')) {
      modeSett.ref = elem.getAttribute('ref');
    }

    modeSett.value = elem.textContent;

    return modeSett;
  }

  public decodeSetValue(elem: Element): ValueSetting {
    let valueSett = new ValueSetting();

    if (elem.hasAttribute('ref')) {
      valueSett.ref = elem.getAttribute('ref');
    }

    if (elem.textContent === 'true' || elem.textContent === 'false') {
      valueSett.value = (elem.textContent === 'true');
    } else if (!isNaN(+elem.textContent)) {
      valueSett.value = +elem.textContent;
    } else if (!isNaN(Date.parse(elem.textContent))) {
      // parses everything with number in the string to a date... (maybe use momentjs)
      valueSett.value = new Date(Date.parse(elem.textContent));
    } else {
      valueSett.value = elem.textContent;
    }
    return valueSett;
  }

  public decodeSetArrayValue(elem: Element): ArrayValueSetting {
    let arrayValueSett = new ArrayValueSetting();

    if (elem.hasAttribute('ref')) {
      arrayValueSett.ref = elem.getAttribute('ref');
    }

    let encodingElem = this.utils.getElement(elem, 'encoding', Namespaces.SML);
    if (encodingElem != null) {
      arrayValueSett.encoding = this.sweDecoder.decodeAbstractEncoding(encodingElem);
    }

    let valueElem = this.utils.getElement(elem, 'value', Namespaces.SML);
    if (valueElem != null) {
      arrayValueSett.value = valueElem.textContent;
    }

    return arrayValueSett;
  }

  public decodeSetConstraint(elem: Element): ConstraintSetting {
    let constraintSett = new ConstraintSetting();

    if (elem.hasAttribute('ref')) {
      constraintSett.ref = elem.getAttribute('ref');
    }

    if (elem.firstElementChild != null) {
      constraintSett.value = this.sweDecoder.decodeConstraint(elem.firstElementChild);
    }

    return constraintSett;
  }

  public decodeTerm(elem: Element): Term {
    let termElem = this.utils.getElement(elem, 'Term', Namespaces.SML);
    if (termElem != null) {
      let term = new Term();

      if (termElem.hasAttribute('definition')) {
        term.definition = termElem.getAttribute('definition');
      }

      let label = this.utils.getElement(termElem, 'label', Namespaces.SML);
      if (label != null) {
        term.label = label.textContent;
      }

      let value = this.utils.getElement(termElem, 'value', Namespaces.SML);
      if (value != null) {
        term.value = value.textContent;
      }

      term.codeSpace = this.utils.getAttributeOfElement(
        termElem,
        'codeSpace',
        Namespaces.SML,
        'href',
        Namespaces.XLINK);

      return term;
    }
  }
}
