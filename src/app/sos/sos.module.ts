import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonSmleModule } from '../common/common.module';
import { DescriptionSelectionComponent } from './components/selectDescription.component';
import { AuthComponent } from './components/auth.component';
import { LoggedInDirective } from './components/loggedIn.directive';
import { FetchDescriptionComponent } from './fetch/fetch.component';
import { PublishDescriptionComponent } from './publish/publish.component';
import { ConnectDescriptionComponent } from './connect/connect.component';
import { DeleteDescriptionComponent } from './delete/delete.component';

@NgModule({
    declarations: [
        AuthComponent,
        LoggedInDirective,
        DescriptionSelectionComponent,
        FetchDescriptionComponent,
        PublishDescriptionComponent,
        ConnectDescriptionComponent,
        DeleteDescriptionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CommonSmleModule
    ],
    exports: [
        AuthComponent,
        LoggedInDirective,
        DescriptionSelectionComponent
    ],
    entryComponents: [
    ]
})
export class SosModule { }
