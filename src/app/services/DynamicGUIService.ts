import * as gmlLib from '../model/gml';
import * as isoLib from '../model/iso';
import * as smlLib from '../model/sml';
import * as sweLib from '../model/swe';
import { Http, Response } from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';

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

@Injectable()
export class DynamicGUIService {
    private _loggerFactory: LoggerFactory;
    private _logger: Logger;
    private _insertElements: InsertElements;
    private _model: any;
    private _profile: any;
    constructor(private http: Http) {
        this._loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info)));
        this._logger = this._loggerFactory.getLogger("DynamicGuiService");
        this._insertElements = new InsertElements();
    }

    public getModel(): Observable<Object> {
        let model = new smlLib.PhysicalSystem();
        let path = this.splitXPath("sml:identification/sml:IdentifierList");
        let list = this._insertElements.add(model, path, null);
        //alert(JSON.stringify(model));
        path = this.splitXPath("sml:Identifier/sml:Term/sml:label");
        //alert(JSON.stringify(path));
        let identifierList = new smlLib.IdentifierList();
        this._insertElements.add(list, path, "short name");
        path = this.splitXPath("sml:Identifier/sml:Term/sml:label");
        this._insertElements.add(list, path, "long name");
        // alert(JSON.stringify(model));
        return this.getProfile().map((json: any) => {
            this._logger.info('JSON profile:' + JSON.stringify(json));
            if (json.profile) {
                this._profile = json.profile;
            } else {
                throw new Error('JSON Object has no profile-element!');
            }
            this.createModel();
            this.singleElementsConfiguration();
            this.groupElementsConfiguration();
            this._logger.info('model with the fix values:' + (JSON.stringify(this._model)));
            return this._model;
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
    private singleElementsConfiguration() {
        let elements = this._profile;
        for (var key in elements) {
            if (key.indexOf('element') == 0 && key != 'elementGroup') {
                this.insertSingleElements(this._model, elements[key]);
            }
        }
    }
    private insertSingleElements(model: any, elements: any) {
        if (Array.isArray(elements)) {
            for (var key in elements) {
                this.insertSingleElement(model, elements[key]);
            }
        } else {
            this.insertSingleElement(model, elements);
        }
    }
    private insertSingleElement(model: any, element: any) {
        if (element.restrictions) {
            if (element.restrictions["fixContent"]) {
                if (element.restrictions["fixContent"].value) {
                    let fixValue = element.restrictions["fixContent"].value.__text;
                    if (fixValue) {
                        let xpath = element._XPath;
                        let xpathElement: XPathElement[] = this.splitXPath(xpath);
                        this._insertElements.add(model, xpathElement, fixValue);
                    }
                }
            } else if (element.restrictions["defaultContent"]) {
                if (element.restrictions["defaultContent"].value) {
                    let fixValue = element.restrictions["defaultContent"].value.__text;
                    if (fixValue) {
                        let xpath = element._XPath;
                        let xpathElement: XPathElement[] = this.splitXPath(xpath);
                        this._insertElements.add(model, xpathElement, fixValue);
                    }
                }
            }
        }
    }
    private groupElementsConfiguration() {
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
        for (var key in formComponent) {
            if (key == 'elementGroup') {
                this.processElementGroupRefs(this._model, formComponent[key], "");
            } else if (key == 'formComponent') {
                this.processFormComponents(formComponent[key]);
            }
        }
    }
    private processElementGroupRefs(model: any, elementGroups: any, parentXPath: string) {
        if (Array.isArray(elementGroups)) {
            for (var key in elementGroups) {
                this.processElementGroupRef(model, elementGroups[key], parentXPath);
            }
        } else {
            this.processElementGroupRef(model, elementGroups, parentXPath);
        }
    }
    private processElementGroupRef(model: any, elementGroup: any, parentXPath: string) {
        let groupID = elementGroup._groupRef;
        for (let key in this._profile) {
            if (key == "elementGroup") {
                let elementGroupsGlobal = this._profile[key];
                if (Array.isArray(elementGroupsGlobal)) {
                    for (var _key in elementGroupsGlobal) {
                        if (groupID == elementGroupsGlobal[_key]._groupID) {
                            this.processElementGroup(model, elementGroupsGlobal[_key], parentXPath);
                        }
                    }
                } else {
                    if (groupID == elementGroupsGlobal._groupID) {
                        this.processElementGroup(model, elementGroupsGlobal, parentXPath);
                    }
                }
            }
        }
    }
    private processElementGroup(model: any, elementGroup: any, parentXPath: string) {
        let elements = elementGroup.elements;
        let XPath: string = elementGroup._XPath;
        let sliceLength: number = parentXPath.length;
        if (XPath.substring(sliceLength, sliceLength + 1) == "/") {
            sliceLength = sliceLength + 1;
        }
        XPath = XPath.slice(sliceLength);
        this._logger.info("Element group: sliced XPath: " + XPath);
        let xpath: XPathElement[] = this.splitXPath(XPath);
        let _model = this._insertElements.add(model, xpath, null);
        for (var key in elements) {
            if (key.indexOf('element') == 0 && key != 'elementGroup') {
                this.insertSingleElements(_model, elements[key]);
            } else if (key == "elementGroup") {
                this.processElementGroupRefs(_model, elements[key], XPath);
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
    public add(parent: any, XPath: XPathElement[], value: string): Object {
        let model = parent;
        while (XPath.length > 0) {
            let xpathElement = XPath.shift();
            this._logger.info('XPath.length:' + XPath.length);
            this._logger.info("\n" + 'xpathElement:' + xpathElement.element + '\n' + 'parent:' + JSON.stringify(parent));
            parent = this.insertChild(parent, xpathElement, XPath, value);
        }
        this._logger.info('model:' + JSON.stringify(model))
        return parent;
    }
    private insertChild(parent: any, xpathElement: XPathElement, XPath: XPathElement[], value: string): Object {
        let child;
        if (XPath.length > 0 || (value == null && XPath.length == 0)) {
            if (!Array.isArray(parent)) {
                let childName = this.getChildName(parent, xpathElement.element);
                if (!Array.isArray(parent[childName])) {
                    child = this.setChildAsParentProperty(parent, xpathElement)
                } else {
                    child = parent[this.getChildName(parent, xpathElement.element)];
                }
            } else {
                child = this.pushChildToParent(parent, xpathElement);
            }
        } else {
            parent[xpathElement.element] = value;
            child = parent[xpathElement.element];
        }
        return child;
    }
    private pushChildToParent(parent: any, xpathElement: XPathElement) {
        let child;
        let _class = this.getClass(xpathElement.element, xpathElement.prefix);
        parent.push(_class);
        child = parent[parent.length - 1];
        this._logger.info(child + ' in ' + parent + ' inserted');
        return child;
    }
    private setChildAsParentProperty(parent: any, xpathElement: XPathElement): Object {
        let child;
        let childName = this.getChildName(parent, xpathElement.element);
        let _class = this.getClass(xpathElement.element, xpathElement.prefix);
        parent[childName] = _class;
        child = parent[childName];
        this._logger.info('New child:' + JSON.stringify(child));
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
        throw new Error('Child with name ' + child + ' with parent:' + parent + ' not found!');
    }
}