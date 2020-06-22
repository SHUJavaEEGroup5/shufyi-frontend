export class Course {
  id: number;
  courseNumber: string;
  courseName: string;
  courseNameEn: string | null;
  credits: number;
  type: string;
  objectives: string | null;
  objectivesEn: string | null;
  contents: string | null;
  contentsEn: string | null;
  college: string;
  visible: boolean;
}
