import {Position} from '../../../model/sml/Position';
import {SweVector} from '../../../model/swe/SweVector';
import {SweDataRecord} from '../../../model/swe/SweDataRecord';
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {MapComponent, MapData} from '../basic/MapComponent';

enum PositionType {
    Vector = 1,
    DataRecord = 2
}

@Component({
    selector: 'sml-position',
    template: require('./PositionComponent.html')
})
export class PositionComponent implements OnInit {
    @Input()
    model: Position;
    @Output()
    modelChange: EventEmitter<Position> = new EventEmitter<Position>();

    private positionType: PositionType;

    constructor(private modalWindow: Modal) {
    }

    ngOnInit(): void {
        if (this.model instanceof SweVector) {
            this.positionType = PositionType.Vector;
        } else if (this.model instanceof SweDataRecord) {
            this.positionType = PositionType.DataRecord;
        }
    }

    private openMap() {
        return this.modalWindow.open(MapComponent, new MapData());
    }

    private getPositionTypeName(positionType: PositionType = this.positionType): string {
        switch (positionType) {
            case PositionType.DataRecord:
                return 'Data Record';
            case PositionType.Vector:
                return 'Vector';
            default:
                return '';
        }
    }

    private addPosition(positionType: PositionType) {
        this.positionType = positionType;
        switch (positionType) {
            case PositionType.Vector:
                this.model = this.createPositionLocation();
                break;
            case PositionType.DataRecord:
                this.model = this.createPositionDataRecord();
                break;
        }
    }

    private createPositionLocation(): SweVector {
        var location = new SweVector();
        return location;
    }

    private createPositionDataRecord(): SweDataRecord {
        var dataRecord = new SweDataRecord();

        dataRecord.fields.push({
            name: 'location',
            component: this.createPositionLocation()
        });
        dataRecord.fields.push({
            name: 'orientation',
            component: this.createPositionOrientation()
        });

        return dataRecord;
    }

    private createPositionOrientation(): SweVector {
        var orientation = new SweVector();
        return orientation;
    }
}
