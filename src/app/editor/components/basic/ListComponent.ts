import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';

@Component({
    selector: 'list',
    styles: [require('../styles/list-component.scss')],
    template: require('./ListComponent.html')
})
export class ListComponent {
    @Input()
    public list: any[];
    @Input()
    public itemTitleFunc: Function;
    @Input()
    public noSelect: boolean = false;
    @Output()
    public select: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public add: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public remove: EventEmitter<number> = new EventEmitter<number>();

    protected onClick(item: any, index: number) {
        this.select.emit(item);
    }

    protected onRemove(item: any, index: number) {
        this.remove.emit(index);
    }

    protected onAdd() {
        this.add.emit(null);
    }
}
@Directive({ selector: 'list-add-section' })
export class ListAddSection {
    // No behavior - The only purpose is to "declare" the tag in Angular2
}
