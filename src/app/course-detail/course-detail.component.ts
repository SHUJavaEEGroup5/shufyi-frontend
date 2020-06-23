import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AddReviewDialogComponent,
  ConfirmDialogData,
  ConfirmWishDialogComponent,
  Course,
  CourseService,
  ReviewFromOne,
  WishAddRequest,
  WishListService,
  PersonalService,
  RecommendResponse,
} from '../shared';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course?: Course = null;

  reviews: ReviewFromOne[] = [];

  currentCourseId = -1;

  recommendCourses: RecommendResponse[];
  recommendSelected: WishAddRequest[];
  
  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private wishListService: WishListService,
    private personalService: PersonalService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  getStars(rate: number): string {
    const stars = [];
    let i;
    for (i = 0; i < rate; i++) {
      stars.push('★');
    }
    if (rate - i >= 0.45) {
      stars.push('☆');
    }
    return stars.join(' ');
  }

  openNewReviewDialog(): void {
    const dialogRef = this.dialog.open(AddReviewDialogComponent, {
      width: '720px',
      data: {
        courseId: this.currentCourseId,
        courseName: this.course.courseName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.reviews = result;
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.currentCourseId = parseInt(params.get('id'), 10);
        return this.courseService.getCourse(parseInt(params.get('id'), 10));
      }),
    ).subscribe((data) => {
      this.course = data;
      console.log(data);
    });
    this.route.paramMap.pipe(
      switchMap((params) => this.courseService.getCourseReviews(parseInt(params.get('id'), 10))),
    ).subscribe((data) => {
      this.reviews = data;
      console.log(data);
    });
  }

  addNewWish() {
    // mock
    // const wishRequest = new WishRequest(this.currentCourseId);
    // test
    const wishAddRequest = new WishAddRequest(this.currentCourseId);
    this.wishListService.addWish(wishAddRequest)
      .subscribe(
        (data) => {
          this.openNewWishDialog();
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
    // this.openNewWishDialog();
  }

  getRecommend() {
    this.personalService.recommend()
        .subscribe(
            (data) => {
              this.recommendCourses = data;
              for (const item of data) {
                this.recommendSelected.push(new WishAddRequest(item.courseId));
              }
              this.openNewWishDialog();
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
  }

  openNewWishDialog(): void {
    const dialogRef = this.dialog.open(ConfirmWishDialogComponent, {
      width: '720px',
      data: new ConfirmDialogData(this.course.courseName, this.course.courseNumber,
        this.course.credits, this.course.type, this.course.college, this.recommendSelected, this.recommendCourses),
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
