import {Component, ComponentResolver, ViewContainerRef, AfterContentInit} from '@angular/core';
import {EditorComponent} from '../base/EditorComponent';
import {NamedSweDataComponent} from '../../../model/sml/NamedSweDataComponent';
import {CardComponent} from '../basic/CardComponent';
import {AbstractDataComponentComponent} from '../swe/AbstractDataComponentComponent';
import {SweText} from '../../../model/swe/SweText';
import {SweTime} from '../../../model/swe/SweTime';
import {SweCount} from '../../../model/swe/SweCount';
import {SweBoolean} from '../../../model/swe/SweBoolean';
import {SweQuantity} from '../../../model/swe/SweQuantity';
import {SweCategory} from '../../../model/swe/SweCategory';
import {SweTimeRange} from '../../../model/swe/SweTimeRange';
import {SweQuantityRange} from '../../../model/swe/SweQuantityRange';
import {SweDataRecord} from '../../../model/swe/SweDataRecord';
import {SweDataArray} from '../../../model/swe/SweDataArray';
import {SweTextComponent} from '../swe/SweTextComponent';
import {TextFieldComponent} from '../basic/TextFieldComponent';
import {SweBooleanComponent} from '../swe/SweBooleanComponent';
import {SweCategoryComponent} from '../swe/SweCategoryComponent';
import {SweCountComponent} from '../swe/SweCountComponent';
import {SweQuantityComponent} from '../swe/SweQuantityComponent';
import {SweTimeComponent} from '../swe/SweTimeComponent';
import {SweTimeRangeComponent} from '../swe/SweTimeRangeComponent';

@Component({
    selector: 'sml-named-swe-data-component',
    template: require('./NamedSweDataComponentComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, AbstractDataComponentComponent, TextFieldComponent, SweTextComponent,
        SweBooleanComponent, SweCategoryComponent, SweCountComponent, SweQuantityComponent, SweTimeComponent,
        SweTimeRangeComponent]
})
export class NamedSweDataComponentComponent extends EditorComponent<NamedSweDataComponent> implements AfterContentInit {
    private componentType: ComponentType;

    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    ngAfterContentInit(): any {
        this.componentType = this.getComponentType();
    }

    private getComponentType(): ComponentType {
        if (!this.model) {
            return ComponentType.Unknown;
        }

        var component = this.model.component;

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

    protected createModel(): NamedSweDataComponent {
        return new NamedSweDataComponent();
    }
}

enum ComponentType {
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
