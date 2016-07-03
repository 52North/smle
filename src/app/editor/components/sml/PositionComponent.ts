import {Position} from '../../../model/sml/Position';
import {SweVector} from '../../../model/swe/SweVector';
import {SweDataRecord} from '../../../model/swe/SweDataRecord';
import {Component, OnChanges, SimpleChange} from '@angular/core';
import {TypedModelComponent, ChildMetadata} from '../base/TypedModelComponent';
import {TrueConfiguration} from '../../../services/config/TrueConfiguration';
import {PositionEditorComponent} from './PositionEditorComponent';

enum PositionType {
    Vector = 1,
    DataRecord = 2
}

@Component({
    selector: 'sml-position',
    template: require('./PositionComponent.html')
})
export class PositionComponent extends TypedModelComponent<Position> implements OnChanges {
    private positionType: PositionType;

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): any {
        var modelChange = changes['model'];
        if (!modelChange) {
            return;
        }

        if (this.model instanceof SweVector) {
            this.positionType = PositionType.Vector;
        } else if (this.model instanceof SweDataRecord) {
            this.positionType = PositionType.DataRecord;
        } else {
            this.positionType = undefined;
        }
    }

    private getPositionTypeName(positionType: PositionType = this.positionType): string {
        switch (positionType) {
            case PositionType.DataRecord:
                return 'Data Record';
            case PositionType.Vector:
                return 'Vector';
            default:
                return '';
        }
    }

    private addPosition(positionType: PositionType) {
        this.positionType = positionType;

        switch (positionType) {
            case PositionType.Vector:
                this.model = this.createPositionLocation();
                break;
            case PositionType.DataRecord:
                this.model = this.createPositionDataRecord();
                break;
        }

        this.modelChange.emit(this.model);
    }

    private createPositionLocation(): SweVector {
        var location = new SweVector();
        return location;
    }

    private createPositionDataRecord(): SweDataRecord {
        var dataRecord = new SweDataRecord();

        dataRecord.fields.push({
            name: 'location',
            component: this.createPositionLocation()
        });
        dataRecord.fields.push({
            name: 'orientation',
            component: this.createPositionOrientation()
        });

        return dataRecord;
    }

    private createPositionOrientation(): SweVector {
        var orientation = new SweVector();
        return orientation;
    }

    private openChild() {
        this.openAsChild.emit(new ChildMetadata(PositionEditorComponent, this.model, new TrueConfiguration()));
    }

    protected createModel(): Position {
        return undefined;
    }
}
