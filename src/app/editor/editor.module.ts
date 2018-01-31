import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/primeng';

import { CommonSmleModule } from '../common/common.module';
import { BASE_COMPONENTS } from './components/base';
import { BASIC_COMPONENTS, BASIC_DIRECTIVES } from './components/basic';
import { EXTENSION_COMPONENTS } from './components/extensions';
import { GML_COMPONENTS } from './components/gml';
import { ISO_COMPONENTS } from './components/iso';
import { SML_COMPONENTS } from './components/sml';
import { SWE_COMPONENTS } from './components/swe';
import { EditorComponent } from './editor';

@NgModule({
    declarations: [
        BASE_COMPONENTS,
        BASIC_COMPONENTS,
        BASIC_DIRECTIVES,
        EXTENSION_COMPONENTS,
        EditorComponent,
        GML_COMPONENTS,
        ISO_COMPONENTS,
        SML_COMPONENTS,
        SWE_COMPONENTS
    ],
    imports: [
        CalendarModule,
        CommonModule,
        CommonSmleModule,
        FormsModule,
        NgbModalModule.forRoot()
    ],
    exports: [
        BASIC_COMPONENTS,
        GML_COMPONENTS,
        SML_COMPONENTS,
        SWE_COMPONENTS
    ],
    entryComponents: [
        BASIC_COMPONENTS,
        EXTENSION_COMPONENTS,
        EditorComponent,
        GML_COMPONENTS,
        ISO_COMPONENTS,
        SML_COMPONENTS
    ]
})
export class EditorModule { }
