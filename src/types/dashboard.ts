import { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
