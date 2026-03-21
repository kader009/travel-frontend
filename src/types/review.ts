import { IUser } from './user';

export interface IReview {
  _id?: string;
  reviewerId: string | IUser;
  userId: string | IUser; // The user being reviewed
  rating: number;
  comment: string;
  tripId?: string; // Optional: reference to a travel plan
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IReviewResponse {
  reviews: IReview[];
  averageRating: number;
  totalReviews: number;
}
