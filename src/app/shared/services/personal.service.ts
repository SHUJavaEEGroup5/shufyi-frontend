import { Injectable } from '@angular/core';
import { InterestsRequest } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsernameRequest } from '../models/username-request';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  constructor(
    private http: HttpClient,
  ) {}

  setInterests(interestsRequest: InterestsRequest): Observable<void> {
    console.log(interestsRequest);
    return this.http.post<void>('/api/interest', interestsRequest);
  }

  getInterests() {
    return this.http.get<InterestsRequest>('/api/interest');
  }

  setUserName(username: UsernameRequest) {
    return this.http.post<void>('/api/user/username', username);
  }
}
