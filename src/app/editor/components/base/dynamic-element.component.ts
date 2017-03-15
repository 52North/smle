import {
    Component,
    Input,
    ViewChild,
    ComponentFactoryResolver,
    OnChanges,
    SimpleChanges,
    Type,
    Output,
    EventEmitter
} from '@angular/core';
import { HostDirective } from './host.directive';
import { ChildMetadata } from './ChildMetadata';
import { TypedModelComponent } from './TypedModelComponent';

@Component({
    selector: 'dynamic-element',
    templateUrl: 'dynamic-element.component.html'
})
export class DynamicElementComponent implements OnChanges {
    @Input()
    public item: ChildMetadata<any>;

    @Input()
    public componentType: Type<any>;

    @Input()
    public model: any;

    @Input()
    public config: any;

    @Input()
    public isShowAll: boolean = false;

    @Output()
    public openAsChild: EventEmitter<ChildMetadata<any>> = new EventEmitter<ChildMetadata<any>>();

    @ViewChild(HostDirective)
    public listItemHost: HostDirective;

    public publicsubscription: any;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

    public ngOnChanges(changes: SimpleChanges) {
        if (this.isModelSet()) {
            if (changes.model) {
                this.loadComponent();
            }
            if (changes.isShowAll) {
                this.loadComponent();
            }
        }
    }

    public createElement() {
        if (Array.isArray(this.model) && this.model.length === 0) {
            let model = (new this.componentType()).createModel();
            this.model.push(model);
        } else {
            this.model = (new this.componentType()).createModel();
        }
        this.loadComponent();
    }

    public loadComponent() {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.componentType);
        let viewContainerRef = this.listItemHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        if (Array.isArray(this.model)) {
            (<TypedModelComponent<any>>componentRef.instance).model = this.model[0];
        } else {
            (<TypedModelComponent<any>>componentRef.instance).model = this.model;
        }
        (<TypedModelComponent<any>>componentRef.instance).config = this.config;
        (<TypedModelComponent<any>>componentRef.instance).isShowAll = this.isShowAll;
        (<TypedModelComponent<any>>componentRef.instance).openAsChild.subscribe((childMetadata) => {
            this.openAsChild.emit(childMetadata);
        });
    }

    public isModelSet(): boolean {
        if (Array.isArray(this.model) && this.model.length > 0) return true;
        if (!Array.isArray(this.model) && this.model) return true;
        return false;
    }

}
