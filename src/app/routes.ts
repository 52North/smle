import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Editor } from './editor/editor';
import { FetchDescription } from './sos/fetch/fetch.component';
import { PublishDescription } from './sos/publish/publish.component';
import { ConnectDescription } from './sos/connect/connect.component';
import { DeleteDescription } from './sos/delete/delete.component';
import { Templates } from './templates/templates';
import { AuthGuard } from './sos/components/auth-guard.service';

export const ROUTES: Routes = [
  { path: '', component: Home },
  { path: 'editor', component: Editor },
  { path: 'editor/:id', component: Editor },
  { path: 'fetch', component: FetchDescription },
  { path: 'fetch/:id', component: FetchDescription },
  { path: 'publish', component: PublishDescription },
  { path: 'connect', component: ConnectDescription },
  { path: 'delete', component: DeleteDescription, canActivate: [AuthGuard] },
  { path: 'templates', component: Templates }
];
