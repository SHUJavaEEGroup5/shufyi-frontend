import { Injectable } from '@angular/core';
import { AuthTokenRequest, AuthTokenResponse, User } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new Subject<User | null>();

  constructor(
    private http: HttpClient,
  ) {}

  getToken(): string | null {
    return window.localStorage.getItem('sf_token');
  }

  saveToken(token: string) {
    window.localStorage.setItem('sf_token', token);
  }

  getUser(): Observable<User | null> {
    return this.user.asObservable();
  }

  setUser(user?: User) {
    window.localStorage.setItem('sf_user', JSON.stringify(user));
    this.user.next(user || null);
  }

  destroyToken() {
    window.localStorage.removeItem('sf_token');
  }

  login(authTokenRequest: AuthTokenRequest): Observable<AuthTokenResponse> {
    console.log(authTokenRequest);
    return this.http.post<AuthTokenResponse>('/api/auth/token', authTokenRequest);
  }
}
