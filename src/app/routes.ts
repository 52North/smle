import { Home } from './home/home';
import { Editor } from './editor/editor';
import { FetchDescription } from './sos/fetchDescription';
import { PublishDescription } from './sos/publishDescription';
import { provideRouter, RouterConfig } from '@angular/router';

export const routes: RouterConfig = [
  { path: '', component: Home },
  { path: 'editor', component: Editor },
  { path: 'editor/:id', component: Editor },
  { path: 'fetch', component: FetchDescription },
  { path: 'publish', component: PublishDescription }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
