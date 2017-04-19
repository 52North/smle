import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonSmleModule } from '../common/common.module';
import { DescriptionSelectionComponent } from './components/selectDescription.component';
import { AuthComponent } from './components/auth.component';
import { LoggedInDirective } from './components/loggedIn.directive';

@NgModule({
    declarations: [
        AuthComponent,
        LoggedInDirective,
        DescriptionSelectionComponent
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
