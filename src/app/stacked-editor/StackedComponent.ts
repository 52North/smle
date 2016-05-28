import {Component, ViewChildren, QueryList, ComponentResolver, ViewContainerRef} from '@angular/core';
import {StackedItemComponent} from "./StackedItemComponent";

@Component({
    selector: 'stacked-component',
    template: require('./StackedComponent.html'),
    directives: [StackedItemComponent]
})
export class StackedComponent {
    @ViewChildren(StackedItemComponent)
    items:QueryList<StackedItemComponent>;

    constructor(private componentResolver:ComponentResolver, private viewContainerRef:ViewContainerRef) {
    }
}