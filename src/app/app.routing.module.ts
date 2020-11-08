
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { UserComponent } from './features/user/user.component';
import { ShowsComponent } from './features/shows/shows.component';
import { ShowDetailComponent } from './features/show-detail/show-detail.component';
import { AuthGuard } from './core/guards/auth.guard';

const RootRouterConfig: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent},
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'shows', component: ShowsComponent, canActivate: [AuthGuard] },
  { path: 'show-detail', component: ShowDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(RootRouterConfig)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
