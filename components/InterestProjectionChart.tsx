'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartData, Bank } from '@/types';

interface InterestProjectionChartProps {
  chartData: ChartData[];
  banks: Bank[];
}

const InterestProjectionChart: React.FC<InterestProjectionChartProps> = ({
  chartData,
  banks,
}) => {
  const { theme } = useTheme();
  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#a4de6c',
    '#d0ed57',
    '#83a6ed',
    '#8dd1e1',
    '#82ca9d',
    '#a4de6c',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>12-Month Interest Projection</CardTitle>
        <CardDescription>
          Showing projected growth based on current rates for each bank
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {banks.map((bank, index) => (
                <Line
                  key={bank.id}
                  type="monotone"
                  dataKey={bank.name}
                  stroke={colors[index % colors.length]}
                  name={`${bank.name} ($)`}
                />
              ))}
              <Line
                type="monotone"
                dataKey="totalAmount"
                stroke={`${theme === 'dark' ? '#929292' : '#1f1e1e'}`}
                strokeWidth={2}
                name="Total Amount ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestProjectionChart;
