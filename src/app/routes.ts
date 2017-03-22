import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { EditorComponent } from './editor/editor';
import { CreateComponent } from './create/create.component';

export const ROUTES: Routes = [
    { path: '', component: CreateComponent },
    { path: 'samples', component: HomeComponent },
    { path: 'create', component: CreateComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:id', component: EditorComponent }
];
