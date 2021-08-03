import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { PageHomeComponent } from '../pages/page-home/page-home.component';
import { PagePracticeComponent } from '../pages/page-practice/page-practice.component';

export const routes: Routes = [
  {
    path: 'practice',
    component: PagePracticeComponent,
  },
  {
    path: '',
    component: PageHomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
