import * as gmlLib from '../model/gml';
import * as isoLib from '../model/iso';
import * as smlLib from '../model/sml';
import * as sweLib from '../model/swe';
import { Http, Response } from '@angular/http';
import {Injectable} from '@angular/core';

import {LFService, LoggerFactoryOptions, LogLevel, LogGroupRule, LoggerFactory, Logger} from "typescript-logging"

declare var X2JS: any;
declare var jQuery: any;
var model;
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
    private loggerFactory: LoggerFactory;
    private logger: Logger;
    constructor(private http: Http) {
        this.loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info)));
        this.logger = this.loggerFactory.getLogger("DynamicGuiService");
    }


    public getProfile() {

        this.getClass("Term", "sml");
        // alert(this.getType(new sml.ClassifierList()));
        let system = new smlLib.PhysicalSystem();

        let path = this.splitXPath("sml:identification/sml:IdentifierList/sml:Identifier/sml:Term/sml:label");
        let model = this.insertElement(system, path, "short name");
        alert(JSON.stringify(model));
        path = this.splitXPath("sml:Identifier/sml:Term/sml:label");
        //alert(JSON.stringify(path));
        let identifierList = new smlLib.IdentifierList();
        let model1 = this.insertElement(identifierList, path, "short name");
        path = this.splitXPath("sml:Identifier/sml:Term/sml:label");
        model1 = this.insertElement(identifierList, path, "long name");
        alert(JSON.stringify(model1));
        return this.http.get('./profiles/Profile2_discovery.xml').toPromise().then((response: Response) => {
            var x2js = new X2JS();
            var json = x2js.xml2js(response.text());
            //alert(JSON.stringify(json));
            return json;
        });

    }
    private insertElement(parent: any, XPath: XPathElement[], value: string): Object {
        let model = parent;
        let child;
        let size = XPath.length;
        for (let i = 0; i < size; i++) {
            let element = XPath.shift();
            this.logger.info('XPath.length:' + XPath.length);
            this.logger.info("\n" + 'element:' + element.element + '\n' + 'parent:' + JSON.stringify(parent) + "\n" + 'child:' + JSON.stringify(child));
            if (XPath.length > 0 || (value == null && XPath.length == 0)) {
                let parent_type = this.getParentType(parent);
                this.logger.info('parent_Type:' + parent_type);
                if (parent_type != "array") {
                    let child_type = this.getChildType(parent, this.getChildName(parent, element.element));
                    this.logger.info('childType:' + child_type);
                    if (child_type != "array") {
                        let childName = this.getChildName(parent, element.element);
                        let _class = this.getClass(element.element, element.prefix);
                        parent[childName] = _class;
                        child = parent[childName];
                        this.logger.info('New child:' + JSON.stringify(child));
                    } else {
                        child = parent[this.getChildName(parent, element.element)];
                    }

                } else {
                    let _class = this.getClass(element.element, element.prefix);
                    parent.push(_class);
                    child = parent[parent.length - 1];
                    this.logger.info(child + ' in ' + parent + ' inserted');
                }
            } else {
                parent[element.element] = value;
            }
            parent = child;
        }
        this.logger.info('model:' + JSON.stringify(model))
        return model;
    }
    private splitXPath(XPath: string): XPathElement[] {
        let XPath_splitted: XPathElement[] = [];
        let elements = XPath.split("/");
        for (let element of elements) {
            let prefix_elementName = element.split(":");
            if (prefix_elementName.length = 2) {
                XPath_splitted.push(new XPathElement(prefix_elementName[1], prefix_elementName[0]));
            } else if (prefix_elementName.length = 1) {
                let XPath_attribute = prefix_elementName[0].slice(1);
                XPath_splitted.push(new XPathElement(XPath_attribute, "@"));
            }

        }
        return XPath_splitted;
    }
    private getClass(name: string, prefix: string): Object {
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
    private getParentType(parent: any): string {
        let _type = jQuery.type(parent);
        if (_type) {
            return _type;
        } else {
            throw new Error('Type of parent:' + parent + ' not found!');
        }
    }

    private getChildType(parent: any, child: string): string {
        let _type = jQuery.type(parent[child]);
        if (_type) {
            return _type;
        } else {
            throw new Error('Type of child:' + child + ' with parent:' + parent + ' not found!');
        }
    }
    public getChild(parent: Object, child: string): any {
        for (let _child in parent) {
            if (child.toLowerCase().includes(_child.toLowerCase())) {
                return parent[_child];
            }
        }
        throw new Error('Child with name ' + child + ' with parent:' + parent + ' not found!');
    }
    public getChildName(parent: Object, child: string): string {
        for (let _child in parent) {
            if (_child.toLowerCase().includes(child.toLowerCase())) {
                return _child;
            }
        }
        throw new Error('Child with name ' + child + ' with parent:' + parent + ' not found!');
    }
}