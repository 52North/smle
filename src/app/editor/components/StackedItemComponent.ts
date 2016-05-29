import {
    Component,
    ElementRef,
    ViewContainerRef,
    ViewRef,
    ComponentResolver,
    ComponentRef,
    OnDestroy,
    Injector,
    ApplicationRef
} from '@angular/core';
import {StackedItemEventService, OpenEventData, CloseEventData} from "../../services/StackedItemEventService";
import {Type} from '@angular/core/src/facade/lang';
import {EditorComponent} from "./EditorComponent";

@Component({
    selector: 'stacked-item',
    template: require('./StackedItemComponent.html'),
    directives: [],
    providers: [StackedItemEventService]
})
export class StackedItemComponent implements OnDestroy {
    private previousComponent:StackedItemComponent;

    private nextComponentRef:ComponentRef<StackedItemComponent>;
    private childComponentRef:ComponentRef<EditorComponent>;

    private subscriptions:Array<any> = [];

    public contentId:string;

    constructor(private eventService:StackedItemEventService,
                private componentResolver:ComponentResolver,
                private viewContainerRef:ViewContainerRef,
                private injector:Injector) {

        this.contentId = this.generateContentId(0, 1000000);

        this.subscriptions.push(this.eventService.open.subscribe((eventData:OpenEventData)=> {
            this.componentResolver.resolveComponent(StackedItemComponent).then((componentFactory)=> {
                this.nextComponentRef = this.viewContainerRef.createComponent(componentFactory);
                this.nextComponentRef.instance.embedComponent(this, eventData.getComponentType(), eventData.getModel());
            });
        }));

        this.subscriptions.push(this.eventService.close.subscribe((eventData:CloseEventData)=> {

        }));
    }

    private generateContentId(min:number, max:number) {
        return 'id' + Math.floor(Math.random() * (max - min + 1)) + min;
    }

    embedComponent(caller:StackedItemComponent, componentType:Type, model:any) {
        this.previousComponent = caller;
        this.componentResolver.resolveComponent(componentType).then((componentFactory)=> {
            //this.childComponentRef = componentFactory.create(this.injector, null, 'ng-content'/*`#${this.contentId}`*/);
            this.childComponentRef = this.viewContainerRef.createComponent(componentFactory, 0);
            this.childComponentRef.instance.model = model;
        });
    }

    saveAndClose() {
        //Save
        this.close();
    }

    close() {
        if (this.nextComponentRef) {
            this.nextComponentRef.instance.close();
        }

        if (this.previousComponent) {
            this.previousComponent.closeNext();
        }
    }

    private closeNext() {
        this.nextComponentRef.destroy();
        this.nextComponentRef = null;
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription)=> {
            subscription.dispose();
        });
    }
}