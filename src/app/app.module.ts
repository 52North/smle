import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app';
import { CommonSmleModule } from './common/common.module';
import { CreateModule } from './create/create.module';
import { EditorModule } from './editor/editor.module';
import { APP_PROVIDERS } from './providers';
import { ROUTES } from './routes';
import { SamplesComponent } from './samples/samples.component';
import { SosModule } from './sos/sos.module';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        SamplesComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        EditorModule,
        SosModule,
        TemplatesModule,
        CreateModule,
        CommonModule,
        CommonSmleModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        APP_PROVIDERS
    ]
})
export class AppModule { }
