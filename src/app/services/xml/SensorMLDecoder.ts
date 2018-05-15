import { AbstractTime } from '../../model/gml/AbstractTime';
import { AbstractAlgorithm } from '../../model/sml/AbstractAlgorithm';
import { AbstractMetadataList } from '../../model/sml/AbstractMetadataList';
import { AbstractModes } from '../../model/sml/AbstractModes';
import { AbstractNamedMetadataList } from '../../model/sml/AbstractNamedMetadataList';
import { AbstractPhysicalProcess } from '../../model/sml/AbstractPhysicalProcess';
import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { AggregateProcess } from '../../model/sml/AggregateProcess';
import { AggregatingProcess } from '../../model/sml/AggregatingProcess';
import { ArrayValueSetting } from '../../model/sml/ArrayValueSetting';
import { Axis } from '../../model/sml/Axis';
import { CapabilityList } from '../../model/sml/CapabilityList';
import { CharacteristicList } from '../../model/sml/CharacteristicList';
import { ClassifierList } from '../../model/sml/ClassifierList';
import { Component } from '../../model/sml/Component';
import { ComponentList } from '../../model/sml/ComponentList';
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
import { IdentifierList } from '../../model/sml/IdentifierList';
import { InputList } from '../../model/sml/InputList';
import { InputOrOutputOrParameter } from '../../model/sml/InputOrOutputOrParameter';
import { KeywordList } from '../../model/sml/KeywordList';
import { Mode } from '../../model/sml/Mode';
import { ModeChoice } from '../../model/sml/ModeChoice';
import { ModeSetting } from '../../model/sml/ModeSetting';
import { NamedSweDataComponent } from '../../model/sml/NamedSweDataComponent';
import { ObservableProperty } from '../../model/sml/ObservableProperty';
import { OutputList } from '../../model/sml/OutputList';
import { ParameterList } from '../../model/sml/ParameterList';
import { PhysicalComponent } from '../../model/sml/PhysicalComponent';
import { PhysicalSystem } from '../../model/sml/PhysicalSystem';
import { Position } from '../../model/sml/Position';
import { ProcessMethod } from '../../model/sml/ProcessMethod';
import { ProcessMethodProcess } from '../../model/sml/ProcessMethodProcess';
import { Settings } from '../../model/sml/Settings';
import { SimpleProcess } from '../../model/sml/SimpleProcess';
import { SpatialFrame } from '../../model/sml/SpatialFrame';
import { StatusSetting } from '../../model/sml/StatusSetting';
import { TemporalFrame } from '../../model/sml/TemporalFrame';
import { Term } from '../../model/sml/Term';
import { ValueSetting } from '../../model/sml/ValueSetting';
import { AbstractDataComponent } from '../../model/swe/AbstractDataComponent';
import { AllowedTimes } from '../../model/swe/AllowedTimes';
import { AllowedTokens } from '../../model/swe/AllowedTokens';
import { AllowedValues } from '../../model/swe/AllowedValues';
import { SweDataRecord } from '../../model/swe/SweDataRecord';
import { SweDataStream } from '../../model/swe/SweDataStream';
import { SweEncoding } from '../../model/swe/SweEncoding';
import { BidiMap } from '../dynamicGUI/BidiMap';
import { DecoderUtils } from './DecoderUtils';
import { GmlDecoder } from './GmlDecoder';
import { IsoDecoder } from './IsoDecoder';
import { NAMESPACES } from './Namespaces';
import { ReturnObject } from './ReturnObject';
import { SweDecoder } from './SweDecoder';

export class SensorMLDecoder {

    private gmlDecoder = new GmlDecoder();
    private sweDecoder = new SweDecoder();
    private isoDecoder = new IsoDecoder();
    private utils = new DecoderUtils();
    private _profileIDMap: BidiMap;

    public get profileIDMap() {
        return this._profileIDMap;
    }
    public set profileIDMap(profileIDMap: BidiMap) {
        this._profileIDMap = profileIDMap;
        this.gmlDecoder.profileIDMap = profileIDMap;
        this.isoDecoder.profileIDMap = profileIDMap;
        this.sweDecoder.profileIDMap = profileIDMap;
    }
    public decodeElement(element: Element): AbstractProcess {
        const process = this.createProcessOfElement(element);
        if (process instanceof SimpleProcess) {
            this.decodeSimpleProcess(element, process);
        } else if (process instanceof AggregateProcess) {
            this.decodeAggregateProcess(element, process);
        } else if (process instanceof PhysicalSystem) {
            this.decodePhysicalSystem(element, process);
        } else if (process instanceof PhysicalComponent) {
            this.decodePhysicalComponent(element, process);
        } else {
            throw new Error('Unsupported process type');
        }
        return process;
    }

    private createProcessOfElement(element: Element): AbstractProcess {
        if (this.utils.getElement(element, SimpleProcess.NAME, NAMESPACES.SML)) {
            return new SimpleProcess();
        }
        if (this.utils.getElement(element, AggregateProcess.NAME, NAMESPACES.SML)) {
            return new AggregateProcess();
        }
        if (this.utils.getElement(element, PhysicalComponent.NAME, NAMESPACES.SML)) {
            return new PhysicalComponent();
        }
        if (this.utils.getElement(element, PhysicalSystem.NAME, NAMESPACES.SML)) {
            return new PhysicalSystem();
        }
        throw new Error('Unsupported process type');
    }

    public getMapWithProfileIDs() {
        return this._profileIDMap;
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

        const returnObject: ReturnObject<string> = this.utils.getAttributeOfElement(
            elem, 'attachedTo', NAMESPACES.SML, 'href', NAMESPACES.XLINK
        );

        if (returnObject) {
            object.attachedTo = returnObject.value;
            this._profileIDMap = this.utils.processProfileID(
                returnObject.docElement, object, 'attachedTo', this._profileIDMap
            );
        }
        object.localReferenceFrame = this.utils.getDecodedList(
            elem,
            'localReferenceFrame',
            NAMESPACES.SML, this._profileIDMap,
            (lrf) => this.decodeSpatialFrame(lrf));

        object.localTimeFrame = this.utils.getDecodedList(
            elem,
            'localTimeFrame',
            NAMESPACES.SML, this._profileIDMap,
            (ltf) => this.decodeTemporalFrame(ltf));

        object.position = this.utils.getDecodedList(
            elem, 'position', NAMESPACES.SML, this._profileIDMap, (pos) => this.decodePosition(pos)
        );

        object.timePosition = this.utils.getDecodedList(
            elem,
            'timePosition',
            NAMESPACES.SML, this._profileIDMap,
            (timePos) => this.sweDecoder.decodeTime(timePos));
    }

    public decodeSpatialFrame(elem: Element): ReturnObject<SpatialFrame> {
        const spatialFrame = new SpatialFrame();

        const spatialFrameElem = this.utils.getElement(elem, 'SpatialFrame', NAMESPACES.SML);
        this._profileIDMap = this.utils.processProfileID(spatialFrameElem, spatialFrame, '', this._profileIDMap);

        if (spatialFrameElem != null) {
            this.sweDecoder.decodeAbstractSweIdentifiable(spatialFrameElem, spatialFrame);

            const originElem = this.utils.getElement(spatialFrameElem, 'origin', NAMESPACES.SML);
            if (originElem != null) {
                spatialFrame.origin = originElem.textContent.trim();
                this._profileIDMap = this.utils.processProfileID(
                    originElem, spatialFrame, 'origin', this._profileIDMap
                );
            }

            spatialFrame.axis = this.utils.getDecodedList<Axis>(
                spatialFrameElem,
                'axis',
                NAMESPACES.SML, this._profileIDMap,
                (axisNode) => this.decodeAxis(axisNode));

        }
        return new ReturnObject(spatialFrame, spatialFrameElem);
    }

    public decodeTemporalFrame(elem: Element): ReturnObject<TemporalFrame> {
        const temporalFrame = new TemporalFrame();

        const temporalFrameElem = this.utils.getElement(elem, 'TemporalFrame', NAMESPACES.SML);

        if (temporalFrameElem != null) {
            this.sweDecoder.decodeAbstractSweIdentifiable(temporalFrameElem, temporalFrame);

            const originElem = this.utils.getElement(temporalFrameElem, 'origin', NAMESPACES.SML);
            if (originElem != null) {
                temporalFrame.origin = originElem.textContent.trim();
                this._profileIDMap = this.utils.processProfileID(
                    originElem, temporalFrame, 'origin', this._profileIDMap
                );
            }
        }
        return new ReturnObject(temporalFrame, elem);
    }

    public decodeAxis(elem: Element): ReturnObject<Axis> {
        const axis = new Axis();

        const name = elem.getAttribute('name');
        if (name != null) {
            axis.name = name;
            this._profileIDMap = this.utils.processProfileID(elem, axis, 'name', this._profileIDMap);
        }

        const description = elem.textContent.trim();
        if (description != null) {
            axis.description = description;
            this._profileIDMap = this.utils.processProfileID(elem, axis, 'description', this._profileIDMap);
        }
        return new ReturnObject(axis, elem);
    }

    public decodePosition(elem: Element): ReturnObject<Position> {
        const point = this.gmlDecoder.decodePoint(elem);
        if (point != null) { return point; }
        const text = this.sweDecoder.decodeText(elem);
        if (text != null) { return text; }
        const vector = this.sweDecoder.decodeVector(elem);
        if (vector != null) { return vector; }
        const dataRecord = this.sweDecoder.decodeDataRecord(elem);
        if (dataRecord != null) { return dataRecord; }
        const matrix = this.sweDecoder.decodeMatrix(elem);
        if (matrix != null) { return matrix; }
        const dataArray = this.sweDecoder.decodeDataArray(elem);
        if (dataArray != null) { return dataArray; }
        // TODO decode if process
    }

    public decodeAggregatingProcess(elem: Element, object: AggregatingProcess): void {
        const componentsElem = this.utils.getElement(elem, 'components', NAMESPACES.SML);
        if (componentsElem != null) {
            const returnObject: ReturnObject<ComponentList> = this.decodeComponentList(componentsElem);
            if (returnObject) {
                object.components = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, object, 'components', this._profileIDMap
                );
            }
        }


        const connectionsElem = this.utils.getElement(elem, 'connections', NAMESPACES.SML);
        if (connectionsElem != null) {
            const returnObject: ReturnObject<ConnectionList> = this.decodeConnectionList(connectionsElem);
            if (returnObject) {
                object.connections = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, object, 'connections', this._profileIDMap
                );
            }
        }

    }

    public decodeAbstractProcess(elem: Element, object: AbstractProcess): void {
        this.decodeDescribedObject(elem, object);

        const returnObject: ReturnObject<string> = this.utils.getAttributeOfElement(
            elem, 'typeOf', NAMESPACES.SML, 'href', NAMESPACES.XLINK
        );
        if (returnObject) {
            object.typeOf = returnObject.value;
            this._profileIDMap = this.utils.processProfileID(
                returnObject.docElement, object, 'typeOf', this._profileIDMap
            );
        }

        const settings = this.utils.getElement(elem, 'configuration', NAMESPACES.SML);
        if (settings != null) {
            const settingsRo: ReturnObject<Settings> = this.decodeSettings(settings);
            if (settingsRo) {
                object.configuration = settingsRo.value;
                this._profileIDMap = this.utils.processProfileID(
                    settingsRo.docElement, object, 'configuration', this._profileIDMap
                );
            }
        }

        const features = this.utils.getElement(elem, 'featuresOfInterest', NAMESPACES.SML);
        if (features != null) {
            const featureListRo: ReturnObject<FeatureList> = this.decodeFeatureList(features);
            if (featureListRo) {
                object.featureOfInterest = featureListRo.value;
                this._profileIDMap = this.utils.processProfileID(
                    featureListRo.docElement, object, 'featureOfInterest', this._profileIDMap
                );
            }
        }

        const inputsElem = this.utils.getElement(elem, 'inputs', NAMESPACES.SML);
        if (inputsElem != null) {
            const inputListRo: ReturnObject<InputList> = this.decodeInputList(inputsElem);
            if (inputListRo) {
                object.inputs = inputListRo.value;
                this._profileIDMap = this.utils.processProfileID(
                    inputListRo.docElement, object, 'inputs', this._profileIDMap
                );
            }
        }

        const outputsElem = this.utils.getElement(elem, 'outputs', NAMESPACES.SML);
        if (outputsElem != null) {
            const outputListRo: ReturnObject<OutputList> = this.decodeOutputList(outputsElem);
            if (outputListRo) {
                object.outputs = outputListRo.value;
                this._profileIDMap = this.utils.processProfileID(
                    outputListRo.docElement, object, 'outputs', this._profileIDMap
                );
            }
        }


        const parameters = this.utils.getElement(elem, 'parameters', NAMESPACES.SML);
        if (parameters != null) {
            const parameterListRo: ReturnObject<ParameterList> = this.decodeParameterList(parameters);
            if (parameterListRo) {
                object.parameters = parameterListRo.value;
                this._profileIDMap = this.utils.processProfileID(
                    parameterListRo.docElement, object, 'parameters', this._profileIDMap
                );
            }
        }

        object.modes = this.utils.getDecodedList(
            elem, 'modes', NAMESPACES.SML, this._profileIDMap, (mode) => this.decodeModes(mode)
        );

        if (elem.hasAttribute('definition')) {
            object.definition = elem.getAttribute('definition');
            this._profileIDMap = this.utils.processProfileID(elem, object, 'definition', this._profileIDMap);

        }
    }

    public decodeFeatureList(elem: Element): ReturnObject<FeatureList> {
        const featureListElem = this.utils.getElement(elem, 'FeatureList', NAMESPACES.SML);
        if (featureListElem != null) {
            const featureList = new FeatureList();
            this._profileIDMap = this.utils.processProfileID(featureListElem, featureList, '', this._profileIDMap);

            this.decodeAbstractMetadataList(featureListElem, featureList);
            // featureList.features =
            //     this.utils.getDecodedList(featureListElem, 'feature', NAMESPACES.SML, this._profileIDMap, (feature) => {
            //         debugger;
            //         let temp = new AbstractFeature();
            //         this.gmlDecoder.decodeAbstractFeature(feature);
            //         return [];
            //     });

            return new ReturnObject(featureList, featureListElem);
        }
    }

    public decodeModes(elem: Element): ReturnObject<AbstractModes> {
        const modeChoice = this.decodeModeChoice(elem);
        if (modeChoice != null) { return new ReturnObject(modeChoice, elem); }
    }

    public decodeModeChoice(elem: Element): ModeChoice {
        const modeChoiceElem = this.utils.getElement(elem, 'ModeChoice', NAMESPACES.SML);
        if (modeChoiceElem != null) {
            const modeChoice = new ModeChoice();
            this._profileIDMap = this.utils.processProfileID(modeChoiceElem, modeChoice, '', this._profileIDMap);

            this.sweDecoder.decodeAbstractSwe(modeChoiceElem, modeChoice);

            modeChoice.modes = this.utils.getDecodedList(
                modeChoiceElem,
                'mode',
                NAMESPACES.SML, this._profileIDMap,
                (mode) => this.decodeMode(mode));
            return modeChoice;
        }
    }

    public decodeMode(elem: Element): ReturnObject<Mode> {
        const modeElem = this.utils.getElement(elem, 'Mode', NAMESPACES.SML);
        if (modeElem != null) {
            const mode = new Mode();
            this._profileIDMap = this.utils.processProfileID(modeElem, mode, '', this._profileIDMap);

            this.decodeDescribedObject(modeElem, mode);

            const settingsElem = this.utils.getElement(modeElem, 'configuration', NAMESPACES.SML);
            if (settingsElem != null) {
                const returnObject: ReturnObject<Settings> = this.decodeSettings(settingsElem);
                if (returnObject) {
                    mode.configuration = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        returnObject.docElement, mode, 'configuration', this._profileIDMap
                    );
                }
            }

            return new ReturnObject(mode, modeElem);
        }
    }

    public decodeDescribedObject(elem: Element, describedObject: DescribedObject): void {
        this.gmlDecoder.decodeAbstractFeature(elem, describedObject);

        describedObject.keywords = this.utils.getDecodedList(
            elem,
            'keywords',
            NAMESPACES.SML, this._profileIDMap,
            (keywords) => this.decodeKeywordList(keywords));

        describedObject.identification = this.utils.getDecodedList(
            elem,
            'identification',
            NAMESPACES.SML, this._profileIDMap,
            (identifications) => this.decodeIdentifierList(identifications));

        describedObject.classification = this.utils.getDecodedList(
            elem,
            'classification',
            NAMESPACES.SML, this._profileIDMap,
            (classifier) => this.decodeClassifierList(classifier));

        describedObject.validTime = this.utils.getDecodedList(
            elem,
            'validTime',
            NAMESPACES.SML, this._profileIDMap,
            (validTime) => this.gmlDecoder.decodeTime(validTime));

        const secConstElem = this.utils.getElement(elem, 'securityConstraints', NAMESPACES.SML);
        if (secConstElem != null) {
            throw new Error('Security Constraints currently not supported');
        }

        describedObject.legalConstraints = this.utils.getDecodedList(
            elem,
            'legalConstraints',
            NAMESPACES.SML, this._profileIDMap,
            (legalConst) => this.isoDecoder.decodeLegalConstraints(legalConst));

        describedObject.characteristics = this.utils.getDecodedList(
            elem,
            'characteristics',
            NAMESPACES.SML, this._profileIDMap,
            (characteristic) => this.decodeCharacteristicList(characteristic));

        describedObject.capabilities = this.utils.getDecodedList(
            elem,
            'capabilities',
            NAMESPACES.SML, this._profileIDMap,
            (capa) => this.decodeCapabilitiesList(capa));

        describedObject.contacts = this.utils.getDecodedList(
            elem,
            'contacts',
            NAMESPACES.SML, this._profileIDMap,
            (contactList) => this.decodeContactList(contactList));

        describedObject.documentation = this.utils.getDecodedList(
            elem,
            'documentation',
            NAMESPACES.SML, this._profileIDMap,
            (documentation) => this.decodeDocumentList(documentation));

        describedObject.history = this.utils.getDecodedList(
            elem,
            'history',
            NAMESPACES.SML, this._profileIDMap,
            (history) => this.decodeEventList(history));
    }

    public decodeComponentList(elem: Element): ReturnObject<ComponentList> {
        const componentListElem = this.utils.getElement(elem, 'ComponentList', NAMESPACES.SML);
        if (componentListElem != null) {
            const compList = new ComponentList();
            this._profileIDMap = this.utils.processProfileID(componentListElem, compList, '', this._profileIDMap);

            this.sweDecoder.decodeAbstractSwe(componentListElem, compList);

            compList.components = this.utils.getDecodedList(
                componentListElem,
                'component',
                NAMESPACES.SML, this._profileIDMap,
                (component) => this.decodeComponent(component));

            return new ReturnObject(compList, componentListElem);
        }
    }

    public decodeComponent(elem: Element): ReturnObject<Component> {
        const component = new Component();
        if (elem.hasAttribute('name')) {
            component.name = elem.getAttribute('name');
            this._profileIDMap = this.utils.processProfileID(elem, component, 'name', this._profileIDMap);

        }
        if (elem.children.length === 1) {
            component.abstractProcess = this.decodeElement(elem.children[0]);
        }
        return new ReturnObject(component, elem);
    }

    public decodeConnectionList(elem: Element): ReturnObject<ConnectionList> {
        const connectionListElem = this.utils.getElement(elem, 'ConnectionList', NAMESPACES.SML);
        if (connectionListElem != null) {
            const connList = new ConnectionList();
            this._profileIDMap = this.utils.processProfileID(connectionListElem, connList, '', this._profileIDMap);

            this.sweDecoder.decodeAbstractSwe(connectionListElem, connList);

            connList.connections = this.utils.getDecodedList(
                connectionListElem,
                'connection',
                NAMESPACES.SML, this._profileIDMap,
                (connection) => this.decodeConnection(connection));

            return new ReturnObject(connList, connectionListElem);
        }
    }

    public decodeConnection(elem: Element): ReturnObject<Connection> {
        const connectionElem = this.utils.getElement(elem, 'Link', NAMESPACES.SML);
        if (connectionElem != null) {
            const conn = new Connection();

            let returnObject: ReturnObject<string> = this.utils.getAttributeOfElement(
                connectionElem, 'source', NAMESPACES.SML, 'ref', ''
            );
            if (returnObject) {
                conn.source = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, conn, 'source', this._profileIDMap
                );
            }

            returnObject = this.utils.getAttributeOfElement(connectionElem, 'destination', NAMESPACES.SML, 'ref', '');
            if (returnObject) {
                conn.destination = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, conn, 'destination', this._profileIDMap
                );
            }

            return new ReturnObject(conn, connectionElem);
        }
    }

    public decodeContactList(elem: Element): ReturnObject<ContactList> {
        const contactListElem = this.utils.getElement(elem, 'ContactList', NAMESPACES.SML);
        if (contactListElem != null) {
            const contactList = new ContactList();
            this._profileIDMap = this.utils.processProfileID(contactListElem, contactList, '', this._profileIDMap);

            this.decodeAbstractMetadataList(contactListElem, contactList);

            contactList.contacts = this.utils.getDecodedList(
                contactListElem,
                'contact',
                NAMESPACES.SML, this._profileIDMap,
                (contact) => this.isoDecoder.decodeResponsibleParty(contact));
            return new ReturnObject(contactList, contactListElem);
        }
    }

    public decodeInputList(elem: Element): ReturnObject<InputList> {
        const inputListElem = this.utils.getElement(elem, 'InputList', NAMESPACES.SML);
        if (inputListElem != null) {
            const inputList = new InputList();
            this._profileIDMap = this.utils.processProfileID(inputListElem, inputList, '', this._profileIDMap);

            this.sweDecoder.decodeAbstractSwe(inputListElem, inputList);

            inputList.inputs = this.utils.getDecodedList(
                inputListElem,
                'input',
                NAMESPACES.SML, this._profileIDMap,
                (input) => this.decodeInputOrOutputOrParameter(input));

            return new ReturnObject(inputList, inputListElem);
        }
    }

    public decodeOutputList(elem: Element): ReturnObject<OutputList> {
        const outputListElem = this.utils.getElement(elem, 'OutputList', NAMESPACES.SML);
        if (outputListElem != null) {
            const outputList = new OutputList();

            this.sweDecoder.decodeAbstractSwe(outputListElem, outputList);

            outputList.outputs = this.utils.getDecodedList(
                outputListElem,
                'output',
                NAMESPACES.SML, this._profileIDMap,
                (output) => this.decodeInputOrOutputOrParameter(output));

            return new ReturnObject(outputList, outputListElem);
        }
    }

    public decodeParameterList(elem: Element): ReturnObject<ParameterList> {
        const parameterListElem = this.utils.getElement(elem, 'ParameterList', NAMESPACES.SML);
        if (parameterListElem != null) {
            const parameterList = new ParameterList();
            this._profileIDMap = this.utils.processProfileID(parameterListElem, parameterList, '', this._profileIDMap);

            this.sweDecoder.decodeAbstractSwe(parameterListElem, parameterList);

            parameterList.parameters = this.utils.getDecodedList(
                parameterListElem,
                'parameter',
                NAMESPACES.SML, this._profileIDMap,
                (param) => this.decodeInputOrOutputOrParameter(param));

            return new ReturnObject(parameterList, parameterListElem);
        }
    }

    public decodeInputOrOutputOrParameter(elem: Element): ReturnObject<InputOrOutputOrParameter> {
        const param = new InputOrOutputOrParameter();
        this._profileIDMap = this.utils.processProfileID(elem, param, '', this._profileIDMap);

        if (elem.hasAttribute('name')) {
            param.name = elem.getAttribute('name');
            this._profileIDMap = this.utils.processProfileID(elem, param, 'name', this._profileIDMap);

        }

        if (elem.firstElementChild != null) {
            const returnObject: ReturnObject<ObservableProperty> = this.decodeObservableProperty(elem);
            if (returnObject && returnObject.value != null) {
                param.value = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, param, 'value', this._profileIDMap
                );
            }
            const returnObject1: ReturnObject<DataInterface> = this.decodeDataInterface(elem);
            if (returnObject1) {
                const dataInterface = returnObject1.value;
                if (dataInterface != null) {
                    param.value = dataInterface;
                    this._profileIDMap = this.utils.processProfileID(
                        returnObject1.docElement, param, 'value', this._profileIDMap
                    );
                }
            }
            const returnObject2: ReturnObject<AbstractDataComponent> = this.sweDecoder.decodeDataComponent(elem);
            if (returnObject2) {
                const dataComponent = returnObject2.value;
                if (dataComponent != null) {
                    param.value = dataComponent;
                    this._profileIDMap = this.utils.processProfileID(
                        returnObject2.docElement, param, 'value', this._profileIDMap
                    );
                }
            }
        }
        return new ReturnObject(param, elem);
    }

    public decodeObservableProperty(elem: Element): ReturnObject<ObservableProperty> {
        const obsPropElem = this.utils.getElement(elem, 'ObservableProperty', NAMESPACES.SML);
        if (obsPropElem != null) {
            const obsProp = new ObservableProperty();
            this._profileIDMap = this.utils.processProfileID(obsPropElem, obsProp, '', this._profileIDMap);

            this.sweDecoder.decodeAbstractSweIdentifiable(obsPropElem, obsProp);

            if (obsPropElem.hasAttribute('definition')) {
                obsProp.definition = obsPropElem.getAttribute('definition');
                this._profileIDMap = this.utils.processProfileID(
                    obsPropElem, obsProp, 'definition', this._profileIDMap
                );
            }
            return new ReturnObject(obsProp, obsPropElem);
        }
    }

    public decodeDataInterface(elem: Element): ReturnObject<DataInterface> {
        const dataInterfaceElem = this.utils.getElement(elem, 'DataInterface', NAMESPACES.SML);

        if (dataInterfaceElem != null) {
            const dataInterface = new DataInterface();
            this._profileIDMap = this.utils.processProfileID(dataInterfaceElem, dataInterface, '', this._profileIDMap);

            this.sweDecoder.decodeAbstractSweIdentifiable(dataInterfaceElem, dataInterface);

            const dataElem = this.utils.getElement(dataInterfaceElem, 'data', NAMESPACES.SML);
            if (dataElem != null) {
                const returnObject: ReturnObject<SweDataStream> = this.sweDecoder.decodeDataStream(dataElem);
                if (returnObject) {
                    dataInterface.data = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        returnObject.docElement, dataInterface, 'data', this._profileIDMap
                    );
                }
            }

            const interfaceParams = this.utils.getElement(dataInterfaceElem, 'interfaceParameters', NAMESPACES.SML);
            if (interfaceParams != null) {
                const returnObject: ReturnObject<SweDataRecord> = this.sweDecoder.decodeDataRecord(interfaceParams);
                if (returnObject) {
                    dataInterface.interfaceParameters = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        interfaceParams, dataInterface, 'interfaceParameters', this._profileIDMap
                    );
                }
            }

            return new ReturnObject(dataInterface, dataInterfaceElem);
        }
    }

    public decodeCharacteristicList(elem: Element): ReturnObject<CharacteristicList> {
        const characteristicListElem = this.utils.getElement(elem, 'CharacteristicList', NAMESPACES.SML);
        if (characteristicListElem != null) {
            const characteristicList = new CharacteristicList();
            this._profileIDMap = this.utils.processProfileID(
                characteristicListElem, characteristicList, '', this._profileIDMap
            );

            this.decodeAbstractNamedMetadataList(elem, characteristicList);

            characteristicList.characteristics = this.utils.getDecodedList(
                characteristicListElem,
                'characteristic',
                NAMESPACES.SML, this._profileIDMap,
                (char) => this.decodeNamedSweDataComponent(char));

            return new ReturnObject(characteristicList, characteristicListElem);
        }
    }

    public decodeCapabilitiesList(elem: Element): ReturnObject<CapabilityList> {
        const capabilitiesListElem = this.utils.getElement(elem, 'CapabilityList', NAMESPACES.SML);
        if (capabilitiesListElem != null) {
            const capabilitiesList = new CapabilityList();
            this._profileIDMap = this.utils.processProfileID(
                capabilitiesListElem, capabilitiesList, '', this._profileIDMap
            );

            this.decodeAbstractNamedMetadataList(elem, capabilitiesList);

            capabilitiesList.capabilities = this.utils.getDecodedList(
                capabilitiesListElem,
                'capability',
                NAMESPACES.SML, this._profileIDMap,
                (char) => this.decodeNamedSweDataComponent(char));

            return new ReturnObject(capabilitiesList, capabilitiesListElem);
        }
    }

    public decodeNamedSweDataComponent(elem: Element): ReturnObject<NamedSweDataComponent> {
        if (elem != null) {
            const comp = new NamedSweDataComponent();

            if (elem.hasAttribute('name')) {
                comp.name = elem.getAttribute('name');
                this._profileIDMap = this.utils.processProfileID(elem, comp, 'name', this._profileIDMap);

            }

            if (elem.firstElementChild != null) {
                const returnObject: ReturnObject<AbstractDataComponent> =
                    this.sweDecoder.decodeDataComponent(elem.firstElementChild);
                if (returnObject) {
                    comp.component = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        returnObject.docElement, comp, 'component', this._profileIDMap
                    );
                }
            }

            return new ReturnObject(comp, elem);
        }
    }

    public decodeKeywordList(elem: Element): ReturnObject<KeywordList> {
        const keywordListElem = this.utils.getElement(elem, 'KeywordList', NAMESPACES.SML);
        if (keywordListElem != null) {
            const keywordList = new KeywordList();
            this._profileIDMap = this.utils.processProfileID(keywordListElem, keywordList, '', this._profileIDMap);

            this.decodeAbstractMetadataList(keywordListElem, keywordList);

            const returnObject: ReturnObject<string> = this.utils.getAttributeOfElement(
                keywordListElem, 'codeSpace', NAMESPACES.SML, 'href', NAMESPACES.XLINK
            );

            if (returnObject) {
                keywordList.codeSpace = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, keywordList, 'codeSpace', this._profileIDMap
                );
            }

            this.utils.getDecodedList(
                keywordListElem,
                'keyword',
                NAMESPACES.SML, this._profileIDMap,
                (keywords) => new ReturnObject(keywordList.keywords.push(keywords.textContent), null));
            return new ReturnObject(keywordList, keywordListElem);
        }
    }

    public decodeIdentifierList(elem: Element): ReturnObject<IdentifierList> {
        const identifierListElem = this.utils.getElement(elem, 'IdentifierList', NAMESPACES.SML);
        if (identifierListElem != null) {
            const identifierList = new IdentifierList();
            this._profileIDMap = this.utils.processProfileID(
                identifierListElem, identifierList, '', this._profileIDMap
            );

            this.decodeAbstractMetadataList(identifierListElem, identifierList);
            identifierList.identifiers = this.utils.getDecodedList(
                identifierListElem,
                'identifier',
                NAMESPACES.SML, this._profileIDMap,
                (identifier) => this.decodeTerm(identifier));
            return new ReturnObject(identifierList, identifierListElem);
        }
    }

    public decodeClassifierList(elem: Element): ReturnObject<ClassifierList> {
        const classifierListElem = this.utils.getElement(elem, 'ClassifierList', NAMESPACES.SML);
        if (classifierListElem != null) {
            const classifierList = new ClassifierList();

            this.decodeAbstractMetadataList(classifierListElem, classifierList);
            classifierList.classifiers = this.utils.getDecodedList(
                classifierListElem,
                'classifier',
                NAMESPACES.SML, this._profileIDMap,
                (classifier) => this.decodeTerm(classifier));
            return new ReturnObject(classifierList, classifierListElem);
        }
    }

    public decodeEventList(elem: Element): ReturnObject<EventList> {
        const eventListElem = this.utils.getElement(elem, 'EventList', NAMESPACES.SML);
        if (eventListElem != null) {
            const eventList = new EventList();

            this.decodeAbstractMetadataList(eventListElem, eventList);
            eventList.events = this.utils.getDecodedList(
                eventListElem,
                'event',
                NAMESPACES.SML, this._profileIDMap,
                (event) => this.decodeEvent(event));
            return new ReturnObject(eventList, eventListElem);
        }
    }

    public decodeDocumentList(elem: Element): ReturnObject<DocumentList> {
        const documentListElem = this.utils.getElement(elem, 'DocumentList', NAMESPACES.SML);
        if (documentListElem != null) {
            const documentList = new DocumentList();
            this._profileIDMap = this.utils.processProfileID(documentListElem, documentList, '', this._profileIDMap);

            this.decodeAbstractMetadataList(documentListElem, documentList);
            documentList.documents = this.utils.getDecodedList(
                documentListElem,
                'document',
                NAMESPACES.SML, this._profileIDMap,
                (doc) => this.isoDecoder.decodeOnlineResource(doc));
            return new ReturnObject(documentList, documentListElem);
        }
    }

    public decodeProcessMethodProcess(elem: Element, object: ProcessMethodProcess): void {
        const methodElem = this.utils.getElement(elem, 'method', NAMESPACES.SML);
        if (methodElem != null) {
            const returnObject: ReturnObject<ProcessMethod> = this.decodeProcessMethod(methodElem);
            if (returnObject) {
                object.method = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, object, 'method', this._profileIDMap
                );
            }
        }
    }

    public decodeProcessMethod(elem: Element): ReturnObject<ProcessMethod> {
        const processMethodElem = this.utils.getElement(elem, 'ProcessMethod', NAMESPACES.SML);
        if (processMethodElem != null) {
            const processMethod = new ProcessMethod();
            this._profileIDMap = this.utils.processProfileID(processMethodElem, processMethod, '', this._profileIDMap);

            this.sweDecoder.decodeAbstractSweIdentifiable(processMethodElem, processMethod);
            processMethod.algorithm = this.utils.getDecodedList(
                processMethodElem,
                'algorithm',
                NAMESPACES.SML, this._profileIDMap,
                (algorithm) => this.decodeAlgorithm(algorithm));
            return new ReturnObject(processMethod, processMethodElem);
        }
    }

    public decodeAlgorithm(elem: Element): ReturnObject<AbstractAlgorithm> {
        // TODO implement algorithm
        throw new Error('not yet implemented');
    }

    public decodeAbstractMetadataList(elem: Element, object: AbstractMetadataList): void {
        this.sweDecoder.decodeAbstractSweIdentifiable(elem, object);
        if (elem.hasAttribute('definition')) {
            object.definition = elem.getAttribute('definition');
            this._profileIDMap = this.utils.processProfileID(elem, object, 'definition', this._profileIDMap);

        }
    }

    public decodeAbstractNamedMetadataList(elem: Element, object: AbstractNamedMetadataList): void {
        if (elem.hasAttribute('name')) {
            object.name = elem.getAttribute('name');
            this._profileIDMap = this.utils.processProfileID(elem, object, 'name', this._profileIDMap);

        }
    }

    public decodeEvent(elem: Element): ReturnObject<Event> {
        const eventElem = this.utils.getElement(elem, 'Event', NAMESPACES.SML);
        if (eventElem != null) {
            const event = new Event();
            this._profileIDMap = this.utils.processProfileID(eventElem, event, '', this._profileIDMap);

            this.sweDecoder.decodeAbstractSweIdentifiable(eventElem, event);

            event.identification = this.utils.getDecodedList(
                eventElem,
                'identification',
                NAMESPACES.SML, this._profileIDMap,
                (identifier) => this.decodeIdentifierList(identifier));

            event.classification = this.utils.getDecodedList(eventElem,
                'classification',
                NAMESPACES.SML, this._profileIDMap,
                (classification) => this.decodeClassifierList(classification));

            event.contacts = this.utils.getDecodedList(
                eventElem,
                'contacts',
                NAMESPACES.SML, this._profileIDMap,
                (contacts) => this.decodeContactList(contacts));

            event.documentation = this.utils.getDecodedList(
                eventElem,
                'documentation',
                NAMESPACES.SML, this._profileIDMap,
                (documentation) => this.decodeDocumentList(documentation));

            event.keywords = this.utils.getDecodedList(
                eventElem,
                'keywords',
                NAMESPACES.SML, this._profileIDMap,
                (keyword) => this.decodeKeywordList(keyword));

            const timeElem = this.utils.getElement(eventElem, 'time', NAMESPACES.SML);
            if (timeElem != null) {
                const returnObject: ReturnObject<AbstractTime> = this.gmlDecoder.decodeTime(timeElem);
                if (returnObject) {
                    event.time = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        returnObject.docElement, event, 'time', this._profileIDMap
                    );
                }
            }

            const propertiesElem = this.utils.getElement(eventElem, 'property', NAMESPACES.SML);
            if (propertiesElem != null) {
                throw new Error('not implemented');
                //                event.properties = this.sweDecoder.decodeDataComponent(propertiesElem);
            }

            const configurationElem = this.utils.getElement(eventElem, 'configuration', NAMESPACES.SML);
            if (configurationElem != null) {
                const returnObject: ReturnObject<Settings> = this.decodeSettings(configurationElem);
                if (returnObject) {
                    event.configuration = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        returnObject.docElement, event, 'configuration', this._profileIDMap
                    );
                }
            }

            return new ReturnObject(event, eventElem);
        }
    }

    public decodeSettings(elem: Element): ReturnObject<Settings> {
        const settingsElem = this.utils.getElement(elem, 'Settings', NAMESPACES.SML);
        if (settingsElem != null) {
            const settings = new Settings();

            this.sweDecoder.decodeAbstractSwe(settingsElem, settings);

            settings.setValue = this.utils.getDecodedList(
                settingsElem,
                'setValue',
                NAMESPACES.SML, this._profileIDMap,
                (val) => this.decodeSetValue(val));

            settings.setArrayValue = this.utils.getDecodedList(
                settingsElem,
                'setArrayValue',
                NAMESPACES.SML, this._profileIDMap,
                (arr) => this.decodeSetArrayValue(arr));

            settings.setConstraint = this.utils.getDecodedList(
                settingsElem,
                'setConstraint',
                NAMESPACES.SML, this._profileIDMap,
                (constraint) => this.decodeSetConstraint(constraint));

            settings.setMode = this.utils.getDecodedList(
                settingsElem,
                'setMode',
                NAMESPACES.SML, this._profileIDMap,
                (mode) => this.decodeSetMode(mode));

            settings.setStatus = this.utils.getDecodedList(
                settingsElem,
                'setStatus',
                NAMESPACES.SML, this._profileIDMap,
                (status) => this.decodeSetStatus(status));

            return new ReturnObject(settings, settingsElem);
        }
    }

    public decodeSetStatus(elem: Element): ReturnObject<StatusSetting> {
        const statusSett = new StatusSetting();

        if (elem.hasAttribute('ref')) {
            statusSett.ref = elem.getAttribute('ref');
            this._profileIDMap = this.utils.processProfileID(elem, statusSett, 'ref', this._profileIDMap);

        }

        if (elem.textContent === 'enabled') {
            statusSett.value = 'enabled';
            this._profileIDMap = this.utils.processProfileID(elem, statusSett, 'value', this._profileIDMap);
        }

        if (elem.textContent === 'disabled') {
            statusSett.value = 'disabled';
            this._profileIDMap = this.utils.processProfileID(elem, statusSett, 'disabled', this._profileIDMap);

        }
        return new ReturnObject(statusSett, elem);
    }

    public decodeSetMode(elem: Element): ReturnObject<ModeSetting> {
        const modeSett = new ModeSetting();

        if (elem.hasAttribute('ref')) {
            modeSett.ref = elem.getAttribute('ref');
            this._profileIDMap = this.utils.processProfileID(elem, modeSett, 'ref', this._profileIDMap);

        }

        modeSett.value = elem.textContent;

        return new ReturnObject(modeSett, elem);
    }

    public decodeSetValue(elem: Element): ReturnObject<ValueSetting> {
        const valueSett = new ValueSetting();

        if (elem.hasAttribute('ref')) {
            valueSett.ref = elem.getAttribute('ref');
            this._profileIDMap = this.utils.processProfileID(elem, valueSett, 'ref', this._profileIDMap);

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
        return new ReturnObject(valueSett, elem);
    }

    public decodeSetArrayValue(elem: Element): ReturnObject<ArrayValueSetting> {
        const arrayValueSett = new ArrayValueSetting();

        if (elem.hasAttribute('ref')) {
            arrayValueSett.ref = elem.getAttribute('ref');
            this._profileIDMap = this.utils.processProfileID(elem, arrayValueSett, 'ref', this._profileIDMap);

        }

        const encodingElem = this.utils.getElement(elem, 'encoding', NAMESPACES.SML);
        if (encodingElem != null) {
            const returnObject: ReturnObject<SweEncoding> = this.sweDecoder.decodeAbstractEncoding(encodingElem);
            if (returnObject) {
                arrayValueSett.encoding = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, arrayValueSett, 'encoding', this._profileIDMap
                );
            }
        }

        const valueElem = this.utils.getElement(elem, 'value', NAMESPACES.SML);
        if (valueElem != null) {
            arrayValueSett.value = valueElem.textContent;
            this._profileIDMap = this.utils.processProfileID(valueElem, arrayValueSett, 'value', this._profileIDMap);

        }

        return new ReturnObject(arrayValueSett, elem);
    }

    public decodeSetConstraint(elem: Element): ReturnObject<ConstraintSetting> {
        const constraintSett = new ConstraintSetting();

        if (elem.hasAttribute('ref')) {
            constraintSett.ref = elem.getAttribute('ref');
            this._profileIDMap = this.utils.processProfileID(elem, constraintSett, 'ref', this._profileIDMap);

        }

        if (elem.firstElementChild != null) {
            const returnObject: ReturnObject<AllowedTimes | AllowedTokens | AllowedValues> =
                this.sweDecoder.decodeConstraint(elem.firstElementChild);
            if (returnObject) {
                constraintSett.value = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, constraintSett, 'value', this._profileIDMap
                );
            }
        }

        return new ReturnObject(constraintSett, elem);
    }

    public decodeTerm(elem: Element): ReturnObject<Term> {
        const termElem = this.utils.getElement(elem, 'Term', NAMESPACES.SML);
        if (termElem != null) {
            const term = new Term();
            this._profileIDMap = this.utils.processProfileID(termElem, term, 'Term', this._profileIDMap);


            if (termElem.hasAttribute('definition')) {
                term.definition = termElem.getAttribute('definition');
            }

            const label = this.utils.getElement(termElem, 'label', NAMESPACES.SML);
            if (label != null) {
                term.label = label.textContent;
                this._profileIDMap = this.utils.processProfileID(label, term, 'label', this._profileIDMap);

            }

            const value = this.utils.getElement(termElem, 'value', NAMESPACES.SML);
            if (value != null) {
                term.value = value.textContent;
                this._profileIDMap = this.utils.processProfileID(value, term, 'value', this._profileIDMap);

            }

            const returnObject: ReturnObject<string> = this.utils.getAttributeOfElement(
                termElem, 'codeSpace', NAMESPACES.SML, 'href', NAMESPACES.XLINK
            );
            if (returnObject) {
                term.codeSpace = returnObject.value;
            }

            return new ReturnObject(term, termElem);
        }
    }
}
