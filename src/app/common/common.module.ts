import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SensorMLPipe } from './pipes/sensorml.pipe';

import { PreviewComponent } from './components/preview/preview.component';

@NgModule({
  declarations: [
    SensorMLPipe,
    PreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SensorMLPipe,
    PreviewComponent
  ],
  entryComponents: [
  ]
})
export class CommonSmleModule { }
