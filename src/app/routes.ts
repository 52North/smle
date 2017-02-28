import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { EditorComponent } from './editor/editor';
import { FetchDescriptionComponent } from './sos/fetch/fetch.component';
import { PublishDescriptionComponent } from './sos/publish/publish.component';
import { ConnectDescriptionComponent } from './sos/connect/connect.component';
import { DeleteDescriptionComponent } from './sos/delete/delete.component';
import { TemplatesComponent } from './templates/templates';
import { AuthGuard } from './sos/components/auth-guard.service';

export const ROUTES: Routes = [
    { path: '', component: EditorComponent },
    { path: 'samples', component: HomeComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:id', component: EditorComponent },
    { path: 'fetch', component: FetchDescriptionComponent },
    { path: 'fetch/:id', component: FetchDescriptionComponent },
    { path: 'publish', component: PublishDescriptionComponent },
    { path: 'connect', component: ConnectDescriptionComponent },
    { path: 'delete', component: DeleteDescriptionComponent, canActivate: [AuthGuard] },
    { path: 'templates', component: TemplatesComponent }
];

export const PROCEDURE_ID_PARAM = 'procedureId';
export const SOS_URL_PARAM = 'sosUrl';
