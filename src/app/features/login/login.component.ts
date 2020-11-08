import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit() {
  }

  public signin(): void {
    this.loginService.signin(this.username, this.password)
                     .subscribe(data => this.goToMainPage(data.access_token, data.expires_in), error => this.handleError());
  }

  public goToMainPage(accessToken: string, expirationTime: number): void {
    this.cookieService.set('accessToken', accessToken, expirationTime);
    this.cookieService.set('currentUsername', this.username, expirationTime);
    this.userService.setNewUsername(this.username);
    this.router.navigate(['/shows']);
  }

  public handleError(): void {
    alert('Invalid credentials');
    this.username = '';
    this.password = '';
  }
}
