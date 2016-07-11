import { Home } from './home/home';
import { Editor } from './editor/editor';
import { Templates } from './templates/templates';
import { provideRouter, RouterConfig } from '@angular/router';

export const routes: RouterConfig = [
  { path: '', component: Home },
  { path: 'editor', component: Editor },
  { path: 'editor/:id', component: Editor },
  { path: 'templates', component: Templates }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
