import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { Position } from '../../../model/sml/Position';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { MapComponent, MapData } from '../basic/MapComponent';
import { SweVector } from '../../../model/swe/SweVector';
import { SweDataRecord } from '../../../model/swe/SweDataRecord';
import { SweCoordinate } from '../../../model/swe/SweCoordinate';
import { SweQuantity } from '../../../model/swe/SweQuantity';
import { SweField } from '../../../model/swe/SweField';

@Component({
    selector: 'sml-position',
    template: require('./PositionComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    providers: [Modal]
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

    constructor(
        private modalWindow: Modal,
        private overlay: Overlay,
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected openMap() {
        const mapData: MapData = new MapData({ lat: this.latitude, lng: this.longitude });

        this.modalWindow
            .open(MapComponent, overlayConfigFactory(mapData, BSModalContext)).then((dialogRef) => {
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
        const quantity = this.getQuantity(vectorName, fieldName);
        if (quantity) {
            quantity.value = value;
        }
    }

    private getQuantity(vectorName: string, fieldName: string): SweQuantity {
        let vector: SweVector;
        let coordinate: SweCoordinate;

        if (!this.model) {
            return undefined;
        }

        if (vectorName === 'location' && this.model instanceof SweVector) {
            vector = this.model;
        } else if (this.model instanceof SweDataRecord) {
            vector = ((this.model as SweDataRecord).fields.find((field) => {
                return field.name === vectorName;
            }) || {} as SweField).component as SweVector;
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

        return coordinate.coordinate as SweQuantity;
    }

    private getFieldValue(vectorName: string, fieldName: string): number {
        const quantity = this.getQuantity(vectorName, fieldName);
        return quantity ? quantity.value : undefined;
    }
}
