import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Editor } from './editor/editor';
import { PublishDescription } from './sos/publish/publish.component';

export const ROUTES: Routes = [
    { path: '', component: Editor },
    { path: 'samples', component: Home },
    { path: 'editor', component: Editor },
    { path: 'editor/:id', component: Editor },
    { path: 'publish', component: PublishDescription }
];

export const PROCEDURE_ID_PARAM = 'procedureId';
export const SOS_URL_PARAM = 'sosUrl';
