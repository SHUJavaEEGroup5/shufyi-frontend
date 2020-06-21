import { Injectable } from '@angular/core';
import { PaginationReviewFromMulti, PaginationReviewFromOne } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    constructor(
        private http: HttpClient,
    ) {}

    getReviewFromOne(username: string, offset: number, step: number): Observable<PaginationReviewFromOne> {
        return this.http.get<PaginationReviewFromOne>('/api/user/review?user=' + username + '?offset=' + offset + '?limit=' + step);
    }

    // unchecked
    getReviewFromMulti(course: string, teacher: string, offset: number, step: number): Observable<PaginationReviewFromMulti> {
        return this.http.get<PaginationReviewFromMulti>('xxxx' + course + '?offset=' + offset + '?limit=' + step);
    }
}
