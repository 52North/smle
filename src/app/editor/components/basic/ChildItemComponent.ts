import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'child-item',
    template: require('./ChildItemComponent.html')
})
export class ChildItemComponent {
    @Input()
    public model: any;

    @Input()
    public itemTitle: string;

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
}
