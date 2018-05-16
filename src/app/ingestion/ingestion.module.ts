import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonSmleModule } from '../common/common.module';
import { CreateNewButtonComponent } from './create-new-button/create-new-button.component';
import { PublishButtonComponent } from './publish-button/publish-button.component';
import { PublishModalComponent } from './publish-modal/publish-modal.component';
import { CncService } from './services/cnc.service';
import { StreamsComponent } from './streams/streams.component';

const ROUTES: Routes = [
  { path: '', component: StreamsComponent },
  { path: 'streams', component: StreamsComponent }
];

@NgModule({
  declarations: [
    StreamsComponent,
    PublishButtonComponent,
    PublishModalComponent,
    CreateNewButtonComponent
  ],
  entryComponents: [
    PublishModalComponent
  ],
  exports: [
    PublishButtonComponent,
    CreateNewButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonSmleModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    CncService
  ]
})
export class IngestionModule { }
