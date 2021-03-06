import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DescriptionRepository } from '../services/DescriptionRepository';

@Component({
    selector: 'samples',
    templateUrl: './samples.component.html',
    styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {

    descriptions: string[];
    private _selected: string;

    constructor(
        private _service: DescriptionRepository,
        private _router: Router
    ) {
    }

    isSelected(id: string): boolean {
        return this._selected === id;
    }

    onSelect(id: string): void {
        this._router.navigate(['/editor', id]);
    }

    ngOnInit() {
        this._service.getDescriptions().subscribe((ids) => this.descriptions = ids);
    }

}
