import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app';
import { ROUTES } from './routes';
import { APP_PROVIDERS } from './providers';
import { EditorModule } from './editor/editor.module';
import { CreateModule } from './create/create.module';

import { SamplesComponent } from './samples/samples.component';
import { EditorComponent } from './editor/editor';
import { ConfigurationService } from './services/ConfigurationService';



@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    SamplesComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    EditorModule,
    CreateModule,
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    APP_PROVIDERS,
    ConfigurationService
  ]
})
export class AppModule { }
