import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonSmleModule } from '../common/common.module';
import { EditorModule } from '../editor/editor.module';
import { CreateNewButtonComponent } from './create-new-button/create-new-button.component';
import { CreateViewComponent } from './create-view/create-view.component';
import { EditorWorkflowViewComponent } from './editor-workflow-view/editor-workflow-view.component';
import { HelpViewComponent } from './help-view/help-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { ModalComponentOpenerComponent } from './modal-component-opener/modal-component-opener.component';
import { PublishButtonComponent } from './publish-button/publish-button.component';
import { PublishModalComponent } from './publish-modal/publish-modal.component';
import { AuthGuard, AuthService } from './services/auth.service';
import { CncService } from './services/cnc.service';
import { IngestionHandlerService } from './services/handler.service';
import { StatisticsComponent } from './statistics/statistics.component';
import { StreamsComponent } from './streams/streams.component';

const ROUTES: Routes = [
  { path: 'streams', component: StreamsComponent, canActivate: [AuthGuard] },
  { path: 'statistics', redirectTo: 'streams' },
  { path: 'create', component: CreateViewComponent, canActivate: [AuthGuard] },
  { path: 'statistics/:id', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginViewComponent },
  { path: 'workflow', component: EditorWorkflowViewComponent, canActivate: [AuthGuard] },
  { path: 'workflow/:id', component: EditorWorkflowViewComponent, canActivate: [AuthGuard] },
  { path: 'help', component: HelpViewComponent },
  { path: '', component: StreamsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    StreamsComponent,
    PublishButtonComponent,
    PublishModalComponent,
    CreateNewButtonComponent,
    LoginViewComponent,
    LogoutButtonComponent,
    StatisticsComponent,
    CreateViewComponent,
    EditorWorkflowViewComponent,
    ModalComponentOpenerComponent,
    HelpViewComponent
  ],
  entryComponents: [
    PublishModalComponent,
    ModalComponentOpenerComponent
  ],
  exports: [
    PublishButtonComponent,
    CreateNewButtonComponent,
    LogoutButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonSmleModule,
    EditorModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    CncService,
    AuthService,
    AuthGuard,
    IngestionHandlerService
  ]
})
export class IngestionModule { }
