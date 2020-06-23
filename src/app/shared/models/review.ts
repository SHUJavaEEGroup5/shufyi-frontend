import { User } from './user';

export class ReviewFromOne {
  publisher: User;
  reviewId?: string;
  courseId: string;
  trimester: string;
  createTime: string;
  teacherName: string;
  rate: number;
  upVoterNum: number;
  content: string;
  isVoted: boolean;
}

export class ReviewFromMulti extends ReviewFromOne {
  alt: string;
  src: string;
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
