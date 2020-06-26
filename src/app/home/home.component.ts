import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ReviewFromMulti, WishAddRequest} from '../shared/models';
import {switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ReviewService} from '../shared/services';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  reviews: ReviewFromMulti[] = [];
  isLoading: boolean;
  constructor(
    private router: Router,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
      this.updateReviews();
  }

  emailVerify() {
    this.router.navigateByUrl('/verify/123456789', { replaceUrl: true }).then((r) => {});
  }

  personalPage() {
    this.router.navigateByUrl('/people/test', { replaceUrl: true }).then((r) => {});
  }

  courseManagePage() {
    this.router.navigateByUrl('/admin/courses', { replaceUrl: true }).then((r) => {});
  }

    jumpToCourse(courseId: string) {
        this.router.navigateByUrl('/courses/' + courseId, { replaceUrl: true }).then((r) => {});
    }

    updateReviews() {
      this.isLoading = true;
        // console.log('from: ' + this.currentPeople + ' pageIndex: ' + this.pageEvent.pageIndex + ' pageSize: ' + this.pageSize);
      this.reviewService.getLatestReviews().subscribe(
            (data) => {
                console.log(data);
                this.reviews = data;
                this.isLoading = false;
                console.log('isLoading:' + this.isLoading);
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                if (err.status === 400) {
                    this.snackBar.open(err.error.message, undefined, { duration: 5000 });
                } else if (err.status > 0) {
                    this.snackBar.open(`${err.statusText} (${err.status})`, undefined, { duration: 5000 });
                } else {
                    this.snackBar.open('出现了网络错误，请稍后重试…', undefined, { duration: 5000 });
                }
            },
        );
        // mock
        // this.reviews = this.reviewsMock;
      console.log('reviews:' + this.reviews);
    }

    getStars(rate: number): string {
        const stars = [];
        let i;
        for (i = 1; i < rate; i++) {
            stars.push('★');
        }
        if (rate - i + 1 >= 0.25 && rate - i + 1 < 0.75) {
            stars.push('☆');
        } else {
            stars.push('★');
        }
        return stars.join(' ');
    }

}
