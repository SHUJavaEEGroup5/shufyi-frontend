import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course, Page } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(
    private http: HttpClient,
  ) {}

  getCourses(page: number = 0) {
    return this.http.get<Page<Course>>('/api/courses', {
      params: new HttpParams().set('page', page.toString()),
    });
  }

  createCourse(course: Course) {
    return this.http.post<Course>('/api/course', course);
  }

  deleteCourse(id: number) {
    return this.http.delete<void>(`/api/course/${id}`);
  }
}
