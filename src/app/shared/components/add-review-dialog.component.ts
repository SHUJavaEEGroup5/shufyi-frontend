import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss'],
})
export class AddReviewDialogComponent implements OnInit {
  reviewForm: FormGroup;

  score = 4;

  teachers = ['邹国兵', '宋波'];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.reviewForm = this.formBuilder.group({
      trimester: ['', Validators.required],
      teacher: ['', Validators.required],
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

}
