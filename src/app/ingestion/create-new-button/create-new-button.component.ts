import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-button',
  templateUrl: './create-new-button.component.html',
  styleUrls: ['./create-new-button.component.scss']
})
export class CreateNewButtonComponent {

  constructor(
    private router: Router
  ) { }

  public createNew() {
    this.router.navigate(['/create']);
  }

}
