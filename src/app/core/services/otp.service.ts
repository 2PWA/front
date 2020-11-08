import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class OtpService {
  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) {
  }
  public generate(): Observable<string> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.cookieService.get('accessToken'));
    const options = { };
    options['headers'] = headers;
    options['responseType'] = 'text';
    return this.httpClient.get<string>('https://ppwa-users.herokuapp.com/api/otp', options);
  }
}
