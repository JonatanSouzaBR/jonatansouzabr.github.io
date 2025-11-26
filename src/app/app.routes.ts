import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MasterclassesComponent } from './pages/masterclasses/masterclasses.component';
import { MentorDashboardComponent } from './pages/mentor-dashboard/mentor-dashboard.component';
import { MasterclassDetailComponent } from './pages/masterclass-detail/masterclass-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'masterclasses', component: MasterclassesComponent },
  { path: 'masterclasses/:id', component: MasterclassDetailComponent },
  { path: 'mentor/dashboard', component: MentorDashboardComponent },
  { path: '**', redirectTo: '' }
];

