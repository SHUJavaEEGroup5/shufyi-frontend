import { Injectable } from '@angular/core';
import { InterestsRequest} from '../models';
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
    return this.http.post<void>('/api/personal/interests', InterestsRequest);
  }
  getInterests() {
    return this.http.get<InterestsRequest>('/api/personal/interests');
  }
}
