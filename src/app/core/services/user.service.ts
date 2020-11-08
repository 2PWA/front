import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { NewUser } from '../models/new-user';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserService {

  private currentUsername: string;

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) {
  }

  public findByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>('https://ppwa-users.herokuapp.com/api/users/' + username);
  }

  public create(newUser: NewUser): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookieService.get('accessToken'));
    const options = { headers };
    return this.httpClient.post('https://ppwa-users.herokuapp.com/api/users', newUser, options);
  }

  public update(newUser: NewUser): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookieService.get('accessToken'));
    const options = { headers };
    return this.httpClient.put('https://ppwa-users.herokuapp.com/api/users', newUser, options);
  }

  public delete(username: string, verificationCode: number, uuid: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookieService.get('accessToken'));
    const options = { headers, body: { uuid, otpCode: verificationCode }};
    return this.httpClient.delete('https://ppwa-users.herokuapp.com/api/users/' + username, options);
  }

  public setNewUsername(username: string) {
    this.currentUsername = username;
  }

  public getCurrentUsername(): string {
    return this.currentUsername;
  }
}
