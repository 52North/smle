import {LFService, LoggerFactoryOptions, LogLevel, LogGroupRule, LoggerFactory, Logger} from "typescript-logging"

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
export class BidiMap {
    private elementToID: Map<any, Map<string, string>>;
    private IDToElement: Map<string, ObjectAndProperty>;
    private _loggerFactory: LoggerFactory;
    private _logger: Logger;

    constructor() {
        this.elementToID = new Map<any, Map<string, string>>();
        this.IDToElement = new Map<string, ObjectAndProperty>();

        this._loggerFactory = LFService.createLoggerFactory(new LoggerFactoryOptions()
            .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Fatal)));
        this._logger = this._loggerFactory.getLogger("BidiMap");
    }
    public addLinkage(elementObject: any, objectProperty: string, profileID: string) {
        let elementAndPrefix = new ObjectAndProperty(elementObject, objectProperty);
        let innerMap = this.elementToID.get(elementObject);
        if (!innerMap) {
            innerMap = new Map<string, string>();
        }
        innerMap.set(objectProperty, profileID);
        this.elementToID.set(elementObject, innerMap);
        this.IDToElement.set(profileID, elementAndPrefix);
    }
    public getProfileID(modelObject: any, objectProperty: string): string {
        if (!modelObject || !objectProperty) throw new Error("One or both paramerter error: modelObject" + modelObject + " objectProperty:" + objectProperty);
        this._logger.info("get ProfileID for object:" + modelObject + " and property: " + objectProperty);
        if (this.elementToID.get(modelObject) instanceof Map) {
            let innerMap = this.elementToID.get(modelObject);
            this._logger.info("found entry in BidiMap for object:" + modelObject);
            return innerMap.get(objectProperty);
        }

    }
    public getElementObject(profileID: string): any {
        return this.IDToElement.get(profileID);
    }
}


