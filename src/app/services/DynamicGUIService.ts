import * as gmlLib from '../model/gml';
import * as gmdLib from '../model/iso/gmd';
import * as smlLib from '../model/sml';
import * as sweLib from '../model/swe';
import { Http, Response } from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import { JSONDescriptionConfig } from './config/JSONDescriptionConfig';

import {LFService, LoggerFactoryOptions, LogLevel, LogGroupRule, LoggerFactory, Logger} from "typescript-logging"

import {SensorMLDocumentEncoder} from './xml/SensorMLDocumentEncoder';
import {SensorMLDocumentDecoder} from './xml/SensorMLDocumentDecoder';
import { AbstractProcess } from '../model/sml/AbstractProcess';
import { Namespaces } from './xml/Namespaces';

declare var X2JS: any;
declare var jQuery: any;

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
class Cache {
    private _parent: Element;
    private _config: Object;
    constructor(parent?: Element, config?: Object) {
        this._parent = parent;
        this._config = config;
    }
    get parent(): Element {
        return this._parent;
    }
    set parent(parent: Element) {
        this._parent = parent;
    }
    get config(): Object {
        return this._config;
    }
    set config(config: Object) {
        this._config = config;
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
    constructor() {
        this._fixValue = false;
        this._requireValue = true;
        this._hideField = new FormFields();
        this._existInForm = true;
        this._fixQuantity = false;
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
}

export class ReturnObject {
    private _model: AbstractProcess;
    private _configuration: JSONDescriptionConfig;
    get model(): AbstractProcess {
        return this._model;
    }
    set model(model: AbstractProcess) {
        this._model = model;
    }
    get configuration(): JSONDescriptionConfig {
        return this._configuration;
    }
    set configuration(configuration: JSONDescriptionConfig) {
        this._configuration = configuration;
    }
}

@Injectable()
export class DynamicGUIService {
    private _loggerFactory: LoggerFactory;
    private _logger: Logger;
    private _insertElements: InsertElements;
    private _model: Document;
    private _profile: any;
    private _config: Object;
    private _sensorML_decoder: SensorMLDocumentDecoder;

    constructor(private http: Http) {
        this._loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info)));
        this._logger = this._loggerFactory.getLogger("DynamicGuiService");
        this._config = {};
        this._sensorML_decoder = new SensorMLDocumentDecoder();
    }

    public getModelAndConfiguration(): Observable<Object> {
        let model = new smlLib.PhysicalSystem();
        let encoder = new SensorMLDocumentEncoder();
        this._model = encoder.createDocumentForProcess(model);
        let cache = new Cache(this._model.documentElement, {});
        let path = this.splitXPath("sml:identification/sml:IdentifierList");
        let configuration = new Configuration;
        this._insertElements = new InsertElements(this._model);
        let list = this._insertElements.add(cache, path, configuration);
        //alert(JSON.stringify(model));
        path = this.splitXPath("sml:Identifier/sml:Term/sml:label");
        //alert(JSON.stringify(path));
        let identifierList = new smlLib.IdentifierList();
        configuration.valueFix = "short name";

        this._insertElements.add(list, path, configuration);
        path = this.splitXPath("sml:Identifier/sml:Term/sml:label");
        configuration.valueFix = "long name";
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
            this._logger.info('model with the fix values:' + (this._model.documentElement.innerHTML));
            this._logger.info('configuration:' + (JSON.stringify(this._config)));
            let returnObject = new ReturnObject();
            returnObject.model = this._sensorML_decoder.decode(this._model);
            this._logger.info('model with the fix values:' + JSON.stringify(returnObject.model));
            returnObject.configuration = new JSONDescriptionConfig(this._config, true);
            return returnObject;
        });

    }
    private createModel() {
        let modelClass: XPathElement[] = this.splitXPath(this._profile._class);
        if (modelClass.length == 1) {
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
            for (var key in formComponents) {
                this.processFormComponent(formComponents[key]);
            }
        }
        else {
            this.processFormComponent(formComponents);
        }
    }
    private setAbstractConfigurations() {
        for (let key in this._profile) {
            if (key.indexOf('abstract') == 0) {
                let abstractElements = this._profile[key];
                if (Array.isArray(abstractElements)) {
                    for (var _key in abstractElements) {
                        this.setAbstractConfiguration(abstractElements[_key]);
                    }
                } else {
                    this.setAbstractConfiguration(abstractElements);

                }

            }
        }
    }
    private setAbstractConfiguration(abstractElement: any) {
        let XPath: XPathElement[] = this.splitXPath(abstractElement._XPath);
        let configuration = new Configuration();
        this.setConfiguration(abstractElement, configuration);
        let config = this._config["description"];
        while (XPath.length > 0) {
            let xpathElement = XPath.shift();
            let prefix_elementName = xpathElement.prefix.toLowerCase() + ":" + xpathElement.element;
            if (!config[prefix_elementName]) {
                config[prefix_elementName] = {};
            }

            if (XPath.length == 0) {
                Object.assign(config[prefix_elementName], configuration);
            } else {
                config = config[prefix_elementName];
            }
        }
    }
    private processFormComponent(formComponent: any) {
        if (!this._config["description"]) {
            this._config["description"] = {};
        }
        let config = this._config["description"];
        let cache = new Cache(this._model.documentElement, config);
        for (var key in formComponent) {
            if (key == 'elementGroup') {
                this.processElementGroupRefs(cache, formComponent[key], "");
            } else if (key == 'formComponent') {
                this.processFormComponents(formComponent[key]);
            } else if (key == 'element') {
                this.processElementRefs(cache, formComponent[key]);
            }
        }
    }
    private processElementRefs(cache: Cache, elements: any) {
        if (Array.isArray(elements)) {
            for (var key in elements) {
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
            if (key.indexOf('element') == 0 && key != 'elementGroup' && key != 'elementGroupRef') {
                let elementGlobal = this._profile[key];
                if (Array.isArray(elementGlobal)) {
                    for (var _key in elementGlobal) {
                        if (ref == elementGlobal[_key]._ID) {
                            this._logger.info('Single global element found: ' + elementGlobal[_key]._ID);
                            this.insertSingleElement(cache, elementGlobal[_key]);
                        }
                    }
                } else {
                    if (ref == elementGlobal._ID) {
                        this._logger.info('Single global element found: ' + elementGlobal._ID);
                        this.insertSingleElement(cache, elementGlobal);
                    }
                }
            }
        }
    }
    private processElementGroupRefs(cache: Cache, elementGroups: any, parentXPath: string) {
        if (Array.isArray(elementGroups)) {
            for (var key in elementGroups) {
                this.processElementGroupRef(cache, elementGroups[key], parentXPath);
            }
        } else {
            this.processElementGroupRef(cache, elementGroups, parentXPath);
        }
    }
    private processElementGroupRef(cache: Cache, elementGroup: any, parentXPath: string) {
        let groupID = elementGroup._groupRef;
        for (let key in this._profile) {
            if (key == "elementGroup") {
                let elementGroupsGlobal = this._profile[key];
                if (Array.isArray(elementGroupsGlobal)) {
                    for (var _key in elementGroupsGlobal) {
                        if (groupID == elementGroupsGlobal[_key]._groupID) {
                            this.processElementGroup(cache, elementGroupsGlobal[_key], parentXPath, true);
                        }
                    }
                } else {
                    if (groupID == elementGroupsGlobal._groupID) {
                        this.processElementGroup(cache, elementGroupsGlobal, parentXPath, true);
                    }
                }
            }
        }
    }
    private processElementGroups(cache: Cache, elementGroups: any, parentXPath: string, global: boolean) {
        if (Array.isArray(elementGroups)) {
            for (var key in elementGroups) {
                this.processElementGroup(cache, elementGroups[key], parentXPath, global);
            }
        } else {
            this.processElementGroup(cache, elementGroups, parentXPath, global);
        }
    }
    private processElementGroup(cache: Cache, elementGroup: any, parentXPath: string, global: boolean) {
        let elements = elementGroup.elements;
        let XPath: string = elementGroup._XPath;
        if (global) {
            let sliceLength: number = parentXPath.length;
            if (XPath.substring(sliceLength, sliceLength + 1) == "/") {
                sliceLength = sliceLength + 1;
            }
            XPath = XPath.slice(sliceLength);
            this._logger.info("Element group: sliced XPath: " + XPath);
        }

        let xpath: XPathElement[] = this.splitXPath(XPath);
        let configuration = new Configuration();
        if (elementGroup["occurrence"]) {
            let fixQuantity = elementGroup["occurrence"].fixQuantity;
            if (fixQuantity) {
                configuration.fixQuantity = true;
            }
        }

        let _cache = this._insertElements.add(cache, xpath, configuration);
        for (var key in elements) {
            if (key.indexOf('element') == 0 && key != 'elementGroup' && key != 'elementGroupRef') {
                this.insertSingleElements(_cache, elements[key]);
            } else if (key == "elementGroupRef") {
                this.processElementGroupRefs(_cache, elements[key], XPath);
            } else if (key == "elementGroup") {
                this.processElementGroups(_cache, elements[key], XPath, false);
            }
        }
    }

    private insertSingleElements(cache: Cache, elements: any) {
        if (Array.isArray(elements)) {
            for (var key in elements) {
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
        this.setConfiguration(element, configuration);
        let xpath = element._XPath;
        let xpathElement: XPathElement[] = this.splitXPath(xpath);
        this._insertElements.add(cache, xpathElement, configuration);
    }

    private setConfiguration(element: any, configuration: Configuration) {
        if (element.restrictions) {
            if (element.restrictions["fixContent"]) {
                if (element.restrictions["fixContent"].value) {
                    configuration.valueFix = element.restrictions["fixContent"].value.__text;
                    configuration.fixValue = true;
                }

            } else {
                if (element.restrictions["defaultContent"]) {
                    if (element.restrictions["defaultContent"].value) {
                        configuration.valueDefault = element.restrictions["defaultContent"].value.__text;
                    }
                }
                if (element.restrictions["use"]) {
                    if (element.restrictions["use"].__text == "optional") {
                        configuration.requireValue = false;
                    }
                }

            }
        }

        if (element["input"]) {
            let input = element["input"];
            for (var key in input) {
                if (input[key]._hide == "true") {
                    configuration.hideField[key] = true;
                    this._logger.info("For element " + JSON.stringify(element) + " form field " + key + " is hidden");
                } else if (!(key.indexOf("_") == 0)) {
                    configuration.hideField[key] = false;
                    this._logger.info("For element " + JSON.stringify(element) + " form field " + key + " is visible");
                }
            }
        } else {
            configuration.existInForm = false;
        }
        if (element["occurrence"]) {
            let fixQuantity = element["occurrence"].fixQuantity;
            if (fixQuantity) {
                configuration.fixQuantity = true;
            }
        }
    }

    private getProfile(): Observable<JSON> {
        return this.http.get('../../profiles/Profile2_discovery.xml').map((response: Response) => {
            var x2js = new X2JS();
            var json = x2js.xml2js(response.text());
            //   alert(JSON.stringify(json));
            return json;
        });
    }
    private splitXPath(XPath: string): XPathElement[] {
        this._logger.info('XPath to split:' + XPath);
        let XPath_splitted: XPathElement[] = [];
        let elements = XPath.split("/");
        for (let element of elements) {
            let prefix_elementName = element.split(":");
            if (prefix_elementName.length == 2) {
                XPath_splitted.push(new XPathElement(prefix_elementName[1], prefix_elementName[0].toUpperCase()));
            } else if (prefix_elementName.length == 1) {
                let XPath_attribute = prefix_elementName[0].slice(1);
                XPath_splitted.push(new XPathElement(XPath_attribute, "@"));
            }

        }
        this._logger.info('New splitted XPath: ' + JSON.stringify(XPath_splitted));
        return XPath_splitted;
    }

    public setModel(modelClass: string) {
        let encoder = new SensorMLDocumentEncoder();
        let description: AbstractProcess;
        switch (modelClass) {
            case 'PhysicalSystem': {
                description = new smlLib.PhysicalSystem();
                this._model = encoder.createDocumentForProcess(description);
                break;
            }
            case 'PhysicalComponent': {
                description = new smlLib.PhysicalComponent();
                this._model = encoder.createDocumentForProcess(description);
                break;
            }
            case 'SimpleProcess': {
                description = new smlLib.SimpleProcess();
                this._model = encoder.createDocumentForProcess(description);
            }
            case 'AggregateProcess': {
                description = new smlLib.AggregateProcess();
                this._model = encoder.createDocumentForProcess(description);
                break;
            }
            default: {
                throw new Error('Class of the profile is not one of: PhysicalSystem, PhysicalComponent, SimpleProcess, AggregateProcess');
            }
        }
    }

}

class InsertElements {
    private _loggerFactory: LoggerFactory;
    private _logger: Logger;
    private _model: Document;
    constructor(model: Document) {
        this._loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info)));
        this._logger = this._loggerFactory.getLogger("DynamicGuiService");
        this._model = model;
    }
    public add(cache: Cache, XPath: XPathElement[], configuration: Configuration): Cache {
        while (XPath.length > 0) {
            let xpathElement = XPath.shift();
            this._logger.info('XPath.length:' + XPath.length);
            this._logger.info("\n" + 'xpathElement:' + xpathElement.element + '\n' + 'parent:' + JSON.stringify(cache.parent));
            cache = this.insertChild(cache, xpathElement, XPath, configuration);
        }
        return cache;
    }
    private insertChild(cache: Cache, xpathElement: XPathElement, XPath: XPathElement[], configuration: Configuration): Cache {
        let child = new Cache();
        let childName = xpathElement.element;
        let prefixAndChildName = xpathElement.prefix.toLowerCase() + ":" + xpathElement.element;
        if (XPath.length > 0 || (typeof configuration.valueFix == 'undefined' && typeof configuration.valueDefault == 'undefined')) {
            let childNode = this._model.createElementNS(Namespaces[xpathElement.prefix], xpathElement.prefix.toLowerCase() + ":" + childName)
            cache.parent.appendChild(childNode);
            this._logger.info("New child: " + childNode.tagName + " appended");
            child.parent = childNode;

            if (XPath.length == 0) {
                cache.config[prefixAndChildName] = configuration;
                child.config = cache.config[prefixAndChildName];
            } else {
                if (!cache.config[prefixAndChildName]) {
                    cache.config[prefixAndChildName] = {};
                    this._logger.info('new configuration element added: ' + prefixAndChildName + ' result: ' + JSON.stringify(cache.config[childName]));
                }
                child.config = cache.config[prefixAndChildName];
            }

        } else {
            if (configuration.valueFix != null || configuration.valueDefault != null) {
                let value;
                if(configuration.valueFix!= null){
                    value=configuration.valueFix;
                }else{
                    value=configuration.valueDefault;
                }
                if (xpathElement.prefix == "@") {
                    cache.parent.setAttribute(xpathElement.element, value);
                } else {
                    let childNode: Element;
                    let values = value.split(",");
                    for (var key in values) {
                        childNode = this._model.createElementNS(Namespaces[xpathElement.prefix], xpathElement.prefix.toLowerCase() + ":" + xpathElement.element);
                        let textNode = this._model.createTextNode(values[key]);
                        childNode.appendChild(textNode);
                        this._logger.info(values[key] + ' pushed to ' + JSON.stringify(cache.parent));
                        cache.parent.appendChild(childNode);
                    }

                }
            }

            cache.config[prefixAndChildName] = configuration;
            child.config = cache.config[prefixAndChildName];
        }
        return child;
    }
}