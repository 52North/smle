import {Component, ElementRef, ViewContainerRef/*, ComponentRef*/} from '@angular/core';

@Component({
    selector: 'stacked-item',
    template: require('./StackedItemComponent.html'),
    directives: []
})
export class StackedItemComponent {
    private previous:StackedItemComponent;
    private next:StackedItemComponent;

    constructor(private elementRef:ElementRef, private viewContainerRef:ViewContainerRef/*, private componentRef:ComponentRef*/) {
    }

    saveAndClose() {

    }

    close() {

    }
}