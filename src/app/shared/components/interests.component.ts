import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalService } from '../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


export interface Major {
  value: string;
  label: string;
}

export interface School {
  label: string;
  majors: Major[];
}

export interface Interest {
  value: number;
  label: string;
}

export interface PostInfo {
  grade: string;
  major: string;
  interests: number[];
}


@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
})
export class InterestsComponent implements OnInit {
  majorControl = new FormControl();
  startDate = new Date(new Date().getFullYear() - 2, 9, 1);
  maxDate = new Date();
  InfoForm: FormGroup;
  isCompleted = false;
  @ViewChild('grade') gradeRef: ElementRef<HTMLInputElement>;
  @ViewChild('major') majorRef: ElementRef<HTMLInputElement>;
  interests: Interest[] = [
    { value: 0, label: '负担' },
    { value: 0, label: '友善' },
    { value: 0, label: '困难度' },
    { value: 0, label: '实践' },
    { value: 0, label: '专业' },
    { value: 0, label: '系统性' },
    { value: 0, label: '有用' },
  ];
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
  infoToPost: PostInfo = {
    grade: '', major: '', interests: [],
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private personalService: PersonalService,
  ) {
    this.InfoForm = this.formBuilder.group({
      grade: ['', Validators.required],
      major: ['', Validators.required],
    });
  }

  formatLabel(value: number | null) {
    if (!value) {
      return '无感';
    }
    if (value >= 100) {
      return '重要';
    } else if (value >= 75) {
      return '重视';
    } else if (value >= 50) {
      return '考虑';
    } else if (value >= 25) {
      return '一般';
    } else {
      return '无感';
    }
  }

  onSubmit() {
    this.infoToPost.grade = this.InfoForm.value.grade.getFullYear();
    this.infoToPost.major = this.InfoForm.value.major;
    this.infoToPost.interests = [];
    for (const item of this.interests) {
      this.infoToPost.interests.push(item.value);
    }
    console.log(this.infoToPost);
    this.personalService.setInterests(this.infoToPost)
      .subscribe(
        (data) => {
          console.log(data);
          this.snackBar.open('保存成功！', undefined, { duration: 2000 });
          this.isCompleted = true;
        },
        (err: HttpErrorResponse) => {
          this.InfoForm.enable();
          this.gradeRef.nativeElement.select();
          this.majorRef.nativeElement.focus();
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

  ngOnInit() {
    this.personalService.getInterests()
      .subscribe(
        (data) => {
          this.InfoForm.value.grade = new Date(parseInt(data.grade, 10), new Date().getMonth());
          this.InfoForm.value.major = data.major;
          for (let i = 0; i < data.interests.length; i++) {
            this.InfoForm.value.interests[i].value = data.interests[i];
          }
        },
        (err: HttpErrorResponse) => {
          this.InfoForm.enable();
          this.gradeRef.nativeElement.select();
          this.majorRef.nativeElement.focus();
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
}

