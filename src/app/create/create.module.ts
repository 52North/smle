import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateComponent } from './create.component';
import { NewComponent } from './new/new.component';
import { ImportComponent } from './import/import.component';

@NgModule({
    declarations: [
      CreateComponent,
      ImportComponent,
      NewComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
    ],
    entryComponents: [
    ]
})
export class CreateModule { }
