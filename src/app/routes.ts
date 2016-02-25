import { Home } from './home/home';
import { Editor } from './editor/editor';
import { RouteDefinition } from 'angular2/router';

export const ROUTE_CONFIG: RouteDefinition[] = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/editor/:id', component: Editor, name: 'Editor' },
  { path: '/**', redirectTo: ['Home'], name: 'Default' }
];
