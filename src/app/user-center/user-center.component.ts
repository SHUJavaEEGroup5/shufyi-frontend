import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { AuthService, PersonalService, ReviewService, WishListService } from '../shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewFromOne, User, UserInfo, WishRequest, WishResponse } from '../shared/models';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatListOption } from '@angular/material/list';
import { Major, School } from '../shared/components';

@Component({
    selector: 'app-user-center',
    templateUrl: './user-center.component.html',
    styleUrls: ['./user-center.component.scss'],
})

export class UserCenterComponent implements OnInit, OnDestroy {
    usernameForm: FormGroup;
    changePasswordForm: FormGroup;
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
    public reviews: ReviewFromOne[];
    public pageEvent: PageEvent;
    public wishListIds: WishRequest[];
    public wishListIdsFinished: WishRequest[];
    public wishList: WishResponse[];
    public wishListFinished: WishResponse[];
    public isLoading: boolean;

    // major info
    majors1: Major[] = [
        { value: '0081', label: '伟长学院' },
        { value: '0085', label: '体育学院' },
    ];
    majors2: Major[] = [
        { value: '0100', label: '数学1' },
        { value: '0101', label: '数学2' },
        { value: '0103', label: '物理' },
        { value: '0104', label: '电子1' },
        { value: '0105', label: '电子2' },
        { value: '0106', label: '化学' },
    ];
    majors3: Major[] = [
        { value: '0180', label: '力学1' },
        { value: '0182', label: '力学2' },
    ];
    majors4: Major[] = [
        { value: '0207', label: '汉语' },
        { value: '0208', label: '历史' },
        { value: '0260', label: '汉语言教育' },
    ];
    majors5: Major[] = [
        { value: '2800', label: '社会院通识' },
        { value: '0209', label: '社会学' },
        { value: '0275', label: '社会工作' },
    ];
    majors6: Major[] = [
        { value: '0300', label: '外语' },
        { value: '0311', label: '英语' },
        { value: '0312', label: '日语' },
    ];
    majors7: Major[] = [
        { value: '0400', label: '经济院 通识' },
        { value: '0413', label: '经济学' },
        { value: '0414', label: '金融学' },
        { value: '0415', label: '国际贸易' },
        { value: '0416', label: '财政学院' },
    ];
    majors8: Major[] = [
        { value: '2400', label: '管理院通识' },
        { value: '0417', label: '商务' },
        { value: '0418', label: '工程管理' },
        { value: '0419', label: '营销' },
        { value: '0420', label: '会计' },
        { value: '0463', label: '计量经济学' },
        { value: '0464', label: '物流管理' },
        { value: '0466', label: '管理学' },
    ];
    majors9: Major[] = [
        { value: '2500', label: '图情档通识' },
        { value: '0423', label: '信息管理' },
    ];
    majors10: Major[] = [
        { value: '0600', label: '法学院' },
        { value: '0624', label: '知识产权' },
        { value: '0626', label: '法学' },
    ];
    majors11: Major[] = [
        { value: '0700', label: '通信院' },
        { value: '0725', label: '网络' },
        { value: '0728', label: '多媒体' },
        { value: '0729', label: '生物工程' },
    ];
    majors12: Major[] = [
        { value: '0800', label: '计算机通识' },
        { value: '0830', label: '计科' },
        { value: '0869', label: '智科' },
    ];
    majors13: Major[] = [
        { value: '0900', label: '机自通识' },
        { value: '0931', label: '工业工程' },
        { value: '0932', label: '机械' },
        { value: '0935', label: '模型设计' },
        { value: '0936', label: '自动化' },
        { value: '09A1', label: '材料工程' },
        { value: '09A2', label: '机械原理' },
        { value: '09A3', label: '控制工程' },
    ];
    majors14: Major[] = [
        { value: '1000', label: '材料通识' },
        { value: '1038', label: '治金' },
        { value: '1039', label: '材料' },
        { value: '1040', label: '高分子' },
        { value: '1041', label: '无机' },
        { value: '1042', label: '半导体' },
        { value: '1043', label: '功能材料' },
    ];
    majors15: Major[] = [
        { value: '1100', label: '环化院通识' },
        { value: '1144', label: '环境工程' },
        { value: '1145', label: '化工' },
    ];
    majors16: Major[] = [
        { value: '1200', label: '生科院通识' },
        { value: '1248', label: '生科' },
        { value: '1249', label: '食品工程' },
        { value: '1283', label: '生物工程' },
    ];
    majors17: Major[] = [
        { value: '1200', label: '生科院通识' },
        { value: '1248', label: '生科' },
        { value: '1249', label: '食品工程' },
        { value: '1283', label: '生物工程' },
    ];
    majors18: Major[] = [
        { value: '1300', label: '美术院通识' },
        { value: '1350', label: '绘画' },
        { value: '1351', label: '书法' },
        { value: '1352', label: '雕塑' },
        { value: '1377', label: '数字媒体' },
    ];
    majors19: Major[] = [
        { value: '1600', label: '社科院通识' },
        { value: '1658', label: '社科院公共' },
        { value: '1661', label: '哲学' },
        { value: '16A5', label: '政治学' },
    ];
    majors20: Major[] = [
        { value: '1700', label: '新闻院' },
        { value: '1800', label: '土木系通识' },
        { value: '1846', label: '土木工程' },
    ];
    majors21: Major[] = [
        { value: '2200', label: '数码院通识' },
        { value: '1800', label: '通识' },
        { value: '1846', label: '土木工程' },
    ];
    majors22: Major[] = [
        { value: '3100', label: '音乐院通识' },
        { value: '3173', label: '音乐学' },
        { value: '3197', label: '音乐表演' },
    ];
    schools: School[] = [
        { label: '校直属', majors: this.majors1 },
        { label: '理学院', majors: this.majors2 },
        { label: '理学院', majors: this.majors3 },
        { label: '文学院', majors: this.majors4 },
        { label: '社会学', majors: this.majors5 },
        { label: '外语院', majors: this.majors6 },
        { label: '经济院', majors: this.majors7 },
        { label: '管理院', majors: this.majors8 },
        { label: '图情档', majors: this.majors9 },
        { label: '法学院', majors: this.majors10 },
        { label: '通信院', majors: this.majors11 },
        { label: '计算机', majors: this.majors12 },
        { label: '机自院', majors: this.majors13 },
        { label: '材料院', majors: this.majors14 },
        { label: '环化院', majors: this.majors15 },
        { label: '生科院', majors: this.majors16 },
        { label: '美术院', majors: this.majors17 },
        { label: '影视院', majors: this.majors18 },
        { label: '社科院', majors: this.majors19 },
        { label: '新闻院', majors: this.majors20 },
        { label: '土木系', majors: this.majors21 },
        { label: '音乐院', majors: this.majors22 },
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
        this.changePasswordForm = this.formBuilder.group({
            newPassword: ['', Validators.required],
            passwordAgain: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.isLoading = true;
        // fetch user info to display
        this.route.paramMap.subscribe(params => {
            this.currentPeople = params.get('username');
        });
        // judge whether people here is self
        this.isSelf = this.user !== undefined && this.user != null && this.currentPeople === this.user.username;
        console.log('user from header ' + this.user);
        this.personalService.getUserInfo(this.currentPeople).subscribe(
            (data) => {
                console.log(data);
                this.userInfo = new UserInfo(data.username, data.grade, this.getMajorFromCode(data.major), data.email, data.src);
                console.log(this.userInfo);
                if (data.email !== undefined && data.email !== null) {
                    this.isSelf = true;
                }
                this.updateWishList();
                this.updateReviews();
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
                this.router.navigateByUrl('/', { replaceUrl: true }).then((r) => {});
            },
        );
        // mock
        // this.userInfo = this.userInfoMock;
        // mock
        // this.reviews = this.reviewsMock;
        // this.totalRecordNumber = this.reviews.pageNumber;
        // this.updateReviews();

        // mock
        // this.wishList = this.wishListMock;
        // this.wishListFinished = this.wishListMock;
        // this.updateWishList();

        console.log('wishlist: ' + this.wishList);
        console.log('wishfinished: ' + this.wishListFinished);
        console.log('reviews: ' + this.reviews);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    submitUsername() {
        console.log('user name to be set: ', this.usernameForm.value.username);
        this.personalService.setUserName(this.usernameForm.value.username).subscribe(
            (data) => {
                this.isLoading = false;
                console.log(data);
                this.isSetUsername = true;
                // 更新username
                this.user.username = this.usernameForm.value.username;
                this.authService.setUser(this.user);
                this.snackBar.open('设置成功', undefined, { duration: 2000 });
            },
            (err: HttpErrorResponse) => {
                this.isLoading = false;
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

    pageChangeEvent(event?: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageNo = event.pageIndex;
        this.updateReviews();
        return event;
    }

    updateReviews() {
        this.isLoading = true;
        // console.log('from: ' + this.currentPeople + ' pageIndex: ' + this.pageEvent.pageIndex + ' pageSize: ' + this.pageSize);
        this.reviewService.getReviewFromOne(this.currentPeople, this.pageNo, this.pageSize).subscribe(
            (data) => {
                console.log(data);
                // this.reviews = data;
                // this.totalRecordNumber = data.length;
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
        for (i = 0; i < rate; i++) {
            stars.push('★');
        }
        if (rate - i >= 0.45) {
            stars.push('☆');
        }
        return stars.join(' ');
    }

    personalPage(name: string) {
        this.router.navigateByUrl('/people/' + name, { replaceUrl: false }).then((r) => {});
    }

    courseDetailPage(name: string) {
        this.router.navigateByUrl('/courses/' + name, { replaceUrl: false }).then((r) => {});
    }

    completeWishes() {
        if (!this.isSelf) { return; }
        if (this.wishListIds === []) { return; }
        this.wishListService.completeWish(this.wishListIds).subscribe(
            (data) => {
                this.snackBar.open(' 添加成功！', undefined, { duration: 2000 });
                this.updateWishList();
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

    removeWishes(ids) {
        if (!this.isSelf) { return; }
        if (ids === undefined || ids === []) { return; }
        this.wishListService.deleteWish(ids).subscribe(
            (data) => {
                this.snackBar.open(' 移除成功！', undefined, { duration: 2000 });
                this.updateWishList();
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

    updateWishList() {
        if (!this.isSelf) { return; }
        let toFetch = this.currentPeople;
        if (this.isSelf) {
            toFetch = null;
        }
        this.wishListService.getWishList(toFetch).subscribe(
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
        this.wishListService.getWishListFinished(toFetch).subscribe(
            (data) => {
                console.log(data);
                this.wishListFinished = data;
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
        // mock
        // this.wishList = this.wishListMock;
        // this.wishListFinished = this.wishListMock;
        console.log('unfinished: ' + this.wishList);
        console.log('finished: ' + this.wishListFinished);
    }

    onSelection(options: MatListOption[]) {
        if (!this.isSelf) { return; }
        this.wishListIds = [];
        for (const wishId of options.map(o => o.value)) {
            this.wishListIds.push(new WishRequest(wishId));
        }
        console.log(this.wishListIds);
    }

    onSelectionFinished(options: MatListOption[]) {
        if (!this.isSelf) { return; }
        this.wishListIdsFinished = [];
        for (const wishId of options.map(o => o.value)) {
            this.wishListIdsFinished.push(new WishRequest(wishId));
        }
        console.log(this.wishListIdsFinished);
    }

    getMajorFromCode(code: string) {
        for (const school of this.schools) {
            for (const major of school.majors) {
                // console.log(major.value + '  ' + code);
                if (code === major.value) {
                    return major.label;
                }
            }
        }
    }

    changeVoteStatus(review: ReviewFromOne) {
        // to-do login require
        this.reviewService.reverseVoteStatus(review.reviewId).subscribe(
            (data) => {
                console.log(data);
                if (review.voted) {
                    review.upVoterNum--;
                    this.snackBar.open('取消成功', undefined, {duration: 2000});
                } else {
                    review.upVoterNum++;
                    this.snackBar.open('赞同成功', undefined, {duration: 2000});
                }
                review.voted = !review.voted;
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
    }
    onSubmitNewPassword() {

    }
}
