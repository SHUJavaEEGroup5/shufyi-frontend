export class UserInfo {
    username: string;
    grade: string;
    major: string;
    email: string | undefined;
    src: string;
    constructor(username: string, grade: string, major: string, email: string, src: string) {
        this.username = username;
        this.grade = grade;
        this.email = email;
        this.src = src;
        this.major = major;
    }
}
