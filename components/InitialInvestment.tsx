'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InitialInvestmentProps {
  initialAmount: number;
  setInitialAmount: React.Dispatch<React.SetStateAction<number>>;
  banksCount: number;
}

const InitialInvestment: React.FC<InitialInvestmentProps> = ({
  initialAmount,
  setInitialAmount,
  banksCount,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Initial Investment</CardTitle>
        <CardDescription>
          Enter your total investment amount to distribute across banks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              placeholder="Enter initial amount"
            />
          </div>
          {initialAmount > 0 && (
            <div className="flex-1">
              <Label>Per Bank Amount</Label>
              <div className="p-2 bg-secondary rounded-md mt-2">
                ${(initialAmount / (banksCount || 1)).toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InitialInvestment;
