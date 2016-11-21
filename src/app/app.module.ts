import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Application } from './app';
import { ROUTES } from './routes';
import { APP_PROVIDERS } from './providers';
import { EditorModule } from './editor/editor.module';
import { SosModule } from './sos/sos.module';

import { Home } from './home/home';
import { Editor } from './editor/editor';
import { PublishDescription } from './sos/publish/publish.component';

import { ConfigurationService } from './services/ConfigurationService';

export function getAppModule(conf) {
    @NgModule({
        bootstrap: [Application],
        declarations: [
            Application,
            Home,
            Editor,
            PublishDescription
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            EditorModule,
            SosModule,
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
