export interface User {
  id: string;
  email: string;
  name?: string;
  plan?: 'free' | 'pro' | 'business';
  customerKey?: string;
  billingKey?: string;
  nextBillingDate?: Date;
}
