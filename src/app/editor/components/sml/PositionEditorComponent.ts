import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {EditorComponent} from '../base/EditorComponent';
import {Position} from '../../../model/sml/Position';
import {CardComponent} from '../basic/CardComponent';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {MapComponent, MapData} from '../basic/MapComponent';

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

    private setFieldValue(vectorName: string, fieldName: string, value: number) {

    }

    private getFieldValue(vectorName: string, fieldName: string): number {
        return 0;
    }

    private openMap(location: any) {
        return this.modalWindow.open(MapComponent, new MapData());
    }

    protected createModel(): Position {
        return undefined;
    }
}
