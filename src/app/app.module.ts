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
import { SosModule } from './sos/sos.module';
import { TemplatesModule } from './templates/templates.module';
import { SamplesComponent } from './samples/samples.component';
import { EditorComponent } from './editor/editor';
import { CreateComponent } from './create/create.component';
import { FetchDescriptionComponent } from './sos/fetch/fetch.component';
import { PublishDescriptionComponent } from './sos/publish/publish.component';
import { ConnectDescriptionComponent } from './sos/connect/connect.component';
import { DeleteDescriptionComponent } from './sos/delete/delete.component';
import { TemplatesComponent } from './templates/templates';

import { ConfigurationService } from './services/ConfigurationService';

import '../styles/styles.scss';

export function getAppModule(conf) {
    @NgModule({
        bootstrap: [ApplicationComponent],
        declarations: [
            ApplicationComponent,
            SamplesComponent,
            EditorComponent,
            CreateComponent,
            FetchDescriptionComponent,
            PublishDescriptionComponent,
            ConnectDescriptionComponent,
            DeleteDescriptionComponent,
            TemplatesComponent
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
