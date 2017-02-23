import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { EditorComponent } from './editor/editor';

export const ROUTES: Routes = [
    { path: '', component: EditorComponent },
    { path: 'samples', component: HomeComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:id', component: EditorComponent }
];
