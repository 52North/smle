import {Component} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';

export class MapData extends BSModalContext {
    constructor() {
        super();
    }
}

@Component({
    selector: 'map',
    template: require('./MapComponent.html')
})
export class MapComponent implements ModalComponent<MapData> {
    constructor(public dialog: DialogRef<MapData>) {
    }
}
