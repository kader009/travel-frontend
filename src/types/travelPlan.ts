export type TTravelType = 'Solo' | 'Friends' | 'Family' | 'Couple' | 'Group' | 'Business';

export interface ITravelPlan {
  _id?: string;
  userId?: string;
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
  createdAt?: string;
  updatedAt?: string;
}
