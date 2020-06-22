import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewDialogComponent } from '../shared/components';
import { CourseService } from '../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../shared/models';
import { switchMap } from 'rxjs/operators';
import { Review } from '../shared/models/review';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course?: Course = null;

  reviews: Review[] = [];

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

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    private route: ActivatedRoute,
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
      switchMap((params) => this.courseService.getCourse(parseInt(params.get('id'), 10))),
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

  selectTeacher(id) {
    this.selectedTeacherId = this.selectedTeacherId === id ? -1 : id;
    console.log(this.selectedTeacherId);
  }
}
