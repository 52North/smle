import { Routes } from '@angular/router';
import { SamplesComponent } from './samples/samples.component';
import { EditorComponent } from './editor/editor';
import { CreateComponent } from './create/create.component';
import { FetchDescriptionComponent } from './sos/fetch/fetch.component';
import { PublishDescriptionComponent } from './sos/publish/publish.component';
import { ConnectDescriptionComponent } from './sos/connect/connect.component';
import { DeleteDescriptionComponent } from './sos/delete/delete.component';
import { TemplatesComponent } from './templates/templates.component';
import { AuthGuard } from './sos/components/auth-guard.service';

export const ROUTES: Routes = [
    { path: '', component: CreateComponent },
    { path: 'samples', component: SamplesComponent },
    { path: 'create', component: CreateComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:id', component: EditorComponent },
    { path: 'fetch', component: FetchDescriptionComponent },
    { path: 'fetch/:id', component: FetchDescriptionComponent },
    { path: 'publish', component: PublishDescriptionComponent },
    { path: 'connect', component: ConnectDescriptionComponent },
    { path: 'delete', component: DeleteDescriptionComponent, canActivate: [AuthGuard] },
    { path: 'templates', component: TemplatesComponent }
];
