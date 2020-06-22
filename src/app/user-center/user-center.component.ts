import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { AuthService, PersonalService, ReviewService, WishListService } from '../shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginationReviewFromOne, ReviewFromOne, User, UserInfo, WishRequest, WishResponse } from '../shared/models';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatListOption } from '@angular/material/list';

@Component({
    selector: 'app-user-center',
    templateUrl: './user-center.component.html',
    styleUrls: ['./user-center.component.scss'],
})

export class UserCenterComponent implements OnInit, OnDestroy {
    usernameForm: FormGroup;
    public isSetUsername: boolean;
    public isSelf: boolean;
    private currentPeople: string;
    user: User | null;
    private userSubscription: Subscription;
    public userInfo: UserInfo;
    public totalRecordNumber: number;
    public pageNo: number;
    public pageSize: number;
    public pageSizeOptions: number[] =  [10, 20, 50];
    public reviews: PaginationReviewFromOne;
    public pageEvent: PageEvent;
    public wishListIds: WishRequest[];
    public wishListIdsFinished: WishRequest[];
    public wishList: WishResponse[];
    public wishListFinished: WishResponse[];

    // mock
    userInfoMock: UserInfo = {
        username: '一只迷路的小猫',
        major: '计算机科学',
        grade: '2018',
        email: 'xxx@shu.edu.cn',
        src: 'https://placekitten.com/199/200'
    };

    reviewMock1: ReviewFromOne = {
        courseId: '1',
        trimester: '19-20春',
        teacherName: '邹国兵',
        rate: 5,
        content:  '超喜欢邹老师的，上课上得好，说话又好听！（',
        upVoterNum: 35,
        createTime: '123456'
    };

    reviewMock2: ReviewFromOne = {
        courseId: '2',
        trimester: '19-20冬',
        teacherName: '邹国兵',
        rate: 7,
        content:  '超喜欢邹老师的，上课上得好，说话又好听！（',
        upVoterNum: 99,
        createTime: '1234'
    };

    reviewsMock: PaginationReviewFromOne = {
        pageNumber: 100,
        reviews: [
            this.reviewMock1,
            this.reviewMock2,
            this.reviewMock1,
            this.reviewMock2,
            this.reviewMock1,
            this.reviewMock2,
            this.reviewMock1,
            this.reviewMock2,
            this.reviewMock1,
            this.reviewMock2,
        ]
    };
    wishMock1: WishResponse =  { id: '0', courseId: '1', courseName: 'Java EE', createTime: '456' };
    wishMock2: WishResponse =  { id: '1', courseId: '2', courseName: '毛泽东思想概论xxxxxxxx', createTime: '456' };
    wishMock3: WishResponse =  { id: '2', courseId: '3', courseName: 'Java EE', createTime: '456' };
    wishListMock: WishResponse[] = [
        this.wishMock1,
        this.wishMock2,
        this.wishMock3,
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private personalService: PersonalService,
        private reviewService: ReviewService,
        private wishListService: WishListService,
        private snackBar: MatSnackBar,
    ) {
        this.userSubscription = this.authService.getUser().subscribe((user) => this.user = user);
        this.usernameForm = this.formBuilder.group({
            username: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        // fetch user info to display
        this.route.paramMap.subscribe(params => {
            this.currentPeople = params.get('username');
        });
        // judge whether people here is self
        this.isSelf = this.user !== undefined && this.currentPeople === this.user.username;
        this.personalService.getUserInfo(this.currentPeople).subscribe(
            (data) => {
                console.log(data);
                if (data.email !== undefined) {
                    this.userInfo = data;
                } else {
                    this.userInfo.username = data.username;
                    this.userInfo.grade = data.grade;
                    this.userInfo.major = data.major;
                    this.userInfo.src = data.src;
                }
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
        this.userInfo = this.userInfoMock;
        // mock
        this.reviews = this.reviewsMock;
        this.totalRecordNumber = this.reviews.pageNumber;
        this.updateReviews();

        // mock
        this.wishList = this.wishListMock;
        this.wishListFinished = this.wishListMock;
        this.updateWishList();

        console.log(this.wishList);
        console.log(this.wishListFinished);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    submitUsername() {
        this.personalService.setUserName(this.usernameForm.value).subscribe(
            (data) => {
                console.log(data);
                this.isSetUsername = true;
                // 更新username
                this.user.username = this.usernameForm.value;
                this.authService.setUser(this.user);
                this.snackBar.open('更新成功', undefined, { duration: 2000 });
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

    pageChangeEvent(event) {
        this.pageSize = event.pageSize;
        this.pageNo = event.pageIndex;
        this.updateReviews();
    }

    updateReviews() {
        this.reviewService.getReviewFromOne(this.currentPeople, this.pageEvent.pageIndex, this.pageSize).subscribe(
            (data) => {
                console.log(data);
                this.reviews = data;
                this.totalRecordNumber = data.pageNumber;
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
        this.reviews = this.reviewsMock;
    }

    getStarts(score: number): string {
        let temp = '';
        for (let j = 0; j < score; j++) {
            temp += '★ ';
        }
        return temp;
    }

    personalPage(name: string) {
        this.router.navigateByUrl('/people/' + name, { replaceUrl: true }).then((r) => {});
    }

    completeWishes() {
        this.wishListService.completeWish(this.wishListIds).subscribe(
            (data) => {
                this.snackBar.open(' 添加成功！', undefined, { duration: 2000 });
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
        this.updateWishList();
    }

    removeWishes() {
        this.wishListService.deleteWish(this.wishListIds).subscribe(
            (data) => {
                this.snackBar.open(' 移除成功！', undefined, { duration: 2000 });
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
        this.updateWishList();
    }

    updateWishList() {
        console.log(this.wishList);
        console.log(this.wishListFinished);
        this.wishListService.getWishList(this.userInfo.username).subscribe(
            (data) => {
                console.log(data);
                this.wishList = data;
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                if (err.status === 400) {
                    this.snackBar.open(err.error.message, undefined, {duration: 5000});
                } else if (err.status > 0) {
                    this.snackBar.open(`${err.statusText} (${err.status})`, undefined, {duration: 5000});
                } else {
                    this.snackBar.open('出现了网络错误，请稍后重试…', undefined, {duration: 5000});
                }
            },
        );
        this.wishListService.getWishListFinished(this.userInfo.username).subscribe(
            (data) => {
                console.log(data);
                this.wishList = data;
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                if (err.status === 400) {
                    this.snackBar.open(err.error.message, undefined, {duration: 5000});
                } else if (err.status > 0) {
                    this.snackBar.open(`${err.statusText} (${err.status})`, undefined, {duration: 5000});
                } else {
                    this.snackBar.open('出现了网络错误，请稍后重试…', undefined, {duration: 5000});
                }
            },
        );
        this.wishList = this.wishListMock;
        this.wishListFinished = this.wishListMock;
        console.log(this.wishList);
        console.log(this.wishListFinished);
    }

    onSelection(options: MatListOption[]) {
        this.wishListIds = [];
        for (const wishId of options.map(o => o.value)) {
            this.wishListIds.push(new WishRequest(wishId));
        }
        console.log(this.wishListIds);
    }

    onSelectionFinished(options: MatListOption[]) {
        this.wishListIdsFinished = [];
        for (const wishId of options.map(o => o.value)) {
            this.wishListIdsFinished.push(new WishRequest(wishId));
        }
        console.log(this.wishListIdsFinished);
    }
}
