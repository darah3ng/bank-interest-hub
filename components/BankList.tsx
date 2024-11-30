'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bank } from '@/types';
import { calculateMonthlyInterest } from '@/lib/utils';

interface BankListProps {
  banks: Bank[];
  setBanks: React.Dispatch<React.SetStateAction<Bank[]>>;
}

const BankList: React.FC<BankListProps> = ({ banks, setBanks }) => {
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
                Monthly Interest: $
                {calculateMonthlyInterest(
                  bank.investmentAmount,
                  bank.totalRate
                ).toFixed(2)}
              </div>
              <div className="text-sm font-semibold">
                Total Amount: $
                {(
                  bank.investmentAmount +
                  calculateMonthlyInterest(
                    bank.investmentAmount,
                    bank.totalRate
                  ) *
                    12
                ).toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BankList;
