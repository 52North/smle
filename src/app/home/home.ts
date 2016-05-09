import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { DescriptionRepository } from '../services/DescriptionRepository';

@Component({
  selector: 'home',
  template: require('./home.html')
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
