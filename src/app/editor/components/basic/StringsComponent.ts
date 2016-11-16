import {Component, Input} from '@angular/core';
import {ListComponent} from './ListComponent';
import { DescriptionConfig } from '../../../services/config/DescriptionConfig';

@Component({
    selector: 'strings',
    template: require('./StringsComponent.html'),
    directives: [ListComponent]
})
export class StringsComponent {
    @Input()
    public list: string[];
    @Input()
    public fieldName: string;
    @Input()
    public configName: string;
    @Input()
    public config: DescriptionConfig;

    public item: string;

    public remove(i: number): void {
        this.list.splice(i, 1);
    }

    public add(): void {
        if (this.item) {
            this.list.push(this.item);
        }
        this.clear();
    }

    public clear(): void {
        this.item = '';
    }
}
