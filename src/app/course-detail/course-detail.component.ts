import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { AddReviewDialogComponent, ConfirmWishDialogComponent } from '../shared/components';
import { WishListService } from '../shared/services';
import { WishRequest, ConfirmDialogData, WishAddRequest } from '../shared/models';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course = {
    courseNumber: '08306120',
    courseName: 'Java EE开发技术',
    courseNameEn: 'Java EE Development Technology',
    credits: 4,
    college: '计算机工程与科学学院',
    type: '专业选修课',
    meta: [
      {
        name: '课程目标',
        nameEn: 'Objectives',
        content: '本课程着重培养学生能够从事计算机科学与技术相关的研发等工作所具备的基础知识和核心技术，并能够针对大型复杂工程问题进行规划分析、系统建模、组织或参与实施。主要学习轻量级Java EE开发技术，实现面向Web的大型软件项目设计与开发。',
        contentEn: 'This course focuses on teaching the basic knowledge and core skills for undergraduates in computer science and technology. After the course, they can conduct planning analysis, system modeling, organization or participation in large-scale complex engineering problems. The course mainly teaches lightweight Java EE development technology, implementing Web-oriented large-scale software project design and development.',
      },
      {
        name: '课程内容',
        nameEn: 'Contents',
        content: '（1）Web项目软件开发的应用层次和开发生命周期；（2）Java Web项目开发基础技术JSP、JavaBean和Servlet；（3）Java EE开发中控制器框架Struts；（4）Java EE开发中数据持久化框架Hibernate；（5）Java EE开发中业务模型开发框架Spring；（6）整合SSH开发技术，开发一个轻量级Java EE项目能力；（7）设计和分析一个Web项目能力及其初步的项目管理。',
        contentEn: '(1) Web application level architecture and software development life cycle; (2) the fundamental professional knowledge for Java Web technologies, including JSP, JavaBean and Servlet development techniques; (3) Struts development technique for workflow controller; (4) Hibernate development technique for data persistence; (5) Spring development technique for business model; (6) SSH integrated technique for lightweight Java EE project development capacity; (7) design and analysis capabilities of a Web project and preliminary project management.',
      },
      {
        name: '教材与主要参考书',
        nameEn: 'Textbook And References',
        content: '教材：Java EE基础实用教程； 主要参考书：（1）轻量级Java EE企业应用实战；（2）《Java EE互联网轻量级框架整合开发》。',
        contentEn: null,
      },
      {
        name: '先修课程',
        nameEn: 'Prerequisites',
        content: 'Java程序设计(实践)',
        contentEn: 'Java Programming and Design (Practice)',
      },
      {
        name: '建议选课对象',
        nameEn: 'Target Students',
        content: '（1）适用专业：计算机科学与技术、通信工程、自动化等相关专业。（2）适用对象：本科生三年级、本科生二年级。',
        contentEn: '(1)Computer Science, Communication Engineering, Automation;(2)Junior or Sophomore undergraduates.',
      },
    ],
  };

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
  currentCourseId: string;

  constructor(
    public dialog: MatDialog,
    private wishListService: WishListService,
    private route: ActivatedRoute,
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

  openNewReviewDialog(): void {
    const dialogRef = this.dialog.open(AddReviewDialogComponent, {
      width: '720px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentCourseId = params.get('courseId');
    });
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
