import {Component, Input, Output, EventEmitter} from '@angular/core';

export class ListEvent {
    constructor(private item: any, private index: number) {
    }

    public getItem(): any {
        return this.item;
    }

    public getIndex(): any {
        return this.index;
    }
}

@Component({
    selector: 'list',
    template: require('./ListComponent.html')
})
export class ListComponent {
    @Input()
    public list: any[];
    @Input()
    public itemName: string;
    @Output()
    public select: EventEmitter<ListEvent> = new EventEmitter<ListEvent>();
    @Output()
    public add: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public remove: EventEmitter<ListEvent> = new EventEmitter<ListEvent>();

    private onClick(item: any, index: number) {
        this.select.emit(new ListEvent(item, index));
    }

    private onRemove(item: any, index: number) {
        this.remove.emit(new ListEvent(item, index));
    }

    private onAdd() {
        this.add.emit(null);
    }
}
