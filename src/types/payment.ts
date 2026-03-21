export interface IPaymentInitRequest {
  plan: 'basic' | 'premium' | 'enterprise';
  amount?: number;
}

export interface IPaymentInitResponse {
  paymentUrl: string;
}

export interface IPaymentHistory {
  _id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'VALID' | 'FAILED' | 'CANCELLED';
  plan: string;
  createdAt: string;
}

export interface IPaymentAnalytics {
  totalEarnings: number;
  planBreakdown: {
    basic: number;
    premium: number;
    enterprise: number;
  };
  monthlyGrowth: number;
}
