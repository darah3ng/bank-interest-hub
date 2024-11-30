'use client';

import React, { useState, useEffect } from 'react';
import AddBankForm from './AddBankForm';
import BankList from './BankList';
import InterestProjectionChart from './InterestProjectionChart';
import { Bank, ChartData } from '@/types';
import { calculateMonthlyInterest } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const InterestTracker = () => {
  const [mounted, setMounted] = useState(false);
  const [banks, setBanks] = useState<Array<Bank>>([]);
  const [chartData, setChartData] = useState<Array<ChartData>>([]);

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
        const monthlyInterest = calculateMonthlyInterest(
          bank.investmentAmount,
          bank.totalRate
        );
        const bankTotal = bank.investmentAmount + monthlyInterest * (index + 1);
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Bank Interest Hub</h1>
          <ThemeToggle />
        </div>

        <AddBankForm banks={banks} setBanks={setBanks} />

        {chartData.length > 0 && (
          <InterestProjectionChart chartData={chartData} banks={banks} />
        )}

        <BankList banks={banks} setBanks={setBanks} />
      </div>
    </div>
  );
};

export default InterestTracker;
