export interface Bank {
  id: number;
  name: string;
  baseRate: number;
  bonusRate: number;
  totalRate: number;
  monthlyInterest: number;
  investmentAmount: number;
  condition: string;
  conditionMet: boolean;
  monthlyDeposit: number;
}

export interface ChartData {
  month: string;
  totalAmount: number;
  [key: string]: number | string;
}
