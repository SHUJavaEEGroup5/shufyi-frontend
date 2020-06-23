export class RecommendResponse {
    courseId: number;
    courseName: string;
    constructor(courseId: number, courseName: string) {
        this.courseId = courseId;
        this.courseName = courseName;
    }
}
