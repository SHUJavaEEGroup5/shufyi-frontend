import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course, Page, ReviewFromMulti } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private http: HttpClient,
  ) {}

  getCourses(page: number = 0) {
    return this.http.get<Page<Course>>('/api/courses', {
      params: new HttpParams().set('page', page.toString()),
    });
  }

  getCourse(id: number) {
    return this.http.get<Course>(`/api/course/${id}`);
  }

  getCourseReviews(id: number) {
    return this.http.get<ReviewFromMulti[]>(`/api/course/${id}/reviews`);
  }

  createCourse(course: Course) {
    return this.http.post<Course>('/api/course', course);
  }

  deleteCourse(id: number) {
    return this.http.delete<void>(`/api/course/${id}`);
  }
}
