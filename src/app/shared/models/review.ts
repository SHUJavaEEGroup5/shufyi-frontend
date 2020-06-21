export class ReviewFromOne {
    rateTime: string;
    teacher: string;
    score: number;
    useful: number;
    comment: string;
}
export class ReviewFromMulti extends ReviewFromOne{
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