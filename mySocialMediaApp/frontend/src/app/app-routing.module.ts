import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { OutlineLayoutComponent } from './layouts/outline-layout/outline-layout.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { SigninComponent } from './pages/user/signin/signin.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: OutlineLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'user/:userId',
        component: UserProfileComponent
      },
      {
        path: 'users',
        component: AllUsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
