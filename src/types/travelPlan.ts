import { IUser } from './user';

export type TTravelType = 'Solo' | 'Friends' | 'Family' | 'Couple' | 'Group' | 'Business';

export interface ITravelPlan {
  _id?: string;
  user?: IUser; // Backed confirmed the field is 'user'. Usually populated.
  userId?: string; // Sometimes just the ID string
  destination: string;
  startDate: string;
  endDate: string;
  budget: {
    min: number;
    max: number;
  };
  travelType: TTravelType;
  description: string;
  itinerary: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  status?: 'ongoing' | 'completed' | 'deleted' | string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
