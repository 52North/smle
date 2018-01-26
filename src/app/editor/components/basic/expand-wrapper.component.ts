import { Component, Input } from '@angular/core';

@Component({
    selector: 'expand-wrapper',
    templateUrl: './expand-wrapper.component.html',
    styleUrls: ['../styles/expand-wrapper-component.scss']
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
