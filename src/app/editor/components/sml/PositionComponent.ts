import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Position, SweCoordinate, SweDataRecord, SweField, SweQuantity, SweVector } from '@helgoland/sensorml';

import { EditorComponent } from '../base/EditorComponent';
import { MapComponent } from '../basic/MapComponent';

@Component({
    selector: 'sml-position',
    templateUrl: './PositionComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class PositionEditorComponent extends EditorComponent<Position> {

    public title = 'Position';

    public get latitude(): number {
        return this.getFieldValue('location', 'Lat');
    }

    public set latitude(value: number) {
        this.setFieldValue('location', 'Lat', value);
    }

    public get longitude(): number {
        return this.getFieldValue('location', 'Lon');
    }

    public set longitude(value: number) {
        this.setFieldValue('location', 'Lon', value);
    }

    public get easting(): number {
        return this.getFieldValue('location', 'easting');
    }

    public set easting(value: number) {
        this.setFieldValue('location', 'easting', value);
    }

    public get northing(): number {
        return this.getFieldValue('location', 'northing');
    }

    public set northing(value: number) {
        this.setFieldValue('location', 'northing', value);
    }

    public get altitude(): number {
        return this.getFieldValue('location', 'altitude');
    }

    public set altitude(value: number) {
        this.setFieldValue('location', 'altitude', value);
    }

    public get trueHeading(): number {
        return this.getFieldValue('orientation', 'TrueHeading');
    }

    public set trueHeading(value: number) {
        this.setFieldValue('orientation', 'TrueHeading', value);
    }

    public get pitch(): number {
        return this.getFieldValue('orientation', 'Pitch');
    }

    public set pitch(value: number) {
        this.setFieldValue('orientation', 'Pitch', value);
    }

    constructor(
        private modalService: NgbModal,
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef);
    }

    public openMap() {
        const ref = this.modalService.open(MapComponent);
        if (typeof this.northing !== 'undefined' && typeof this.easting !== 'undefined') {
            (ref.componentInstance as MapComponent).location = {
                lat: this.northing,
                lng: this.easting
            };
            ref.result.then((location: L.LatLngLiteral) => {
                if (location) {
                    this.northing = location.lat;
                    this.easting = location.lng;
                }
            });
        } else {
            (ref.componentInstance as MapComponent).location = {
                lat: this.latitude,
                lng: this.longitude
            };
            ref.result.then((location: L.LatLngLiteral) => {
                if (location) {
                    this.longitude = location.lat;
                    this.latitude = location.lng;
                }
            });
        }
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
