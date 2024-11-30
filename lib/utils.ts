import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateMonthlyInterest = (amount: number, rate: number) => {
  return (amount * (rate / 100)) / 12;
};
