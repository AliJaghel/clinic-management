import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { PatientsComponent } from './patients/patients.component';


const routes: Routes = [
  {
    path: '', loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent), canActivate: [AuthGuard], data: { roles: ['Admin', 'User'] },
    children: [
      { path: 'patients', loadComponent: () => import('./patients/patients.component').then(mod => mod.PatientsComponent), canActivate: [AuthGuard], data: { roles: ['Admin', 'User'] } },
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
