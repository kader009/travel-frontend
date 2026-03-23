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
