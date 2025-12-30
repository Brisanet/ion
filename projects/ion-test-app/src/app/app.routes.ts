import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocWrapperComponent } from './components/doc-wrapper.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'components',
    component: DocWrapperComponent,
    children: [
      {
        path: 'buttons',
        component: ButtonsComponent,
      },
      {
        path: 'popover',
        loadComponent: () =>
          import('./components/popover/popover.component').then(
            (m) => m.PopoverComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'buttons',
        pathMatch: 'full',
      },
    ],
  },
];
