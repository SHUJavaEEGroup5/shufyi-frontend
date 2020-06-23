import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ConfirmDialogData, RecommendResponse, UserInfo, WishAddRequest} from '../models';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { WishListService } from '../services';
import { HttpErrorResponse } from '@angular/common/http';

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
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    courseCtrl = new FormControl();
    filteredCourses: Observable<string[]>;
    courseSelected: WishAddRequest[];
    courseSelectedMock: WishAddRequest[] = [{courseId: 1}, {courseId: 2}];
    coursesMock: RecommendResponse[] = [{courseId: 1, courseName: '测试'}, {courseId: 2, courseName: '测试2'}];

    @ViewChild('courseInput') courseInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    ngOnInit() {
        // mock
        this.data.courses = this.coursesMock;
        this.data.courseSelected = this.courseSelectedMock;
    }

    constructor(
        public dialogRef: MatDialogRef<ConfirmWishDialogComponent>,
        public wishListService: WishListService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
        console.log(this.data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    remove(courseId: number): void {
        const removedCourse = new WishAddRequest(courseId);
        const index = this.data.courseSelected.indexOf(removedCourse);

        if (index >= 0) {
            this.data.courseSelected.splice(index, 1);
        }
    }
    addBatch(): void {
        this.wishListService.addWishBatch(this.data.courseSelected).subscribe(
            (data) => {
                this.snackBar.open('添加成功！', undefined, { duration: 5000 });
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
        )
    }
}
