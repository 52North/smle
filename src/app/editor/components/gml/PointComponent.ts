import {Point} from '../../../model/gml/Point';
import {Component} from '@angular/core';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {MapComponent, MapData} from '../basic/MapComponent';

@Component({
    selector: 'gml-point',
    template: require('./PointComponent.html')
})
export class PointComponent {
    private stringCoordinates: string = '';
    private point: Point;

    constructor(private modal: Modal) {
    }

    private openMap() {
        return this.modal.open(MapComponent, new MapData());
    }
}
