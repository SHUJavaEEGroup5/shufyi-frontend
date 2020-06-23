import {WishAddRequest} from './wish-add-request';
import {RecommendResponse} from './recommend-response';

export class ConfirmDialogData {
    courseName: string;
    courseNumber: string;
    credits: number;
    type: string;
    college: string;
    courseSelected: WishAddRequest[];
    courses: RecommendResponse[];
    constructor(courseName: string, courseNumber: string, credits: number, type: string, college: string,
                courseSelected: WishAddRequest[], courses: RecommendResponse[]) {
        this.courseName = courseName;
        this.courseNumber = courseNumber;
        this.college = college;
        this.credits = credits;
        this.type = type;
        this.courseSelected = courseSelected;
        this.courses = courses;
    }
}
