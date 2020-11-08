import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/core/models/new-user';
import { OtpService } from 'src/app/core/services/otp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public newUser = new NewUser();
  public messageCreation: string;
  public messageSearch: string;
  public usernameSearch: string;
  public userSearch = new User();
  public newPassword: string;
  public updateUser = new NewUser();
  constructor(private readonly userService: UserService, private readonly otpService: OtpService,
              private readonly router: Router, private readonly cookieService: CookieService) {

    this.userService.findByUsername(this.cookieService.get('currentUsername'))
                    .subscribe(user => this.validatePermisions(user));
   }

  ngOnInit() {
  }

  private validatePermisions(user: User) {
    if (!user.admin) {
      this.router.navigate(['/shows']);
    }
  }

  public create(): void {
    if (!this.newUser.username || !this.newUser.password) {
      this.messageCreation = 'There are unfilled fields';
      return;
    }
    this.userService.create(this.newUser)
                    .subscribe(_ => {
                      this.messageCreation = 'User created';
                      this.newUser.username = '';
                      this.newUser.password = '';
                      this.newUser.countryCode = '';
                      this.newUser.phoneNumber = '';
                      this.newUser.admin = false;
                    }, _ => this.messageCreation = 'Error creating user');
  }

  public search(): void {
    this.userService.findByUsername(this.usernameSearch)
                    .subscribe(user => this.userSearch = user,
                      error => Swal.fire({icon: 'error', title: 'Oops...', text: `User ${this.usernameSearch} does not exist`}));
  }

  public update(): void {
    if (!this.userSearch.username || !this.newPassword) {
      this.messageSearch = 'There are unfilled fields';
      return;
    }
    this.updateUser = new NewUser();
    this.updateUser.username = this.userSearch.username;
    this.updateUser.password = this.newPassword;
    this.updateUser.admin = this.userSearch.admin;
    this.userService.update(this.updateUser)
                    .subscribe(_ => {
                      this.messageSearch = 'User updated';
                      this.updateUser = new NewUser();
                      this.userSearch = new User();
                      this.usernameSearch = '';
                      this.newPassword = '';
                    }, _ => this.messageSearch = 'Error updating user');
  }

  private delete(verificationCode: number, uuid: string): void {
    this.userService.delete(this.userSearch.username, verificationCode, uuid)
                    .subscribe(_ => {
                      Swal.fire('Good job!', `User ${this.userSearch.username} was removed`, 'success');
                      this.messageSearch = 'User deleted';
                      this.usernameSearch = '';
                      this.updateUser = new NewUser();
                      this.userSearch = new User();
                    }, _ => {
                      this.messageSearch = 'Error deleting user';
                      Swal.fire({icon: 'error', title: 'Oops...', text: 'Bad verification code. Try again!'});
                    });
  }

  public generateCode(): void {
    this.otpService.generate().subscribe(uuid => {
      Swal.fire({
        title: 'Confirm delete user',
        input: 'number',
        inputLabel: 'Enter the verification code sent to WhatsApp',
        inputPlaceholder: 'Verification code',
        allowOutsideClick: false,
        allowEscapeKey: false,
        inputValidator: (value) => {
          return !value && 'You need to write something!';
        }
      }).then(result => {
        this.delete(result.value, uuid);
      });
    }, err => Swal.fire({icon: 'error', title: 'Oops...', text: `Something went wrong generating access code`}));
  }
}
