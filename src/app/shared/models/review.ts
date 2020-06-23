export class ReviewFromOne {
  courseId: string;
  trimester: string;
  createTime: string;
  teacherName: string;
  rate: number;
  upVoterNum: number;
  content: string;
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
