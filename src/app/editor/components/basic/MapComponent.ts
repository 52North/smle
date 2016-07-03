import {Component, AfterViewInit} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';

declare var L: any;

export class MapData extends BSModalContext {
    constructor(public center: {longitude: number, latitude: number}) {
        super();
    }
}

@Component({
    selector: 'map',
    template: require('./MapComponent.html')
})
export class MapComponent implements ModalComponent<MapData>, AfterViewInit {
    private map: any;

    constructor(public dialog: DialogRef<MapData>) {
    }

    ngAfterViewInit(): void {
        var center = this.dialog.context.center;

        this.map = new L.Map('map', {
            center: [center.latitude, center.longitude],
            zoom: 10,
            layers: [new L.TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors'
            })]
        });
    }

    private close(): void {
        this.dialog.close();
    }

    private saveAndClose(): void {
        this.close();
    }
}
