import { IUser } from './user';

export interface ITravelPlanRef {
  _id?: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
}

export interface IReview {
  _id?: string;
  reviewer: string | IUser;
  reviewee: string | IUser; // The user being reviewed
  rating: number;
  comment: string;
  travelPlan: string | ITravelPlanRef; // reference to a travel plan
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IReviewResponse {
  reviews: IReview[];
  averageRating: number;
  totalReviews: number;
}

export interface IUserReviewStats {
  user: IUser;
  totalReviews: number;
  averageRating: number;
  ratingBreakdown: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
}

export interface ITestimonial {
  id?: string;
  text: string;
  author: string;
  role: string;
  image: string;
}
