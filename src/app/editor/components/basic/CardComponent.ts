import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
    selector: 'card',
    template: require('./CardComponent.html'),
    styles: [require('../styles/card-component.scss')]
})
export class CardComponent {
    @Input()
    public title: string;

    @Input()
    public showAll: boolean = false;

    @Input()
    public closable: boolean = true;

    @Output()
    public showAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    @HostBinding('class.vertical-mode')
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

    protected onShowAllChange(value) {
        this.showAll = value;
        this.showAllChange.emit(value);
    }
}
