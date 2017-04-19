import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { TemplateSortPipe } from './templates.pipe';

import { TemplatesComponent } from './templates.component';

@NgModule({
    declarations: [
        TemplateSortPipe,
        TemplatesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        JsonpModule
    ],
    exports: [
        TemplateSortPipe
    ],
    entryComponents: [
    ]
})
export class TemplatesModule { }
