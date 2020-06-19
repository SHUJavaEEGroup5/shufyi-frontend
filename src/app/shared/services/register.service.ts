import { Injectable } from '@angular/core';
import {AuthTokenResponse, RegisterAttempt} from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private http: HttpClient,
  ) {}

  register(registerAttempt: RegisterAttempt): Observable<AuthTokenResponse> {
    // this.http.
    registerAttempt.campusEmailDomain = '@' + registerAttempt.campusEmailAccount.split('@')[1];
    registerAttempt.campusEmailAccount = registerAttempt.campusEmailAccount.split('@')[0];
    console.log(registerAttempt);
    return this.http.post<AuthTokenResponse>('/api/auth/register', RegisterAttempt);
  }
  validateEmail(token: string) {
    return this.http.get('/api/auth/validate?' + token);
  }
}
