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

@Component({
    selector: 'position-list',
    template: require('./PositionListComponent.html')
})
export class PositionListComponent extends TypedModelComponent<Array<Position>> {

    protected createModel(): Position[] {
        return [];
    }

    protected removeItem(index: number) {
        this.model.splice(index, 1);
    }

    protected openChild(item: Position) {
        this.openNewChild(new ChildMetadata(PositionEditorComponent, item, new TrueDescriptionConfig()));
    }

    protected getPositionLabel(positionItem: Position): string {
        if (positionItem instanceof SweVector) {
            return 'Vector';
        } else if (positionItem instanceof SweDataRecord) {
            return 'Data Record';
        } else {
            return '';
        }
    }

    protected getPositionValue(positionItem: Position): string {
        if (positionItem instanceof SweVector) {
            let value = [];
            positionItem.coordinates.forEach(entry => {
                value.push(entry.name + ': ' + entry.coordinate.value);
            });
            return value.join(', ');
        } else if (positionItem instanceof SweDataRecord) {
            return '';
        } else {
            return '';
        }
    }

    protected addVector() {
        let newItem = this.createPositionLocation();

        this.addModelIfNotExist();
        this.model.push(newItem);
    }

    protected addDataRecord() {
        let newItem = this.createPositionDataRecord();

        this.addModelIfNotExist();
        this.model.push(newItem);
    }

    private addModelIfNotExist() {
        if (!this.model) {
            this.model = [];
            this.modelChange.emit(this.model);
        }
    }

    private createPositionLocation(withAlt: boolean = false): SweVector {
        let location = new SweVector();

        location.coordinates.push(this.createCoordinate('Lat', 0, 'deg'));
        location.coordinates.push(this.createCoordinate('Lon', 0, 'deg'));
        if (withAlt) {
            location.coordinates.push(this.createCoordinate('Alt', 0, 'm'));
        }

        return location;
    }

    private createCoordinate(name: string, value: number, uom: string): SweCoordinate {
        let coordinate = new SweCoordinate();
        let quantity = new SweQuantity();
        let unitOfMeasure = new UnitOfMeasure();

        unitOfMeasure.code = uom;

        quantity.value = value;
        quantity.uom = unitOfMeasure;

        coordinate.name = name;
        coordinate.coordinate = quantity;

        return coordinate;
    }

    private createPositionDataRecord(): SweDataRecord {
        let dataRecord = new SweDataRecord();
        let locationField = new SweField();
        let orientationField = new SweField();

        locationField.name = 'location';
        locationField.component = this.createPositionLocation(true);
        dataRecord.fields.push(locationField);

        orientationField.name = 'orientation';
        orientationField.component = this.createPositionOrientation();
        dataRecord.fields.push(orientationField);

        return dataRecord;
    }

    private createPositionOrientation(): SweVector {
        let orientation = new SweVector();

        orientation.coordinates.push(this.createCoordinate('TrueHeading', 0, 'deg'));
        orientation.coordinates.push(this.createCoordinate('Pitch', 0, 'deg'));

        return orientation;
    }

}
