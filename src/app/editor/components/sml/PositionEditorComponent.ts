import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {EditorComponent} from '../base/EditorComponent';
import {Position} from '../../../model/sml/Position';
import {CardComponent} from '../basic/CardComponent';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {MapComponent, MapData} from '../basic/MapComponent';
import {SweVector} from '../../../model/swe/SweVector';
import {SweDataRecord} from '../../../model/swe/SweDataRecord';
import {SweCoordinate} from '../../../model/swe/SweCoordinate';
import {SweQuantity} from '../../../model/swe/SweQuantity';
import {SweField} from '../../../model/swe/SweField';

@Component({
    selector: 'position-editor',
    template: require('./PositionEditorComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent]
})
export class PositionEditorComponent extends EditorComponent<Position> {
    private get latitude(): number {
        return this.getFieldValue('location', 'Lat');
    }

    private set latitude(value: number) {
        this.setFieldValue('location', 'Lat', value);
    }

    private get longitude(): number {
        return this.getFieldValue('location', 'Lon');
    }

    private set longitude(value: number) {
        this.setFieldValue('location', 'Lon', value);
    }

    private get altitude(): number {
        return this.getFieldValue('location', 'Alt');
    }

    private set altitude(value: number) {
        this.setFieldValue('location', 'Alt', value);
    }

    private get trueHeading(): number {
        return this.getFieldValue('orientation', 'TrueHeading');
    }

    private set trueHeading(value: number) {
        this.setFieldValue('orientation', 'TrueHeading', value);
    }

    private get pitch(): number {
        return this.getFieldValue('orientation', 'Pitch');
    }

    private set pitch(value: number) {
        this.setFieldValue('orientation', 'Pitch', value);
    }

    constructor(private modalWindow: Modal, componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    private openMap() {
        var mapData: MapData = new MapData({lat: this.latitude, lng: this.longitude});

        this.modalWindow.open(MapComponent, mapData).then((dialogRef) => {
            dialogRef.result.then((result) => {
                if (result) {
                    this.latitude = result.lat;
                    this.longitude = result.lng;
                }
            });
        });
    }

    protected createModel(): Position {
        return undefined;
    }

    private setFieldValue(vectorName: string, fieldName: string, value: number) {
        var quantity = this.getQuantity(vectorName, fieldName);
        if (quantity) {
            quantity.value = value;
        }
    }

    private getQuantity(vectorName: string, fieldName: string): SweQuantity {
        var vector: SweVector;
        var coordinate: SweCoordinate;

        if (!this.model) {
            return undefined;
        }

        if (vectorName === 'location' && this.model instanceof SweVector) {
            vector = <SweVector>this.model;
        } else if (this.model instanceof SweDataRecord) {
            vector = <SweVector>((<SweDataRecord>this.model).fields.find((field) => {
                return field.name === vectorName;
            }) || <SweField>{}).component;
        }

        if (!vector) {
            return undefined;
        }

        coordinate = vector.coordinates.find((coord) => {
            return coord.name === fieldName;
        });

        if (!coordinate) {
            return undefined;
        }

        return <SweQuantity>coordinate.coordinate;
    }

    private getFieldValue(vectorName: string, fieldName: string): number {
        var quantity = this.getQuantity(vectorName, fieldName);
        return quantity ? quantity.value : undefined;
    }
}
