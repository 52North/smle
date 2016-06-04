import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'card',
    template: require('./CardComponent.html'),
    styles: [require('../styles/card-component.scss')]
})
export class CardComponent {
    @Input()
    public title: string;

    @Input()
    public verticalMode: boolean;

    @Output()
    public reset: EventEmitter<any> = new EventEmitter();

    @Output()
    public close: EventEmitter<any> = new EventEmitter();

    @Output()
    public closeChild: EventEmitter<any> = new EventEmitter();

    public onReset(): void {
        this.reset.emit(null);
    }

    public onClose(): void {
        this.close.emit(null);
    }

    public onCloseChild(): void {
        this.closeChild.emit(null);
    }
}