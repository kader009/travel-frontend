export interface IPaymentInitRequest {
  planType: 'monthly' | 'yearly';
  amount?: number;
  successUrl?: string;
  failUrl?: string;
  cancelUrl?: string;
}

export interface IPaymentInitResponse {
  GatewayPageURL: string;
  tranId: string;
}

export interface IPaymentHistory {
  _id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  planType: 'monthly' | 'yearly';
  createdAt: string;
}

export interface IPaymentAnalytics {
  totalEarnings: number;
  planBreakdown: {
    monthly: number;
    yearly: number;
  };
  monthlyGrowth: number;
}
