import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
    selector: 'card',
    templateUrl: './CardComponent.html',
    styleUrls: ['../styles/card-component.scss']
})
export class CardComponent {
    @Input()
    public title: string;

    @Input()
    public showAll = false;

    @Input()
    public closable = true;

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

    public onShowAllChange(value) {
        this.showAll = value;
        this.showAllChange.emit(value);
    }
}
