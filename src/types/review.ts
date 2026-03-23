import { IUser } from './user';

export interface IReview {
  _id?: string;
  reviewer: string | IUser;
  reviewee: string | IUser; // The user being reviewed
  rating: number;
  comment: string;
  travelPlan: string; // reference to a travel plan
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IReviewResponse {
  reviews: IReview[];
  averageRating: number;
  totalReviews: number;
}
