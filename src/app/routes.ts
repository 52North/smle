import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { EditorComponent } from './editor/editor';
import { FetchDescription } from './sos/fetch/fetch.component';
import { PublishDescription } from './sos/publish/publish.component';
import { ConnectDescription } from './sos/connect/connect.component';
import { DeleteDescription } from './sos/delete/delete.component';
import { Templates } from './templates/templates';
import { AuthGuard } from './sos/components/auth-guard.service';

export const ROUTES: Routes = [
    { path: '', component: EditorComponent },
    { path: 'samples', component: HomeComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:id', component: EditorComponent },
    { path: 'fetch', component: FetchDescription },
    { path: 'fetch/:id', component: FetchDescription },
    { path: 'publish', component: PublishDescription },
    { path: 'connect', component: ConnectDescription },
    { path: 'delete', component: DeleteDescription, canActivate: [AuthGuard] },
    { path: 'templates', component: Templates }
];

export const PROCEDURE_ID_PARAM = 'procedureId';
export const SOS_URL_PARAM = 'sosUrl';
