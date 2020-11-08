import { NgModule } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { ShowService } from './services/show.service';

@NgModule({
  providers: [
    AuthGuard,
    UserService,
    ShowService
  ]
})
export class CoreModule { }
