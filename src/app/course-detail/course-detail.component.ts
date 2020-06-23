import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewDialogComponent, ConfirmWishDialogComponent, ReviewFromOne } from '../shared';
import { CourseService, WishListService } from '../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogData, Course, WishRequest, WishAddRequest } from '../shared/models';
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

  teachers = [
    {
      id: 0,
      teacherName: '邹国兵',
    }, {
      id: 1,
      teacherName: '宋波',
    },
  ];

  selectedTeacherId = -1;

  currentCourseId = -1;

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private wishListService: WishListService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  get reviewsQueryParams() {
    return {
      courseId: 123,
      teacherId: this.selectedTeacherId,
    };
  }

  get t() {
    return JSON.stringify(this.reviewsQueryParams);
  }

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
    });
    dialogRef.afterClosed().subscribe((result) => {
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
    const wishAddRequest = new WishAddRequest('1');
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

  openNewWishDialog(): void {
    const dialogRef = this.dialog.open(ConfirmWishDialogComponent, {
      width: '720px',
      data: new ConfirmDialogData(this.course.courseName, this.course.courseNumber,
        this.course.credits, this.course.type, this.course.college),
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  selectTeacher(id) {
    this.selectedTeacherId = this.selectedTeacherId === id ? -1 : id;
    console.log(this.selectedTeacherId);
  }
}
