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
import { TemplatesModule } from './templates/templates.module';

import { Home } from './home/home';
import { Editor } from './editor/editor';
import { FetchDescription } from './sos/fetch/fetch.component';
import { PublishDescription } from './sos/publish/publish.component';
import { ConnectDescription } from './sos/connect/connect.component';
import { DeleteDescription } from './sos/delete/delete.component';
import { Templates } from './templates/templates';

import { ConfigurationService } from './services/ConfigurationService';

export function getAppModule(conf) {
    @NgModule({
        bootstrap: [Application],
        declarations: [
            Application,
            Home,
            Editor,
            FetchDescription,
            PublishDescription,
            ConnectDescription,
            DeleteDescription,
            Templates
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            EditorModule,
            SosModule,
            TemplatesModule,
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
