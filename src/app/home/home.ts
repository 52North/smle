import { Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import { DescriptionRepository } from '../services/DescriptionRepository';

@Component({
  selector: 'home',
  template: `
    <h2>Descriptions</h2>
    <ul>
      <li *ngFor="#id of descriptions"
        [class.selected]="isSelected(id)"
        (click)="onSelect(id)">
        <code>{{id}}</code>
      </li>
    </ul>
  `
})
export class Home implements OnInit {

  descriptions: string[];
  private _selected: string;

  constructor(
    private _service: DescriptionRepository,
    private _router: Router) {
  }

  isSelected(id: string): boolean {
    return this._selected === id;
  }

  onSelect(id: string): void {
    this._router.navigate(['Editor', { id: id }]);
  }

  ngOnInit() {
    console.log('Getting description identifiers');
    this._service.getDescriptions()
      .then(ids => this.descriptions = ids);
  }

}
