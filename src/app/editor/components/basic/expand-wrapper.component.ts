import { Component, Input } from '@angular/core';

@Component({
    selector: 'expand-wrapper',
    template: require('./expand-wrapper.component.html'),
    styles: [require('../styles/expand-wrapper-component.scss')]
})
export class ExpandWrapperComponent {

    @Input()
    public title: string;

    @Input()
    public expanded: boolean = false;

    public toggle(): void {
        this.expanded = !this.expanded;
    }

}
