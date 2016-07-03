import {Position} from '../../../model/sml/Position';
import {SweVector} from '../../../model/swe/SweVector';
import {SweDataRecord} from '../../../model/swe/SweDataRecord';
import {Component, OnChanges, SimpleChange} from '@angular/core';
import {TypedModelComponent, ChildMetadata} from '../base/TypedModelComponent';
import {TrueConfiguration} from '../../../services/config/TrueConfiguration';
import {PositionEditorComponent} from './PositionEditorComponent';
import {SweCoordinate} from '../../../model/swe/SweCoordinate';
import {SweQuantity} from '../../../model/swe/SweQuantity';
import {UnitOfMeasure} from '../../../model/swe/UnitOfMeasure';
import {SweField} from '../../../model/swe/SweField';

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

    private createPositionLocation(withAlt: boolean = false): SweVector {
        var location = new SweVector();

        location.coordinates.push(this.createCoordinate('Lat', 0, 'deg'));
        location.coordinates.push(this.createCoordinate('Lon', 0, 'deg'));
        if (withAlt) {
            location.coordinates.push(this.createCoordinate('Alt', 0, 'm'));
        }

        return location;
    }

    private createCoordinate(name: string, value: number, uom: string): SweCoordinate {
        var coordinate = new SweCoordinate();
        var quantity = new SweQuantity();
        var unitOfMeasure = new UnitOfMeasure();

        unitOfMeasure.code = uom;

        quantity.value = value;
        quantity.uom = unitOfMeasure;

        coordinate.name = name;
        coordinate.coordinate = quantity;

        return coordinate;
    }

    private createPositionDataRecord(): SweDataRecord {
        var dataRecord = new SweDataRecord();
        var locationField = new SweField();
        var orientationField = new SweField();

        locationField.name = 'location';
        locationField.component = this.createPositionLocation(true);
        dataRecord.fields.push(locationField);

        orientationField.name = 'orientation';
        orientationField.component = this.createPositionOrientation();
        dataRecord.fields.push(orientationField);

        return dataRecord;
    }

    private createPositionOrientation(): SweVector {
        var orientation = new SweVector();

        orientation.coordinates.push(this.createCoordinate('TrueHeading', 0, 'deg'));
        orientation.coordinates.push(this.createCoordinate('Pitch', 0, 'deg'));

        return orientation;
    }

    private removePosition() {
        this.model = null;
        this.positionType = undefined;
        this.modelChange.emit(null);
    }

    private openChild() {
        this.openAsChild.emit(new ChildMetadata(PositionEditorComponent, this.model, new TrueConfiguration()));
    }

    protected createModel(): Position {
        return undefined;
    }
}
