export class ConfirmDialogData {
    courseName: string;
    courseNumber: string;
    credits: number;
    type: string;
    college: string;
    constructor(courseName: string, courseNumber: string, credits: number, type: string, college: string) {
        this.courseName = courseName;
        this.courseNumber = courseNumber;
        this.college = college;
        this.credits = credits;
        this.type = type;
    }
}