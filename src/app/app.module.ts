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

import { Home } from './home/home';
import { Editor } from './editor/editor';

@NgModule({
  bootstrap: [Application],
  declarations: [
    Application,
    Home,
    Editor
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
    APP_PROVIDERS
  ]
})
export class AppModule { }
