import { Component, ComponentFactoryResolver, ViewContainerRef, AfterContentInit, OnInit } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { NamedSweDataComponent } from '../../../model/sml/NamedSweDataComponent';
import { SweText } from '../../../model/swe/SweText';
import { SweTime } from '../../../model/swe/SweTime';
import { SweCount } from '../../../model/swe/SweCount';
import { SweBoolean } from '../../../model/swe/SweBoolean';
import { SweQuantity } from '../../../model/swe/SweQuantity';
import { SweCategory } from '../../../model/swe/SweCategory';
import { SweTimeRange } from '../../../model/swe/SweTimeRange';
import { SweQuantityRange } from '../../../model/swe/SweQuantityRange';
import { SweDataRecord } from '../../../model/swe/SweDataRecord';
import { SweDataArray } from '../../../model/swe/SweDataArray';
import { SweField } from '../../../model/swe/SweField';

export enum ComponentType {
    Unknown = 0,
    SweText = 1,
    SweTime = 2,
    SweCount = 3,
    SweBoolean = 4,
    SweQuantity = 5,
    SweCategory = 6,
    SweTimeRange = 7,
    SweQuantityRange = 8,
    SweDataRecord = 9,
    SweDataArray = 10
}

abstract class AbstractNamedComponentComponent<T> extends EditorComponent<T> implements AfterContentInit {
    protected componentType: ComponentType;
    protected title: string;

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    ngAfterContentInit(): any {
        this.componentType = this.getComponentType();
    }

    protected createModel(): T {
        return undefined;
    }

    private getComponentType(): ComponentType {
        if (!this.model) {
            return ComponentType.Unknown;
        }

        let component = (<any>this.model).component;

        if (component instanceof SweText) {
            return ComponentType.SweText;
        } else if (component instanceof SweTime) {
            return ComponentType.SweTime;
        } else if (component instanceof SweCount) {
            return ComponentType.SweCount;
        } else if (component instanceof SweBoolean) {
            return ComponentType.SweBoolean;
        } else if (component instanceof SweQuantity) {
            return ComponentType.SweQuantity;
        } else if (component instanceof SweCategory) {
            return ComponentType.SweCategory;
        } else if (component instanceof SweTimeRange) {
            return ComponentType.SweTimeRange;
        } else if (component instanceof SweQuantityRange) {
            return ComponentType.SweQuantityRange;
        } else if (component instanceof SweDataRecord) {
            return ComponentType.SweDataRecord;
        } else if (component instanceof SweDataArray) {
            return ComponentType.SweDataArray;
        } else {
            return ComponentType.Unknown;
        }
    }

}

@Component({
    selector: 'sml-named-swe-data-component',
    template: require('./NamedSweDataComponentComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class NamedSweDataComponentComponent extends AbstractNamedComponentComponent<NamedSweDataComponent>
    implements OnInit {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    public ngOnInit() {
        console.log(this.model);
        if (this.model && this.model.component) {
            this.title = this.model.component.toString();
        } else {
            this.title = 'Named Data Component';
        }
    }

    protected createModel(): NamedSweDataComponent {
        return new NamedSweDataComponent();
    }
}

@Component({
    selector: 'swe-field',
    template: require('./NamedSweDataComponentComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class SweFieldComponent extends AbstractNamedComponentComponent<SweField> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
        this.title = 'Swe Field';
    }

    protected createModel(): SweField {
        return new SweField();
    }
}
