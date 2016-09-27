import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FetchDescription } from './fetch/fetch.component';
import { PublishDescription } from './publish/publish.component';
import { ConnectDescription } from './connect/connect.component';
import { DeleteDescription } from './delete/delete.component';
import { DescriptionSelection } from './components/selectDescription.component';

import { AuthComponent } from './components/auth.component';
import { LoggedInDirective } from './components/loggedIn.directive';

@NgModule({
    declarations: [
        AuthComponent,
        LoggedInDirective,
        DescriptionSelection
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        AuthComponent,
        LoggedInDirective,
        DescriptionSelection
    ],
    entryComponents: [
    ]
})
export class SosModule { }
