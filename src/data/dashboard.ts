import {
  LayoutDashboard,
  Map,
  Users,
  Star,
  CreditCard,
  UserCircle,
  Settings,
  BarChart3,
} from 'lucide-react';
import { NavItem } from '../types/dashboard';

export const userLinks: NavItem[] = [
  { href: '/dashboard/user', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/user/travel-plans', label: 'My Travel Plans', icon: Map },
  { href: '/dashboard/user/matches', label: 'Matched Travelers', icon: Users },
  { href: '/dashboard/user/reviews', label: 'My Reviews', icon: Star },
  { href: '/dashboard/user/subscription', label: 'Subscription', icon: CreditCard },
  { href: '/dashboard/user/profile', label: 'My Profile', icon: UserCircle },
  { href: '/dashboard/user/settings', label: 'Settings', icon: Settings },
];

export const adminLinks: NavItem[] = [
  { href: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
  { href: '/dashboard/admin/travel-plans', label: 'Manage Travel Plans', icon: Map },
  { href: '/dashboard/admin/reviews', label: 'Manage Reviews', icon: Star },
  { href: '/dashboard/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
];
