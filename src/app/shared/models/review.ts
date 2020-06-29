import { User } from './user';

export class ReviewFromOne {
  reviewId?: string;
  courseId: string;
  courseName: string;
  trimester: string;
  createTime: string;
  teacherName: string;
  rate: number;
  upVoterNum: number;
  content: string;
  voted: boolean;
}

export class ReviewFromMulti extends ReviewFromOne {
  src: string;
  reviewerName: string;
}

// 具体看JPA格式调整
export class PaginationReviewFromOne {
  reviews: ReviewFromOne[];
  pageNumber: number;
}

export class PaginationReviewFromMulti {
  reviews: ReviewFromMulti[];
  pageNumber: number;
}

export class ReviewRequest {
  courseId: number;
  rate: number;
  teacherName: string;
  trimester: string;
  content: string;
}
