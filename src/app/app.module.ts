import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app';
import { CreateModule } from './create/create.module';
import { EditorModule } from './editor/editor.module';
import { APP_PROVIDERS } from './providers';
import { ROUTES } from './routes';
import { SamplesComponent } from './samples/samples.component';

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
    CreateModule,
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    APP_PROVIDERS
  ]
})
export class AppModule { }
