import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./songs/songs-page').then((m) => m.SongsPage),
  },
  { path: '**', redirectTo: '' },
];
