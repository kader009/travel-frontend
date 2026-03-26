export interface IPaymentInitRequest {
  planType: 'monthly' | 'yearly';
  amount?: number;
  successUrl?: string;
  failUrl?: string;
  cancelUrl?: string;
}

export type IPaymentInitResponse = string;

export interface IPaymentHistory {
  _id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  planType: 'monthly' | 'yearly';
  createdAt: string;
}

export interface IPlanBreakdown {
  _id: 'monthly' | 'yearly';
  count: number;
  totalEarned: number;
}

export interface IRecentPayment {
  _id: string;
  transactionId: string;
  user: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  planType: 'monthly' | 'yearly';
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  createdAt: string;
}

export interface IPaymentAnalytics {
  totalEarnings: number;
  planBreakdown: IPlanBreakdown[];
  recentPayments: IRecentPayment[];
}
