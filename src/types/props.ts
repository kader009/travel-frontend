import { ReactNode } from 'react';
import { IUser } from './user';
import { ITravelPlan } from './travelPlan';

export interface TravelPlanCardProps {
  plan: ITravelPlan;
  isOwner?: boolean;
  onEdit: (plan: ITravelPlan) => void;
  onDelete: (id: string) => void;
}

export interface EditProfileModalProps {
  user: IUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface EditTravelPlanModalProps {
  plan: ITravelPlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateTravelPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateReviewModalProps {
  planId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface DashboardWrapperProps {
  children: ReactNode;
}

export interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

// Travel Details Components
export interface TravelHeroProps {
  trip: ITravelPlan;
  durationDays: number;
}

export interface MissionIntelProps {
  trip: ITravelPlan;
  isPastPlan: boolean;
}

export interface RecruitmentSidebarProps {
  trip: ITravelPlan;
  planCreator: IUser | null;
  currentUser: IUser | null;
  isPastPlan: boolean;
  hasAlreadyRequested: boolean;
  handleOpenModal: () => void;
}

export interface ReviewSectionProps {
  trip: ITravelPlan;
  reviewRating: number;
  reviewComment: string;
  isReviewing: boolean;
  handleSubmitReview: () => void;
}

export interface JoinRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  trip: ITravelPlan;
  requestMessage: string;
  setRequestMessage: (msg: string) => void;
  handleSubmitRequest: () => void;
  isJoining: boolean;
}
