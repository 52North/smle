import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './app';
import { ROUTES } from './routes';
import { APP_PROVIDERS } from './providers';
import { EditorModule } from './editor/editor.module';
import { CreateModule } from './create/create.module';

import { SamplesComponent } from './samples/samples.component';
import { EditorComponent } from './editor/editor';

import { ConfigurationService } from './services/ConfigurationService';

import '../styles/styles.scss';

export function getAppModule(conf) {
    @NgModule({
        bootstrap: [ApplicationComponent],
        declarations: [
            ApplicationComponent,
            SamplesComponent,
            EditorComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            EditorModule,
            CreateModule,
            CommonModule,
            RouterModule.forRoot(ROUTES, { useHash: true })
        ],
        providers: [
            APP_PROVIDERS,
            ConfigurationService,
            { provide: 'smle.config', useValue: conf }
        ]
    })
    class AppModule { }

    return AppModule;
}
