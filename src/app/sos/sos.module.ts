import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
