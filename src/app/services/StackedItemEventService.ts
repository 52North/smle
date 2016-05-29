import {Injectable, EventEmitter, Output} from '@angular/core';
import {StackedItemComponent} from "../editor/components/StackedItemComponent";
import {Type} from '@angular/core/src/facade/lang';

export class OpenEventData {
    constructor(private componentType:Type, private model:any) {
    }

    public getComponentType() {
        return this.componentType;
    }

    public getModel() {
        return this.model;
    }
}

export class CloseEventData {

}

@Injectable()
export class StackedItemEventService {
    @Output() open:EventEmitter<OpenEventData> = new EventEmitter();
    @Output() close:EventEmitter<CloseEventData> = new EventEmitter();

    constructor() {
    }

    fireCloseEvent(componentInstance:StackedItemComponent) {
        this.close.emit({});
    }

    fireOpenEvent(componentType:Type, model:any) {
        this.open.emit(new OpenEventData(componentType, model));
    }
}