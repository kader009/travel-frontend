import {
  LayoutDashboard,
  Map,
  Users,
  Star,
  CreditCard,
  UserCircle,
  Handshake,
} from 'lucide-react';
import { NavItem } from '../types/dashboard';

export const userLinks: NavItem[] = [
  { href: '/dashboard/user', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/user/profile', label: 'My Profile', icon: UserCircle },
  { href: '/dashboard/user/travel-plan', label: 'My Travel Plans', icon: Map },
  { href: '/dashboard/user/reviews', label: 'My Reviews', icon: Star },
  { href: '/dashboard/user/join-request', label: 'Expedition Requests', icon: Handshake },
  { href: '/dashboard/user/subscription', label: 'Subscription', icon: CreditCard },
];

export const adminLinks: NavItem[] = [
  { href: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
  { href: '/dashboard/admin/travel-plan', label: 'Manage Travel Plans', icon: Map },
  { href: '/dashboard/admin/join-request', label: 'Join Requests', icon: Handshake },
  { href: '/dashboard/admin/reviews', label: 'Manage Reviews', icon: Star },
  { href: '/dashboard/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
];
