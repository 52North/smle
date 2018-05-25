import { Routes } from '@angular/router';

import { EditorComponent } from './editor/editor';

export const ROUTES: Routes = [
    // { path: '', component: CreateComponent },
    // { path: 'samples', component: SamplesComponent },
    // { path: 'create', component: CreateComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:id', component: EditorComponent }
];
