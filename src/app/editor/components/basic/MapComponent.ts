import { Component, AfterViewInit } from '@angular/core';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';

declare var L: any;

export class MapData extends BSModalContext {
    constructor(public center: { lng: number, lat: number }) {
        super();
    }
}

@Component({
    selector: 'map',
    template: require('./MapComponent.html')
})
export class MapComponent implements ModalComponent<MapData>, AfterViewInit {
    private map: any;
    private marker: any;

    constructor(public dialog: DialogRef<MapData>) {
    }

    ngAfterViewInit(): void {
        var center = this.dialog.context.center;

        this.map = new L.Map('map', {
            center: [center.lat, center.lng],
            zoom: 10,
            layers: [new L.TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors'
            })]
        });

        this.marker = L.marker(center, {
            icon: L.icon({
                iconUrl: require('../../../../../node_modules/leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('../../../../../node_modules/leaflet/dist/images/marker-shadow.png'),
                iconSize: [25, 41],
                iconAnchor: [12.5, 41]
            }),
            draggable: true
        }).bindPopup(this.getCoordText(center), {
            offset: L.point(12, 6)
        }).addTo(this.map);

        this.map.on('dblclick', (e) => {
            this.marker.setLatLng(e.latlng);
            this.updateMarkerText(e.latlng);
        });

        this.marker.on('drag', (e) => {
            var markerCoords = this.marker.getLatLng();
            this.updateMarkerText(markerCoords);
        });
    }

    private updateMarkerText(markerCoords) {
        var markerText = this.getCoordText(markerCoords);
        this.marker.setPopupContent(markerText);
    }

    private getCoordText(coords): string {
        return `Lat: ${coords.lat}<br>Lng: ${coords.lng}`;
    }

    private close(): void {
        this.dialog.close();
    }

    private saveAndClose(): void {
        var centerLatLng = this.marker.getLatLng();
        var center = {
            lat: centerLatLng.lat,
            lng: centerLatLng.lng
        };

        this.dialog.close(center);
    }
}
