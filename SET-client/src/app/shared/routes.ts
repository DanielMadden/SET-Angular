import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { PagePracticeComponent } from '../pages/page-practice/page-practice.component';

export const routes: Routes = [
  {
    path: 'practice',
    component: PagePracticeComponent,
  },
  {
    path: '',
    component: AppComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
