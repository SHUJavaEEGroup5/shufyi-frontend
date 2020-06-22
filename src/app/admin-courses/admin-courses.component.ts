import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CoursesService } from '../shared/services';
import { MatPaginator } from '@angular/material/paginator';
import { Course } from '../shared/models';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss'],
})
export class AdminCoursesComponent implements AfterViewInit {
  page = 0;
  coursesLength = 0;
  coursesData: Course[] = [];
  coursesDisplayedColumns = ['id', 'courseNumber', 'courseName'];

  @ViewChild('coursePaginator', { static: true }) coursePaginator: MatPaginator;

  constructor(
    private coursesService: CoursesService,
  ) {}

  ngAfterViewInit() {
    this.coursePaginator.page.pipe(
      startWith({}),
      switchMap(() => this.coursesService.getCourses(this.page)),
      map((data) => {
        this.coursesLength = data.page.totalElements;
        return data._embedded.courses;
      }),
    ).subscribe((data) => {
      this.coursesData = data;
      console.log(data);
    });
  }
}
