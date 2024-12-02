'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Bank } from '@/types';
import {
  calculateMonthlyInterest,
  calculateTotalRate,
  calculateTotalAmount,
} from '@/lib/utils';

interface BankListProps {
  banks: Bank[];
  setBanks: React.Dispatch<React.SetStateAction<Bank[]>>;
}

const BankList: React.FC<BankListProps> = ({ banks, setBanks }) => {
  const updateBankCondition = (id: number, conditionMet: boolean) => {
    setBanks(
      banks.map((bank) => {
        if (bank.id === id) {
          const totalRate = calculateTotalRate(
            bank.baseRate,
            bank.bonusRate,
            conditionMet
          );
          const monthlyInterest = calculateMonthlyInterest(
            bank.investmentAmount,
            totalRate
          );
          return { ...bank, conditionMet, totalRate, monthlyInterest };
        }
        return bank;
      })
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {banks.map((bank) => (
        <Card key={bank.id}>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{bank.name}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setBanks(banks.filter((b) => b.id !== bank.id))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>Base Rate: {bank.baseRate}%</div>
                {bank.bonusRate > 0 && (
                  <div className="text-green-500">Bonus: {bank.bonusRate}%</div>
                )}
              </div>
              <div className="text-xl font-bold">
                Total Rate: {bank.totalRate}%
              </div>
              <div className="text-sm text-muted-foreground">
                Investment Amount: ${bank.investmentAmount.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                Monthly Interest: ${bank.monthlyInterest.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                Monthly Deposit: ${bank.monthlyDeposit.toFixed(2)}
              </div>
              <div className="text-sm font-semibold">
                Total Amount (after 12 months): $
                {calculateTotalAmount(bank).toFixed(2)}
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium">
                  Condition: Deposit ${bank.monthlyDeposit.toFixed(2)} monthly
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Checkbox
                    id={`condition-${bank.id}`}
                    checked={bank.conditionMet}
                    onCheckedChange={(checked) =>
                      updateBankCondition(bank.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`condition-${bank.id}`}>Condition Met</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BankList;
