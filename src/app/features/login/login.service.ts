import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  private readonly CLIENT_ID = 'tvshows-frontend';
  private readonly CLIENT_SECRET = '#V!=)~iY8{-~;o7';

  constructor(private httpClient: HttpClient) {
  }

  public signin(username: string, password: string): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET));

    const body = new HttpParams().set('username', username).set('password', password).set('grant_type', 'password');

    return this.httpClient.post('http://localhost:8282/oauth/token', body, {headers});
  }

}
