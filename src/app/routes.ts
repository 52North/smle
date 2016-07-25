import { Home } from './home/home';
import { Editor } from './editor/editor';
import { FetchDescription } from './sos/fetch/fetch.component';
import { PublishDescription } from './sos/publish/publish.component';
import { ConnectDescription } from './sos/connect/connect.component';
import { DeleteDescription } from './sos/delete/delete.component';
import { ViewDescription } from './sos/view/view.component';
import { Templates } from './templates/templates';
import { provideRouter, RouterConfig } from '@angular/router';

export const routes: RouterConfig = [
  { path: '', component: Home },
  { path: 'editor', component: Editor },
  { path: 'editor/:id', component: Editor },
  { path: 'fetch', component: FetchDescription },
  { path: 'publish', component: PublishDescription },
  { path: 'connect', component: ConnectDescription },
  { path: 'delete', component: DeleteDescription },
  { path: 'view', component: ViewDescription },
  { path: 'view/:id', component: ViewDescription },
  { path: 'templates', component: Templates }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
