import * as smlLib from '../model/sml';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DynamicDescriptionConfig } from './config/DynamicDescriptionConfig';
import { LFService, LoggerFactoryOptions, LogLevel, LogGroupRule, LoggerFactory, Logger } from 'typescript-logging';
import { SensorMLDocumentEncoder } from './xml/SensorMLDocumentEncoder';
import { SensorMLDocumentDecoder } from './xml/SensorMLDocumentDecoder';
import { AbstractProcess } from '../model/sml/AbstractProcess';
import { NAMESPACES } from './xml/Namespaces';

declare let X2JS: any;
declare let jQuery: any;

export class BidiMap {
    private elementToID: Map<any, Map<string, string>>;
    private iDtoElement: Map<string, ObjectAndProperty>;
    private _loggerFactory: LoggerFactory;
    private _logger: Logger;

    constructor() {
        this.elementToID = new Map<any, Map<string, string>>();
        this.iDtoElement = new Map<string, ObjectAndProperty>();

        this._loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp('.+'), LogLevel.Fatal)));
        this._logger = this._loggerFactory.getLogger('BidiMap');
    }

    public addLinkage(elementObject: any, objectProperty: string, profileID: string) {
        let elementAndPrefix = new ObjectAndProperty(elementObject, objectProperty);
        let innerMap = this.elementToID.get(elementObject);
        if (!innerMap) {
            innerMap = new Map<string, string>();
        }
        innerMap.set(objectProperty, profileID);
        this.elementToID.set(elementObject, innerMap);
        this.iDtoElement.set(profileID, elementAndPrefix);
    }

    public getProfileID(modelObject: any, objectProperty: string): string {
        if (!modelObject || !objectProperty)
            throw new Error(
                'One or both paramerter error: modelObject' + modelObject + ' objectProperty:' + objectProperty
            );
        this._logger.info('get ProfileID for object:' + modelObject + ' and property: ' + objectProperty);
        if (this.elementToID.get(modelObject) instanceof Map) {
            let innerMap = this.elementToID.get(modelObject);
            this._logger.info('found entry in BidiMap for object:' + modelObject);
            return innerMap.get(objectProperty);
        }

    }

    public getElementObject(profileID: string): any {
        return this.iDtoElement.get(profileID);
    }
}

class XPathElement {
    private _element: string;
    private _prefix: string;

    constructor(element: string, prefix: string) {
        this._element = element;
        this._prefix = prefix;
    }

    get element(): string {
        return this._element;
    }

    set element(element: string) {
        this._element = element;
    }

    get prefix(): string {
        return this._prefix;
    }

    set prefix(prefix: string) {
        this._prefix = prefix;
    }
}

class ObjectAndProperty {
    private _object: any;
    private _property: string;

    constructor(object: any, property: string) {
        this._object = object;
        this._property = property;
    }

    get object(): any {
        return this._object;
    }

    set object(object: any) {
        this._object = object;
    }

    get property(): string {
        return this._property;
    }

    set prefix(property: string) {
        this._property = property;
    }
}

class Cache {
    private _parent: Element;
    private _profileID: string;

    constructor(parent?: Element) {
        this._parent = parent;
    }

    get parent(): Element {
        return this._parent;
    }

    set parent(parent: Element) {
        this._parent = parent;
    }

    get profileID(): string {
        return this._profileID;
    }

    set profileID(profileID: string) {
        this._profileID = profileID;
    }
}

export class FormFields {
    private _calendar: boolean;
    private _textField: boolean;
    private _map: boolean;
    private _checkbox: boolean;
    private _selectionBox: boolean;
    private _numberField: boolean;

    get calendar(): boolean {
        return this._calendar;
    }

    set calendar(calendar: boolean) {
        this._calendar = calendar;
    }

    get textField(): boolean {
        return this._textField;
    }

    set textField(textField: boolean) {
        this._textField = textField;
    }

    get map(): boolean {
        return this._map;
    }

    set map(map: boolean) {
        this._map = map;
    }

    get checkbox(): boolean {
        return this._checkbox;
    }

    set checkbox(checkbox: boolean) {
        this._checkbox = checkbox;
    }

    get selectionBox(): boolean {
        return this._selectionBox;
    }

    set selectionBox(selectionBox: boolean) {
        this._selectionBox = selectionBox;
    }

    get numberField(): boolean {
        return this._numberField;
    }

    set numberField(numberField: boolean) {
        this._numberField = numberField;
    }
}

export class Configuration {
    private _fixValue: boolean;
    private _requireValue: boolean;
    private _hideField: FormFields;
    private _existInForm: boolean;
    private _fixQuantity: boolean;
    private _valueFix: any;
    private _valueDefault: any;
    private _label: string;

    constructor() {
        this._hideField = new FormFields();
    }

    get fixValue(): boolean {
        return this._fixValue;
    }

    set fixValue(fixValue: boolean) {
        this._fixValue = fixValue;
    }

    get requireValue(): boolean {
        return this._requireValue;
    }

    set requireValue(requireValue: boolean) {
        this._requireValue = requireValue;
    }

    get hideField(): FormFields {
        return this._hideField;
    }

    set hideField(hideField: FormFields) {
        this._hideField = hideField;
    }

    get existInForm(): boolean {
        return this._existInForm;
    }

    set existInForm(existInForm: boolean) {
        this._existInForm = existInForm;
    }

    get fixQuantity(): boolean {
        return this._fixQuantity;
    }

    set fixQuantity(fixQuantity: boolean) {
        this._fixQuantity = fixQuantity;
    }

    get valueFix(): any {
        return this._valueFix;
    }

    set valueFix(valueFix: any) {
        this._valueFix = valueFix;
    }

    get valueDefault(): any {
        return this._valueDefault;
    }

    set valueDefault(valueDefault: any) {
        this._valueDefault = valueDefault;
    }

    get label(): any {
        return this._label;
    }

    set label(label: any) {
        this._label = label;
    }

    public getDefaultConfiguration(): Configuration {
        let configuration = new Configuration();
        configuration.fixValue = false;
        configuration.requireValue = false;
        configuration.existInForm = true;
        configuration.fixQuantity = false;
        configuration.valueFix = null;
        configuration.valueDefault = null;
        return configuration;
    }
}

export class ReturnObject {
    private _model: AbstractProcess;
    private uration: DynamicDescriptionConfig;

    get model(): AbstractProcess {
        return this._model;
    }

    set model(model: AbstractProcess) {
        this._model = model;
    }

    get configuration(): DynamicDescriptionConfig {
        return this.uration;
    }

    set configuration(configuration: DynamicDescriptionConfig) {
        this.uration = configuration;
    }
}

@Injectable()
export class DynamicGUIService {
    private _loggerFactory: LoggerFactory;
    private _logger: Logger;
    private _insertElements: InsertElements;
    private _model: Document;
    private _profile: any;
    private _elementConfig: Object = {};
    private _globalConfig: Object = {};
    private _sensorMlDecoder: SensorMLDocumentDecoder = new SensorMLDocumentDecoder();
    private _profileIDMap: BidiMap;

    constructor(private http: Http) {
        this._loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp('.+'), LogLevel.Info)));
        this._logger = this._loggerFactory.getLogger('DynamicGuiService');

        this._globalConfig['description'] = {};
        this._profileIDMap = new BidiMap();
        this._sensorMlDecoder.profileIDMap = this._profileIDMap;
    }

    public getModelAndConfiguration(): Observable<Object> {
        let model = new smlLib.PhysicalSystem();
        let encoder = new SensorMLDocumentEncoder();
        this._model = encoder.createDocumentForProcess(model);
        let cache = new Cache(this._model.documentElement);
        let path = this.splitXPath('sml:identification/sml:IdentifierList');
        let configuration = new Configuration;
        this._insertElements = new InsertElements(this._model);
        let list = this._insertElements.add(cache, path, configuration);
        // alert(JSON.stringify(model));
        path = this.splitXPath('sml:Identifier/sml:Term/sml:label');
        // alert(JSON.stringify(path));
        configuration.valueFix = 'short name';

        this._insertElements.add(list, path, configuration);
        path = this.splitXPath('sml:Identifier/sml:Term/sml:label');
        configuration.valueFix = 'long name';
        this._insertElements.add(list, path, configuration);
        return this.getProfile().map((json: any) => {
            this._logger.info('JSON profile:' + JSON.stringify(json));
            if (json.profile) {
                this._profile = json.profile;
            } else {
                throw new Error('JSON Object has no profile-element!');
            }
            this.createModel();
            this.configure();
            this.setAbstractConfigurations();
            this._logger.info('JSON profile:' + JSON.stringify(json));
            this._logger.info('model with the fix values:' + (this._model.documentElement.innerHTML));
            this._logger.info('element configuration:' + (JSON.stringify(this._elementConfig)));
            this._logger.info('global configuration:' + (JSON.stringify(this._globalConfig)));
            let returnObject = new ReturnObject();
            returnObject.model = this._sensorMlDecoder.decode(this._model);
            this._logger.info('profile IDs map:' + JSON.stringify(
                this._profileIDMap.getElementObject('value_shortName'))
            );
            this._logger.info('model with the fix values:' + JSON.stringify(returnObject.model));
            returnObject.configuration = new DynamicDescriptionConfig(
                this._globalConfig, this._elementConfig, this._profileIDMap, true
            );
            return returnObject;
        });
    }

    public setModel(modelClass: string) {
        let encoder = new SensorMLDocumentEncoder();
        let description: AbstractProcess;
        switch (modelClass) {
            case 'PhysicalSystem':
                description = new smlLib.PhysicalSystem();
                this._model = encoder.createDocumentForProcess(description);
                break;
            case 'PhysicalComponent':
                description = new smlLib.PhysicalComponent();
                this._model = encoder.createDocumentForProcess(description);
                break;
            case 'SimpleProcess':
                description = new smlLib.SimpleProcess();
                this._model = encoder.createDocumentForProcess(description);
                break;
            case 'AggregateProcess':
                description = new smlLib.AggregateProcess();
                this._model = encoder.createDocumentForProcess(description);
                break;
            default: {
                throw new Error(
                    'Class of the profile is not matching the known ones'
                );
            }
        }
    }

    private createModel() {
        let modelClass: XPathElement[] = this.splitXPath(this._profile._class);
        if (modelClass.length === 1) {
            this.setModel(modelClass[0].element);
            this._insertElements = new InsertElements(this._model);
        }
    }

    private configure() {
        if (this._profile.formConfiguration) {
            let formComponents = this._profile.formConfiguration.formComponent;
            this.processFormComponents(formComponents);
        } else {
            throw new Error('JSON Object has no formConfiguration-element!');
        }
    }

    private processFormComponents(formComponents: any) {
        if (Array.isArray(formComponents)) {
            for (let key in formComponents) {
                if (formComponents[key])
                    this.processFormComponent(formComponents[key]);
            }
        }
        this.processFormComponent(formComponents);
    }

    private setAbstractConfigurations() {
        for (let key in this._profile) {
            if (key.indexOf('abstract') === 0) {
                let abstractElements = this._profile[key];
                if (Array.isArray(abstractElements)) {
                    for (let _key in abstractElements) {
                        if (abstractElements[_key])
                            this.setAbstractConfiguration(abstractElements[_key]);
                    }
                } else {
                    this.setAbstractConfiguration(abstractElements);
                }
            }
        }
    }

    private setAbstractConfiguration(abstractElement: any) {
        let xPath: XPathElement[] = this.splitXPath(abstractElement._XPath);
        let configuration = new Configuration();

        this.setConfiguration(abstractElement, configuration);
        let config = this._globalConfig['description'];
        while (xPath.length > 0) {
            let xpathElement = xPath.shift();
            let prefixElementName = xpathElement.prefix.toLowerCase() + ':' + xpathElement.element;
            if (!config[prefixElementName]) {
                config[prefixElementName] = {};
            }

            if (xPath.length === 0) {
                Object.assign(config[prefixElementName], configuration);
            } else {
                config = config[prefixElementName];
            }
        }
    }

    private processFormComponent(formComponent: any) {
        let cache = new Cache(this._model.documentElement);
        for (let key in formComponent) {
            if (key === 'elementGroup') {
                this.processElementGroupRefs(cache, formComponent[key], '');
            } else if (key === 'formComponent') {
                this.processFormComponents(formComponent[key]);
            } else if (key === 'element') {
                this.processElementRefs(cache, formComponent[key]);
            }
        }
    }

    private processElementRefs(cache: Cache, elements: any) {
        if (Array.isArray(elements)) {
            for (let key in elements) {
                if (elements[key])
                    this.processElementRef(cache, elements[key]);
            }
        } else {
            this.processElementRef(cache, elements);
        }
    }

    private processElementRef(cache: Cache, element: any) {
        let ref = element._ref;
        this._logger.info('Process single global element: ' + ref);
        for (let key in this._profile) {
            if (key.indexOf('element') === 0 && key !== 'elementGroup' && key !== 'elementGroupRef') {
                let elementGlobal = this._profile[key];
                if (Array.isArray(elementGlobal)) {
                    for (let _key in elementGlobal) {
                        if (ref === elementGlobal[_key]._ID) {
                            this._logger.info('Single global element found: ' + elementGlobal[_key]._ID);
                            this.insertSingleElement(cache, elementGlobal[_key]);
                        }
                    }
                } else {
                    if (ref === elementGlobal._ID) {
                        this._logger.info('Single global element found: ' + elementGlobal._ID);
                        this.insertSingleElement(cache, elementGlobal);
                    }
                }
            }
        }
    }

    private processElementGroupRefs(cache: Cache, elementGroups: any, parentXPath: string) {
        if (Array.isArray(elementGroups)) {
            for (let key in elementGroups) {
                if (elementGroups[key])
                    this.processElementGroupRef(cache, elementGroups[key], parentXPath);
            }
        } else {
            this.processElementGroupRef(cache, elementGroups, parentXPath);
        }
    }

    private processElementGroupRef(cache: Cache, elementGroup: any, parentXPath: string) {
        let groupID = elementGroup._groupRef;
        for (let key in this._profile) {
            if (key === 'elementGroup') {
                let elementGroupsGlobal = this._profile[key];
                if (Array.isArray(elementGroupsGlobal)) {
                    for (let _key in elementGroupsGlobal) {
                        if (groupID === elementGroupsGlobal[_key]._groupID) {
                            this.processElementGroup(cache, elementGroupsGlobal[_key], parentXPath, true);
                        }
                    }
                } else {
                    if (groupID === elementGroupsGlobal._groupID) {
                        this.processElementGroup(cache, elementGroupsGlobal, parentXPath, true);
                    }
                }
            }
        }
    }

    private processElementGroups(cache: Cache, elementGroups: any, parentXPath: string, global: boolean) {
        if (Array.isArray(elementGroups)) {
            for (let key in elementGroups) {
                if (elementGroups[key])
                    this.processElementGroup(cache, elementGroups[key], parentXPath, global);
            }
        } else {
            this.processElementGroup(cache, elementGroups, parentXPath, global);
        }
    }

    private processElementGroup(cache: Cache, elementGroup: any, parentXPath: string, global: boolean) {
        let elements = elementGroup.elements;
        let xPath: string = elementGroup._XPath;
        if (global) {
            let sliceLength: number = parentXPath.length;
            if (xPath.substring(sliceLength, sliceLength + 1) === '/') {
                sliceLength = sliceLength + 1;
            }
            xPath = xPath.slice(sliceLength);
            this._logger.info('Element group: sliced XPath: ' + xPath);
        }

        let xpath: XPathElement[] = this.splitXPath(xPath);
        let configuration = new Configuration();
        configuration = this.setConfiguration(elementGroup, configuration);
        this._elementConfig[elementGroup._groupID] = configuration;
        cache.profileID = elementGroup._groupID;
        let _cache = this._insertElements.add(cache, xpath, configuration);
        for (let key in elements) {
            if (key.indexOf('element') === 0 && key !== 'elementGroup' && key !== 'elementGroupRef') {
                this.insertSingleElements(_cache, elements[key]);
            } else if (key === 'elementGroupRef') {
                this.processElementGroupRefs(_cache, elements[key], xPath);
            } else if (key === 'elementGroup') {
                this.processElementGroups(_cache, elements[key], xPath, false);
            }
        }
    }

    private insertSingleElements(cache: Cache, elements: any) {
        if (Array.isArray(elements)) {
            for (let key in elements) {
                if (elements[key])
                    this.insertSingleElement(cache, elements[key]);
            }
        } else {
            this.insertSingleElement(cache, elements);
        }
    }

    private insertSingleElement(cache: Cache, element: any) {
        let configuration = new Configuration();
        configuration.valueFix = null;
        configuration.valueDefault = null;
        configuration = this.setConfiguration(element, configuration);
        this._elementConfig[element._ID] = configuration;
        let xpath = element._XPath;
        cache.profileID = element._ID;
        let xpathElement: XPathElement[] = this.splitXPath(xpath);
        this._insertElements.add(cache, xpathElement, configuration);
    }

    private setConfiguration(element: any, configuration: Configuration): Configuration {
        if (element.restrictions) {
            if (element.restrictions['fixContent']) {
                if (element.restrictions['fixContent'].value) {
                    configuration.valueFix = element.restrictions['fixContent'].value.__text;
                    configuration.fixValue = true;
                }

            } else {
                if (element.restrictions['defaultContent']) {
                    if (element.restrictions['defaultContent'].value) {
                        configuration.valueDefault = element.restrictions['defaultContent'].value.__text;
                    }
                }
                if (element.restrictions['use']) {
                    if (element.restrictions['use'].__text === 'optional') {
                        configuration.requireValue = false;
                    } else {
                        configuration.requireValue = true;
                    }
                }
            }
        }

        if (element['input']) {
            let input = element['input'];
            for (let key in input) {
                if (input[key]._hide === 'true') {
                    configuration.hideField[key] = true;
                    this._logger.info('For element ' + JSON.stringify(element) + ' form field ' + key + ' is hidden');
                } else if (!(key.indexOf('_') === 0)) {
                    configuration.hideField[key] = false;
                    this._logger.info('For element ' + JSON.stringify(element) + ' form field ' + key + ' is visible');
                }
            }
        }

        if (element['occurrence']) {
            let fixQuantity = element['occurrence'].fixQuantity;
            if (fixQuantity) {
                configuration.fixQuantity = true;
            }
        }
        if (element['label']) {
            let label = element['label'].__text;
            if (label) {
                configuration.label = label;
            }
        }
        return configuration;
    }

    private getProfile(): Observable<JSON> {
        return this.http.get('../../profiles/Profile2_discovery.xml').map((response: Response) => {
            let x2js = new X2JS();
            let json = x2js.xml2js(response.text());
            //   alert(JSON.stringify(json));
            return json;
        });
    }

    private splitXPath(xPath: string): XPathElement[] {
        this._logger.info('XPath to split:' + xPath);
        let xPathSplitted: XPathElement[] = [];
        let elements = xPath.split('/');
        for (let element of elements) {
            let prefixElementName = element.split(':');
            if (prefixElementName.length === 2) {
                xPathSplitted.push(new XPathElement(prefixElementName[1], prefixElementName[0].toUpperCase()));
            } else if (prefixElementName.length === 1) {
                let xPathAttribute = prefixElementName[0].slice(1);
                xPathSplitted.push(new XPathElement(xPathAttribute, '@'));
            }

        }
        this._logger.info('New splitted XPath: ' + JSON.stringify(xPathSplitted));
        return xPathSplitted;
    }
}

class InsertElements {
    private _loggerFactory: LoggerFactory;
    private _logger: Logger;
    private _model: Document;

    constructor(model: Document) {
        this._loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp('.+'), LogLevel.Info)));
        this._logger = this._loggerFactory.getLogger('DynamicGuiService');
        this._model = model;
    }

    public add(cache: Cache, xPath: XPathElement[], configuration: Configuration): Cache {
        while (xPath.length > 0) {
            let xpathElement = xPath.shift();
            this._logger.info('XPath.length:' + xPath.length);
            this._logger.info(
                '\n' + 'xpathElement:' + xpathElement.element + '\n' + 'parent:' + JSON.stringify(cache.parent)
            );
            cache = this.insertChild(cache, xpathElement, xPath, configuration);
        }
        return cache;
    }

    private insertChild(
        cache: Cache, xpathElement: XPathElement, xPath: XPathElement[], configuration: Configuration
    ): Cache {
        let child = new Cache();
        child.profileID = cache.profileID;
        let childName = xpathElement.element;
        if (xPath.length > 0 || (typeof configuration.valueFix === 'undefined'
            && typeof configuration.valueDefault === 'undefined')) {
            let childNode = this._model.createElementNS(
                NAMESPACES[xpathElement.prefix], xpathElement.prefix.toLowerCase() + ':' + childName
            );
            if (xPath.length === 0) {
                childNode.setAttribute('profileID', cache.profileID);
            }
            cache.parent.appendChild(childNode);
            this._logger.info('New child: ' + childNode.tagName + ' appended');
            child.parent = childNode;

        } else {
            if (configuration.valueFix !== null || configuration.valueDefault !== null) {
                let value;
                if (configuration.valueFix !== null) {
                    value = configuration.valueFix;
                } else {
                    value = configuration.valueDefault;
                }
                if (xpathElement.prefix === '@') {
                    cache.parent.setAttribute(xpathElement.element, value);
                    this.setProfileIDForAttribute(cache.parent, cache.profileID);
                } else {
                    let childNode: Element;
                    let values = value.split(',');
                    for (let key in values) {
                        if (values[key]) {
                            childNode = this._model.createElementNS(
                                NAMESPACES[xpathElement.prefix],
                                xpathElement.prefix.toLowerCase() + ':' + xpathElement.element
                            );
                            let textNode = this._model.createTextNode(values[key]);
                            childNode.appendChild(textNode);
                            this._logger.info(values[key] + ' pushed to ' + JSON.stringify(cache.parent));
                            childNode.setAttribute('profileID', cache.profileID);
                            cache.parent.appendChild(childNode);
                        }
                    }

                }
            } else {
                if (xpathElement.prefix === '@') {
                    this.setProfileIDForAttribute(cache.parent, cache.profileID);

                } else {
                    let childNode = this._model.createElementNS(
                        NAMESPACES[xpathElement.prefix], xpathElement.prefix.toLowerCase() + ':' + xpathElement.element
                    );
                    childNode.setAttribute('profileID', cache.profileID);
                    cache.parent.appendChild(childNode);
                }
            }

        }
        return child;
    }

    private setProfileIDForAttribute(parent: Element, profileID: string) {
        let i = 0;
        while (true) {
            if (parent.getAttribute('profileID_' + i) === null) {
                return parent.setAttribute('profileID_' + i, profileID);
            }
            i = i + 1;
        }
    }
}
