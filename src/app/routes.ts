import {Home} from './home/home';
import {Editor} from './editor/editor';
import {RouteDefinition} from 'angular2/router';

export const ROUTES: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
    as: 'Index'
  },
  {
    path: '/home',
    component: Home,
    as: 'Home'
  },
  {
    path: '/editor/:id',
    component: Editor,
    as: 'Editor'
  },
  {
    path: '/**',
    redirectTo: ['Index']
  }
]