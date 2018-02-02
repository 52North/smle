import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DescriptionConfig } from '../../../services/config/DescriptionConfig';

@Component({
    selector: 'child-item',
    styleUrls: ['../styles/basic-component.scss'],
    templateUrl: './ChildItemComponent.html'
})
export class ChildItemComponent {
    @Input()
    public model: any;

    @Input()
    public itemTitle: string;

    @Input()
    public config: DescriptionConfig;

    @Input()
    public configName: string;

    @Output()
    public remove: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public add: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public select: EventEmitter<any> = new EventEmitter<any>();

    protected onAdd() {
        this.add.emit(null);
    }

    protected onRemove() {
        this.remove.emit(null);
    }

    protected onSelect() {
        this.select.emit(null);
    }

    public isNotFixed() {
        return !!this.config ? !this.config.isFieldFixed(this.configName) : true;
    }
}
