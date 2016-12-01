import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Editor } from './editor/editor';

export const ROUTES: Routes = [
    { path: '', component: Editor },
    { path: 'samples', component: Home },
    { path: 'editor', component: Editor },
    { path: 'editor/:id', component: Editor }
];
