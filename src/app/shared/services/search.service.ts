import { Injectable } from '@angular/core';
import { SimpleSearchResponse } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private http: HttpClient,
  ) {}

  simpleSearch(toSearch: string): Observable<SimpleSearchResponse[]> {
    console.log(toSearch);
    return this.http.get<SimpleSearchResponse[]>('/api/search/simple?toSearch=' + toSearch);
  }
}
