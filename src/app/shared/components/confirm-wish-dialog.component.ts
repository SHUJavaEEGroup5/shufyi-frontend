import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from '../models';

@Component({
    selector: 'app-pupup-form',
    templateUrl: './confirm-wish-dialog.component.html',
    styleUrls: ['./confirm-wish-dialog.component.scss'],
    providers: [MatDialogModule]
})
export class ConfirmWishDialogComponent implements OnInit {
    courseName: string;
    courseNumber: string;
    credits: number;
    type: string;
    college: string;
    ngOnInit() {

    }

    constructor(
        public dialogRef: MatDialogRef<ConfirmWishDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
        console.log(this.data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}