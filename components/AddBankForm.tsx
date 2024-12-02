'use client';

import React, { useState } from 'react';
import { PlusCircle, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bank } from '@/types';
import {
  calculateMonthlyInterest,
  calculateTotalRate,
  generateRandomBank,
} from '@/lib/utils';
import { Checkbox } from './ui/checkbox';

interface AddBankFormProps {
  banks: Bank[];
  setBanks: React.Dispatch<React.SetStateAction<Bank[]>>;
}

const AddBankForm: React.FC<AddBankFormProps> = ({ banks, setBanks }) => {
  const [newBank, setNewBank] = useState<Omit<Bank, 'id'>>({
    name: '',
    baseRate: 0,
    bonusRate: 0,
    investmentAmount: 0,
    condition: '',
    conditionMet: false,
    monthlyDeposit: 0,
    totalRate: 0,
    monthlyInterest: 0,
  });

  const addBank = (bank: Omit<Bank, 'id'>) => {
    if (
      bank.name &&
      (bank.baseRate || bank.bonusRate) &&
      bank.investmentAmount
    ) {
      const totalRate = calculateTotalRate(
        Number(bank.baseRate),
        Number(bank.bonusRate),
        bank.conditionMet
      );
      const monthlyInterest = calculateMonthlyInterest(
        Number(bank.investmentAmount),
        totalRate
      );

      setBanks([
        ...banks,
        {
          id: Date.now(),
          ...bank,
          baseRate: Number(bank.baseRate),
          bonusRate: Number(bank.bonusRate),
          investmentAmount: Number(bank.investmentAmount),
          monthlyDeposit: Number(bank.monthlyDeposit),
          totalRate,
          monthlyInterest,
        },
      ]);

      setNewBank({
        name: '',
        baseRate: 0,
        bonusRate: 0,
        investmentAmount: 0,
        condition: '',
        conditionMet: false,
        monthlyDeposit: 0,
        totalRate: 0,
        monthlyInterest: 0,
      });
    }
  };

  const addRandomBank = () => {
    addBank(generateRandomBank());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Bank</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="investmentAmount">Investment Amount ($)</Label>
              <Input
                id="investmentAmount"
                type="number"
                value={newBank.investmentAmount || ''}
                onChange={(e) =>
                  setNewBank({
                    ...newBank,
                    investmentAmount: Number(e.target.value),
                  })
                }
                placeholder="Investment Amount"
              />
            </div>
            <div>
              <Label htmlFor="baseRate">Base Rate (%)</Label>
              <Input
                id="baseRate"
                type="number"
                value={newBank.baseRate || ''}
                onChange={(e) =>
                  setNewBank({ ...newBank, baseRate: Number(e.target.value) })
                }
                placeholder="Base Interest Rate"
              />
            </div>
            <div>
              <Label htmlFor="bonusRate">Bonus Rate (%)</Label>
              <Input
                id="bonusRate"
                type="number"
                step="0.01"
                value={newBank.bonusRate || ''}
                onChange={(e) =>
                  setNewBank({ ...newBank, bonusRate: Number(e.target.value) })
                }
                placeholder="Bonus Rate"
              />
            </div>
            <div>
              <Label htmlFor="monthlyDeposit">Monthly Deposit ($)</Label>
              <Input
                id="monthlyDeposit"
                type="number"
                step="0.01"
                value={newBank.monthlyDeposit || ''}
                onChange={(e) =>
                  setNewBank({
                    ...newBank,
                    monthlyDeposit: Number(e.target.value),
                  })
                }
                placeholder="Monthly Deposit"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="conditionMet"
                checked={newBank.conditionMet}
                onCheckedChange={(checked) =>
                  setNewBank({ ...newBank, conditionMet: checked as boolean })
                }
              />
              <Label htmlFor="conditionMet">
                Condition Met (Monthly Deposit)
              </Label>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => addBank(newBank)} className="flex-1">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Bank
            </Button>
            <Button onClick={addRandomBank} variant="outline">
              <Shuffle className="mr-2 h-4 w-4" /> Random Bank
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddBankForm;
