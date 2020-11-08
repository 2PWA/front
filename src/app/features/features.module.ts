import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { LoginService } from './login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    ShowsComponent,
    ShowDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    CookieService,
    LoginService
  ],
  exports: [
    LoginComponent,
    UserComponent,
    ShowsComponent,
    ShowDetailComponent
  ]
})
export class FeaturesModule { }
