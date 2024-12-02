import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Bank } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateMonthlyInterest = (amount: number, rate: number) => {
  return (amount * (rate / 100)) / 12;
};

export const calculateTotalRate = (
  baseRate: number,
  bonusRate: number,
  conditionMet: boolean
) => {
  return baseRate + (conditionMet ? bonusRate : 0);
};

export const calculateTotalAmount = (bank: Bank) => {
  let total = bank.investmentAmount;
  for (let i = 0; i < 12; i++) {
    total += bank.monthlyInterest;
    if (bank.conditionMet) {
      total += bank.monthlyDeposit;
    }
  }
  return total;
};

export const generateRandomBank = (): Omit<Bank, 'id'> => {
  const baseRate = Number((Math.random() * 3 + 1).toFixed(2));
  const bonusRate = Number((Math.random() * 2).toFixed(2));
  const investmentAmount = Number((Math.random() * 10000 + 1000).toFixed(2));
  const monthlyDeposit = Number((Math.random() * 500 + 100).toFixed(2));
  const conditionMet = Math.random() > 0.5;

  return {
    name: `Bank ${Math.floor(Math.random() * 1000)}`,
    baseRate,
    bonusRate,
    totalRate: calculateTotalRate(baseRate, bonusRate, conditionMet),
    monthlyInterest: calculateMonthlyInterest(
      investmentAmount,
      baseRate + (conditionMet ? bonusRate : 0)
    ),
    investmentAmount,
    condition: `Deposit $${monthlyDeposit.toFixed(2)} monthly`,
    conditionMet,
    monthlyDeposit,
  };
};
