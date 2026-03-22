import { IUser } from './user';
import { ITravelPlan } from './travelPlan';

export type TJoinRequestStatus = 'pending' | 'approved' | 'rejected';

export interface IJoinRequest {
  _id: string;
  user?: IUser;
  travelPlan: string | ITravelPlan;
  message: string;
  status: TJoinRequestStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateJoinRequest {
  travelPlan: string;
  message: string;
}
