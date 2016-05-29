import {StackedItemEventService} from "../../services/StackedItemEventService";
import {Type} from '@angular/core/src/facade/lang';

export abstract class EditorComponent {
    public model;
    public editing:boolean = true;

    constructor(private eventService:StackedItemEventService) {
    }

    protected extendModel():void {
        jQuery.extend(this.model, this.createModel());
    }

    protected abstract createModel():any;

    protected openNewItem(componentType:Type, model:any) {
        this.eventService.fireOpenEvent(componentType,model);
    }
}