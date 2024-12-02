'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bank } from '@/types';
import { calculateTotalAmount } from '@/lib/utils';

interface WhatIfScenarioProps {
  banks: Bank[];
}

const WhatIfScenario: React.FC<WhatIfScenarioProps> = ({ banks }) => {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [years, setYears] = useState(5);
  const [additionalMonthlyDeposit, setAdditionalMonthlyDeposit] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const calculateScenario = () => {
    if (selectedBank) {
      let totalAmount = selectedBank.investmentAmount;
      const monthlyInterest = selectedBank.monthlyInterest;
      const totalMonths = years * 12;

      for (let i = 0; i < totalMonths; i++) {
        totalAmount += monthlyInterest;
        if (selectedBank.conditionMet) {
          totalAmount += selectedBank.monthlyDeposit;
        }
        totalAmount += additionalMonthlyDeposit;
      }

      setResult(totalAmount);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>What-If Scenario Analyzer</CardTitle>
        <CardDescription>Explore potential investment outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="bank-select">Select Bank</Label>
            <Select
              onValueChange={(value) =>
                setSelectedBank(
                  banks.find((b) => b.id.toString() === value) || null
                )
              }
            >
              <SelectTrigger id="bank-select">
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id.toString()}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="years">Investment Period (Years)</Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              min={1}
            />
          </div>
          <div>
            <Label htmlFor="additional-deposit">
              Additional Monthly Deposit
            </Label>
            <Input
              id="additional-deposit"
              type="number"
              value={additionalMonthlyDeposit || ''}
              onChange={(e) =>
                setAdditionalMonthlyDeposit(Number(e.target.value))
              }
              min={0}
              placeholder="Monthly Deposit"
            />
          </div>
          <Button onClick={calculateScenario} disabled={!selectedBank}>
            Calculate Scenario
          </Button>
          {result !== null && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                Projected Total After {years} Years
              </h3>
              <p className="text-2xl font-bold">${result.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                Compared to $
                {selectedBank
                  ? calculateTotalAmount(selectedBank).toFixed(2)
                  : '0'}{' '}
                after 1 year
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatIfScenario;
