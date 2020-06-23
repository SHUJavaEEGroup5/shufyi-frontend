import { Injectable } from '@angular/core';
import {PaginationReviewFromMulti, PaginationReviewFromOne, ReviewFromOne} from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    constructor(
        private http: HttpClient,
    ) {}

    getReviewFromOne(username: string, offset: number, step: number): Observable<ReviewFromOne[]> {
        return this.http.get<ReviewFromOne[]>('/api/user/reviews?userName=' + username +
            '&orderByColumn=createTime&ascending=false' + '&offset=' + offset + '&limit=' + step);
    }

    // unchecked
    getReviewFromMulti(course: string, teacher: string, offset: number, step: number): Observable<PaginationReviewFromMulti> {
        return this.http.get<PaginationReviewFromMulti>('xxxx' + course + '&offset=' + offset + '&limit=' + step);
    }
}
