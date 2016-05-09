import { Home } from './home/home';
import { Editor } from './editor/editor';
import { RouteDefinition } from '@angular/router-deprecated';

export const ROUTE_CONFIG: RouteDefinition[] = [
  { path: '/', component: Home, name: 'Home', useAsDefault: true },
  { path: '/editor/:id', component: Editor, name: 'Editor' }
];
