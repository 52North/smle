import * as gmlLib from '../model/gml';
import * as isoLib from '../model/iso';
import * as smlLib from '../model/sml';
import * as sweLib from '../model/swe';
import { Http, Response } from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import { JSONDescriptionConfig } from './config/JSONDescriptionConfig';

import {LFService, LoggerFactoryOptions, LogLevel, LogGroupRule, LoggerFactory, Logger} from "typescript-logging"

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
    private _parent: any;
    private _config: Object;
    constructor(parent?: any, config?: Object) {
        this._parent = parent;
        this._config = config;
    }
    get parent(): any {
        return this._parent;
    }
    set parent(parent: any) {
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
    private _label: string;
    private _existInForm: boolean;
    constructor() {
        this._fixValue = false;
        this._requireValue = true;
        this._hideField = new FormFields();
        this._existInForm = true;
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
    get label(): string {
        return this._label;
    }
    set label(label: string) {
        this._label = label;
    }
    get existInForm(): boolean {
        return this._existInForm;
    }
    set existInForm(existInForm: boolean) {
        this._existInForm = existInForm;
    }
}
class ConfigSet {
    private _value: string;
    private _configuration: Configuration;
    get value(): string {
        return this._value;
    }
    set value(value: string) {
        this._value = value;
    }
    get configuration(): Configuration {
        return this._configuration;
    }
    set configuration(configuration: Configuration) {
        this._configuration = configuration;
    }
}
export class ReturnObject {
    private _model: any;
    private _configuration: JSONDescriptionConfig;
    get model(): any {
        return this._model;
    }
    set model(model: any) {
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
    private _model: any;
    private _profile: any;
    private _config: Object;

    constructor(private http: Http) {
        this._loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info)));
        this._logger = this._loggerFactory.getLogger("DynamicGuiService");
        this._insertElements = new InsertElements();
        this._config = {};
    }

    public getModelAndConfiguration(): Observable<Object> {
        let model = new smlLib.PhysicalSystem();
        let cache = new Cache(model, {});
        let path = this.splitXPath("sml:identification/sml:IdentifierList");
        let set = new ConfigSet();
        let list = this._insertElements.add(cache, path, set);
        //alert(JSON.stringify(model));
        path = this.splitXPath("sml:Identifier/sml:Term/sml:label");
        //alert(JSON.stringify(path));
        let identifierList = new smlLib.IdentifierList();
        set.value = "short name";
        this._insertElements.add(list, path, set);
        path = this.splitXPath("sml:Identifier/sml:Term/sml:label");
        set.value = "long name";
        this._insertElements.add(list, path, set);
        // alert(JSON.stringify(model));
        return this.getProfile().map((json: any) => {
            this._logger.info('JSON profile:' + JSON.stringify(json));
            if (json.profile) {
                this._profile = json.profile;
            } else {
                throw new Error('JSON Object has no profile-element!');
            }
            this.createModel();
            this.configure();
            this._logger.info('model with the fix values:' + (JSON.stringify(this._model)));
            this._logger.info('configuration:' + (JSON.stringify(this._config)));
            let returnObject = new ReturnObject();
            returnObject.model = this._model;
            returnObject.configuration = new JSONDescriptionConfig(this._config, true);
            return returnObject;
        });

    }
    private createModel() {
        let modelClass: XPathElement[] = this.splitXPath(this._profile._class);
        if (modelClass.length == 1) {
            this._model = this._insertElements.getClass(modelClass[0].element, modelClass[0].prefix);
        } else {
            throw new Error('Class of the profile has not the right format!');
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
    private processFormComponent(formComponent: any) {
        if (!this._config["description"]) {
            this._config["description"] = {};
        }
        let config = this._config["description"];
        let cache = new Cache(this._model, config);
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
            if (key.indexOf('element') == 0 && key != 'elementGroup') {
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
                            this.processElementGroup(cache, elementGroupsGlobal[_key], parentXPath);
                        }
                    }
                } else {
                    if (groupID == elementGroupsGlobal._groupID) {
                        this.processElementGroup(cache, elementGroupsGlobal, parentXPath);
                    }
                }
            }
        }
    }
    private processElementGroup(cache: Cache, elementGroup: any, parentXPath: string) {
        let elements = elementGroup.elements;
        let XPath: string = elementGroup._XPath;
        let sliceLength: number = parentXPath.length;
        if (XPath.substring(sliceLength, sliceLength + 1) == "/") {
            sliceLength = sliceLength + 1;
        }
        XPath = XPath.slice(sliceLength);
        this._logger.info("Element group: sliced XPath: " + XPath);
        let xpath: XPathElement[] = this.splitXPath(XPath);
        let set = new ConfigSet();
        let _cache = this._insertElements.add(cache, xpath, set);
        for (var key in elements) {
            if (key.indexOf('element') == 0 && key != 'elementGroup') {
                this.insertSingleElements(_cache, elements[key]);
            } else if (key == "elementGroup") {
                this.processElementGroupRefs(_cache, elements[key], XPath);
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
        let set = new ConfigSet();
        set.configuration = new Configuration();
        set.value = null;
        if (element.restrictions) {
            if (element.restrictions["fixContent"]) {
                if (element.restrictions["fixContent"].value) {
                    set.value = element.restrictions["fixContent"].value.__text;
                    set.configuration.fixValue = true;
                }

            } else {
                if (element.restrictions["defaultContent"]) {
                    if (element.restrictions["defaultContent"].value) {
                        set.value = element.restrictions["defaultContent"].value.__text;
                    }
                }
                if (element.restrictions["use"]) {
                    if (element.restrictions["use"].__text == "optional") {
                        set.configuration.requireValue = false;
                    }
                }

            }
        }

        if (element["input"]) {
            let input = element["input"];
            for (var key in input) {
                if (input[key]._hide == "true") {
                    set.configuration.hideField[key] = true;
                    this._logger.info("For element " + JSON.stringify(element) + " form field " + key + " is hidden");
                } else if (!(key.indexOf("_") == 0)) {
                    set.configuration.hideField[key] = false;
                    this._logger.info("For element " + JSON.stringify(element) + " form field " + key + " is visible");
                }
            }
        } else {
            set.configuration.existInForm = false;
        }
        if (element["label"]) {
            let label: string = element["label"].__text;
            if (label.length > 0) {
                set.configuration.label = label;
            }
        }
        let xpath = element._XPath;
        let xpathElement: XPathElement[] = this.splitXPath(xpath);
        this._insertElements.add(cache, xpathElement, set);
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
        let XPath_splitted: XPathElement[] = [];
        let elements = XPath.split("/");
        for (let element of elements) {
            let prefix_elementName = element.split(":");
            if (prefix_elementName.length == 2) {
                XPath_splitted.push(new XPathElement(prefix_elementName[1], prefix_elementName[0]));
            } else if (prefix_elementName.length == 1) {
                let XPath_attribute = prefix_elementName[0].slice(1);
                XPath_splitted.push(new XPathElement(XPath_attribute, "@"));
            }

        }
        return XPath_splitted;
    }
}

class InsertElements {
    private _loggerFactory: LoggerFactory;
    private _logger: Logger;

    constructor() {
        this._loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info)));
        this._logger = this._loggerFactory.getLogger("DynamicGuiService");
    }
    public add(cache: Cache, XPath: XPathElement[], set: ConfigSet): Cache {
        while (XPath.length > 0) {
            let xpathElement = XPath.shift();
            this._logger.info('XPath.length:' + XPath.length);
            this._logger.info("\n" + 'xpathElement:' + xpathElement.element + '\n' + 'parent:' + JSON.stringify(cache.parent));
            cache = this.insertChild(cache, xpathElement, XPath, set);
        }
        return cache;
    }
    private insertChild(cache: Cache, xpathElement: XPathElement, XPath: XPathElement[], set: ConfigSet): Cache {
        let child = new Cache();
        child.config = cache.config;
        if (XPath.length > 0 || (typeof set.value == 'undefined' && XPath.length == 0)) {
            if (!Array.isArray(cache.parent)) {
                let childName = this.getChildName(cache.parent, xpathElement.element);
                if (!cache.config[childName]) {
                    cache.config[childName] = {};
                    this._logger.info('new configuration element added: ' + childName + ' result: ' + JSON.stringify(cache.config[childName]));
                }
                child.config = cache.config[childName];
                if (Array.isArray(cache.parent[childName])) {
                    child.parent = cache.parent[this.getChildName(cache.parent, xpathElement.element)];
                } else {
                    throw new Error('Child is not an array and no value has been passed!');
                }
            } else {
                child = this.pushChildToParent(cache, xpathElement);
            }
        } else {
            let childName = this.getChildName(cache.parent, xpathElement.element);
            if (childName != null) {
                if (set.value != null) {
                    let values = set.value.split(",");
                    for (var key in values) {
                        cache.parent[childName].push(values[key]);
                    }
                }
                child.parent = cache.parent[childName];
                child.config[childName] = set.configuration;
            } else {
                cache.parent[xpathElement.element] = set.value;
                child.parent = cache.parent[xpathElement.element];
                child.config[xpathElement.element] = set.configuration;
            }

        }
        return child;
    }
    private pushChildToParent(cache: Cache, xpathElement: XPathElement): Cache {
        let child = new Cache();
        child.config = cache.config;
        let _class = this.getClass(xpathElement.element, xpathElement.prefix);
        cache.parent.push(_class);
        child.parent = cache.parent[cache.parent.length - 1];
        this._logger.info(child.parent + ' in ' + cache.parent + ' inserted');
        return child;
    }

    public getClass(name: string, prefix: string): Object {
        if (prefix == "gml") {
            return this._getClass(name, gmlLib);
        } else if (prefix == "iso") {
            return this._getClass(name, isoLib);
        } else if (prefix == "sml") {
            return this._getClass(name, smlLib);
        } else if (prefix == "swe") {
            return this._getClass(name, sweLib);
        }
        throw new Error('Prefix not found!');
    }
    private _getClass(name: string, prefix: Object): Object {
        for (let _class in prefix) {
            if (name.toLowerCase().includes(_class.toLowerCase())) {
                return new prefix[_class]();
            }
        }
        throw new Error('Class with name:' + name + ' not found!');
    }


    private getChildName(parent: Object, child: string): string {
        for (let _child in parent) {
            if (_child.toLowerCase().includes(child.toLowerCase())) {
                return _child;
            }
        }
        return null;
    }
}