import { Injectable } from '@angular/core';
import { InterestsRequest, UsernameRequest, UserInfo } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // 根据姓名 返回自己或别人信息
  getUserInfo(name: string) {
    return this.http.get<UserInfo>('/api/user/info?user=' + name);
  }
}
