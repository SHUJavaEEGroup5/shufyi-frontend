import { Injectable } from '@angular/core';
import { WishAddRequest, WishRequest, WishResponse } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WishListService {
    constructor(
        private http: HttpClient,
    ) {}

    addWish(wishAddRequest: WishAddRequest): Observable<void> {
        return this.http.post<void>('/api/wish', wishAddRequest);
    }

    addWishBatch(wishAddRequests: WishAddRequest[]): Observable<void> {
        return this.http.post<void>('/api/wish/batch', wishAddRequests);
    }

    getWishList(username: string|undefined): Observable<WishResponse[]> {
        return this.http.get<WishResponse[]>('/api/wish?user=' + username);
    }

    getWishListFinished(username: string | undefined): Observable<WishResponse[]> {
        return this.http.get<WishResponse[]>('/api/wish/finished?user=' + username);
    }

    completeWish(wishRequests: WishRequest[]): Observable<void> {
        return this.http.put<void>('/api/wish', wishRequests);
    }

    deleteWish(wishRequests: WishRequest[]): Observable<void> {
        return this.http.patch<void>('/api/wish', wishRequests);
    }

}
