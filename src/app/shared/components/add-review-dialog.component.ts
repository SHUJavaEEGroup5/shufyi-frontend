import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss'],
})
export class AddReviewDialogComponent implements OnInit {
  score = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
