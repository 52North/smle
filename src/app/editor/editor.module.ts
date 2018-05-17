import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap/pagination/pagination.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule } from 'primeng/primeng';

import { CommonSmleModule } from '../common/common.module';
import { IngestionModule } from '../ingestion/ingestion.module';
import { BASE_COMPONENTS } from './components/base';
import { BASIC_COMPONENTS, BASIC_DIRECTIVES } from './components/basic';
import { GML_COMPONENTS } from './components/gml';
import { ISO_COMPONENTS } from './components/iso';
import { SML_COMPONENTS } from './components/sml';
import { SWE_COMPONENTS } from './components/swe';
import { VOCABULARY_COMPONENTS } from './components/vocabulary';
import { EditorComponent } from './editor';

@NgModule({
    declarations: [
        BASE_COMPONENTS,
        BASIC_COMPONENTS,
        BASIC_DIRECTIVES,
        VOCABULARY_COMPONENTS,
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
        IngestionModule,
        NgbModule.forRoot(),
        NgxPaginationModule,
        NgbPaginationModule.forRoot(),
        NgbPopoverModule.forRoot(),
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
        VOCABULARY_COMPONENTS,
        EditorComponent,
        GML_COMPONENTS,
        ISO_COMPONENTS,
        SML_COMPONENTS
    ]
})
export class EditorModule { }
