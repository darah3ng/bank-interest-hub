'use client';

import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bank } from '@/types';
import { calculateMonthlyInterest } from '@/lib/utils';

interface AddBankFormProps {
  banks: Bank[];
  setBanks: React.Dispatch<React.SetStateAction<Bank[]>>;
}

const AddBankForm: React.FC<AddBankFormProps> = ({ banks, setBanks }) => {
  const [newBank, setNewBank] = useState({
    name: '',
    baseRate: '',
    bonusRate: '',
    investmentAmount: '',
  });

  const addBank = () => {
    if (
      newBank.name &&
      (newBank.baseRate || newBank.bonusRate) &&
      newBank.investmentAmount
    ) {
      const totalRate =
        Number(newBank.baseRate) + Number(newBank.bonusRate || 0);
      const investmentAmount = Number(newBank.investmentAmount);
      const monthlyInterest = calculateMonthlyInterest(
        investmentAmount,
        totalRate
      );

      setBanks([
        ...banks,
        {
          id: Date.now(),
          ...newBank,
          baseRate: Number(newBank.baseRate),
          bonusRate: Number(newBank.bonusRate || 0),
          totalRate,
          monthlyInterest,
          investmentAmount,
        },
      ]);
      setNewBank({
        name: '',
        baseRate: '0.0',
        bonusRate: '0.0',
        investmentAmount: '',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Bank</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={newBank.name}
                onChange={(e) =>
                  setNewBank({ ...newBank, name: e.target.value })
                }
                placeholder="Bank Name"
              />
            </div>
            <div>
              <Label htmlFor="baseRate">Base Rate (%)</Label>
              <Input
                id="baseRate"
                type="number"
                step="0.01"
                value={newBank.baseRate}
                onChange={(e) =>
                  setNewBank({ ...newBank, baseRate: e.target.value })
                }
                placeholder="0.0"
              />
            </div>
            <div>
              <Label htmlFor="bonusRate">Bonus Rate (%)</Label>
              <Input
                id="bonusRate"
                type="number"
                step="0.01"
                value={newBank.bonusRate}
                onChange={(e) =>
                  setNewBank({ ...newBank, bonusRate: e.target.value })
                }
                placeholder="0.0"
              />
            </div>
            <div>
              <Label htmlFor="investmentAmount">Investment Amount ($)</Label>
              <Input
                id="investmentAmount"
                type="number"
                step="0.01"
                value={newBank.investmentAmount}
                onChange={(e) =>
                  setNewBank({ ...newBank, investmentAmount: e.target.value })
                }
                placeholder="Investment Amount"
              />
            </div>
          </div>
          <Button onClick={addBank} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Bank
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddBankForm;
