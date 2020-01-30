import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

import { SensorMLPipe } from './pipes/sensorml.pipe';

import { PreviewComponent } from './components/preview/preview.component';
import { ObjectTreeComponent } from './components/object-tree/object-tree.component';
import { TreeNodeComponent } from './components/object-tree/tree-node.component';

@NgModule({
  declarations: [
    SensorMLPipe,
    PreviewComponent,
    ObjectTreeComponent,
    TreeNodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TreeModule.forRoot()
  ],
  exports: [
    SensorMLPipe,
    PreviewComponent,
    ObjectTreeComponent,
    TreeNodeComponent
  ],
  entryComponents: [
  ]
})
export class CommonSmleModule { }
