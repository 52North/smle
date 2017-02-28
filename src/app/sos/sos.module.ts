import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
        FormsModule
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
