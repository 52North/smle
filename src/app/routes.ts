import { Routes } from '@angular/router';

import { EditorComponent } from './editor/editor';
import { AuthGuard } from './ingestion/services/auth.service';

export const ROUTES: Routes = [
    // { path: '', component: CreateComponent },
    // { path: 'samples', component: SamplesComponent },
    // { path: 'create', component: CreateComponent },
    { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
    { path: 'editor/:id', component: EditorComponent, canActivate: [AuthGuard] }
];
