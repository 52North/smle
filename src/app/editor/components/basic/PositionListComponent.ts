import { Position } from '../../../model/sml/Position';
import { SweVector } from '../../../model/swe/SweVector';
import { SweDataRecord } from '../../../model/swe/SweDataRecord';
import { Component } from '@angular/core';
import { TypedModelComponent, ChildMetadata } from '../base/TypedModelComponent';
import { TrueDescriptionConfig } from '../../../services/config/TrueDescriptionConfig';
import { PositionEditorComponent } from '../sml/PositionComponent';
import { SweCoordinate } from '../../../model/swe/SweCoordinate';
import { SweQuantity } from '../../../model/swe/SweQuantity';
import { UnitOfMeasure } from '../../../model/swe/UnitOfMeasure';
import { SweField } from '../../../model/swe/SweField';
import { ListComponent } from './ListComponent';

@Component({
    selector: 'position-list',
    template: require('./PositionListComponent.html')
})
export class PositionListComponent extends TypedModelComponent<Array<Position>> {
    private getPositionTypeName(positionItem: Position): string {
        if (positionItem instanceof SweVector) {
            return 'Vector';
        } else if (positionItem instanceof SweDataRecord) {
            return 'Data Record';
        } else {
            return '';
        }
    }

    private addVector() {
        var newItem = this.createPositionLocation();

        this.addModelIfNotExist();
        this.model.push(newItem);
    }

    private addModelIfNotExist() {
        if (!this.model) {
            this.model = [];
            this.modelChange.emit(this.model);
        }
    }

    private addDataRecord() {
        var newItem = this.createPositionDataRecord();

        this.addModelIfNotExist();
        this.model.push(newItem);
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

    private removeItem(index: number) {
        this.model.splice(index, 1);
    }

    private openChild(item: Position) {
        this.openNewChild(new ChildMetadata(PositionEditorComponent, item, new TrueDescriptionConfig()));
    }

    protected createModel(): Position[] {
        return [];
    }
}
