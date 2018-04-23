import { AfterViewInit, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';

@Component({
    selector: 'map',
    templateUrl: './MapComponent.html'
})
export class MapComponent implements AfterViewInit {

    private map: L.Map;
    private marker: any;

    @Input()
    public location: L.LatLngLiteral;

    constructor(
        private activeModal: NgbActiveModal
    ) { }

    ngAfterViewInit(): void {
        this.map = new L.Map('map', {
            center: this.location,
            zoom: 10,
            doubleClickZoom: false,
            layers: [new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            })]
        });

        this.marker = L.marker(this.location, {
            icon: L.icon({
                iconUrl: require('../../../../../node_modules/leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('../../../../../node_modules/leaflet/dist/images/marker-shadow.png'),
                iconSize: [25, 41],
                iconAnchor: [12.5, 41]
            }),
            draggable: true
        }).bindPopup(this.getCoordText(this.location), {
            offset: L.point(12, 6)
        }).addTo(this.map);

        this.map.on('click', (e: L.LeafletMouseEvent) => {
            this.marker.setLatLng(e.latlng);
            this.updateMarkerText(e.latlng);
        });

        this.marker.on('drag', (e) => {
            const markerCoords = this.marker.getLatLng();
            this.updateMarkerText(markerCoords);
        });

        window.setTimeout(() => this.map.invalidateSize(), 10);
    }

    public close(): void {
        this.activeModal.close();
    }

    public saveAndClose(): void {
        const centerLatLng = this.marker.getLatLng();
        const center = {
            lat: centerLatLng.lat,
            lng: centerLatLng.lng
        };
        this.activeModal.close(center);
    }

    private updateMarkerText(markerCoords) {
        const markerText = this.getCoordText(markerCoords);
        this.marker.setPopupContent(markerText);
    }

    private getCoordText(coords): string {
        return `Lat: ${coords.lat}<br>Lng: ${coords.lng}`;
    }

}
