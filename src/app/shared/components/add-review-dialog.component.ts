import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService, ReviewService } from '../services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss'],
})
export class AddReviewDialogComponent implements OnInit {
  reviewForm: FormGroup;

  score = 4;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private reviewService: ReviewService,
    public dialogRef: MatDialogRef<AddReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      courseId: number;
      courseName: string;
    },
  ) {
    this.reviewForm = this.formBuilder.group({
      trimester: ['', Validators.required],
      teacherName: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  get trimesters() {
    const result = [];
    const date = new Date();
    date.setMonth(date.getMonth() - 8);
    for (let i = date.getFullYear() % 100; i >= date.getFullYear() % 100 - 4; i -= 1) {
      result.push(`${i}-${i + 1}春`);
      result.push(`${i}-${i + 1}冬`);
      result.push(`${i}-${i + 1}秋`);
    }
    return result;
  }

  ngOnInit(): void {
  }

  submit() {
    this.reviewService.createReview({
      courseId: this.data.courseId,
      rate: this.score,
      trimester: this.reviewForm.get('trimester').value,
      teacherName: this.reviewForm.get('teacherName').value,
      content: this.reviewForm.get('content').value,
    }).subscribe((data) => {
      console.log(data);
      this.courseService.getCourseReviews(this.data.courseId).subscribe((value) => {
        this.dialogRef.close(value);
      });
    });
  }
}
