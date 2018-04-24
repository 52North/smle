import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonSmleModule } from '../common/common.module';
import { StreamsComponent } from './streams/streams.component';
import { StreamService } from './streams/streams.service';

const ROUTES: Routes = [
  { path: 'streams', component: StreamsComponent }
];

@NgModule({
  declarations: [
    StreamsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonSmleModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    StreamService
  ]
})
export class IngestionModule { }
