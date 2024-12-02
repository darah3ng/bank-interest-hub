'use client';

import React, { useState, useEffect } from 'react';
import AddBankForm from './AddBankForm';
import BankList from './BankList';
import InterestProjectionChart from './InterestProjectionChart';
import FinancialReport from './FinancialReport';
import WhatIfScenario from './WhatIfScenario';

import { Bank, ChartData } from '@/types';
import { FileText, Wand2 } from 'lucide-react';

import { ThemeToggle } from './ThemeToggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const InterestTracker = () => {
  const [mounted, setMounted] = useState(false);
  const [banks, setBanks] = useState<Array<Bank>>([]);
  const [chartData, setChartData] = useState<Array<ChartData>>([]);
  const [showWhatIf, setShowWhatIf] = useState(false);

  const generateChartData = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const data = months.map((month, index) => {
      const monthData: ChartData = { month, totalAmount: 0 };
      banks.forEach((bank) => {
        let bankTotal = bank.investmentAmount;
        for (let i = 0; i <= index; i++) {
          bankTotal += bank.monthlyInterest;
          if (bank.conditionMet) {
            bankTotal += bank.monthlyDeposit;
          }
        }
        monthData[bank.name] = parseFloat(bankTotal.toFixed(2));
        monthData.totalAmount += bankTotal;
      });
      monthData.totalAmount = parseFloat(monthData.totalAmount.toFixed(2));
      return monthData;
    });
    setChartData(data);
  };

  useEffect(() => {
    generateChartData();
  }, [banks]);

  // Set mounted to true once component is ready on client side
  // This ensures theme and other client-side features work correctly
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent any rendering until client-side hydration is complete
  // This avoids theme flickering and hydration mismatches
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Bank Interest Hub</h1>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Financial Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Financial Report</DialogTitle>
                  <DialogDescription>
                    Annual summary of your investments and returns
                  </DialogDescription>
                </DialogHeader>
                <FinancialReport banks={banks} />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setShowWhatIf(!showWhatIf)}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  What-If Scenario
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <div className="py-6">
                  <WhatIfScenario banks={banks} />
                </div>
              </DialogContent>
            </Dialog>

            <ThemeToggle />
          </div>
        </div>

        <AddBankForm banks={banks} setBanks={setBanks} />

        {chartData.length > 0 && (
          <InterestProjectionChart chartData={chartData} banks={banks} />
        )}

        {/* {showWhatIf && <WhatIfScenario banks={banks} />} */}

        <BankList banks={banks} setBanks={setBanks} />
      </div>
    </div>
  );
};

export default InterestTracker;
