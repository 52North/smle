import {Component, AfterViewInit} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';

declare var L: any;

export class MapData extends BSModalContext {
    constructor() {
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
        this.map = new L.Map('map', {
            center: [58.0297364, 56.2668228],
            zoom: 10,
            layers: [new L.TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
                ', Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">' +
                'Humanitarian OpenStreetMap Team</a>'
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
