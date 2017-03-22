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

import { HomeComponent } from './home/home';
import { EditorComponent } from './editor/editor';
import { CreateComponent } from './create/create.component';

import { ConfigurationService } from './services/ConfigurationService';

import '../styles/styles.scss';

export function getAppModule(conf) {
    @NgModule({
        bootstrap: [ApplicationComponent],
        declarations: [
            ApplicationComponent,
            HomeComponent,
            EditorComponent,
            CreateComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            EditorModule,
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
