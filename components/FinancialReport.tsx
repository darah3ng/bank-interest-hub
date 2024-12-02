'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bank } from '@/types';
import { calculateTotalAmount } from '@/lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface FinancialReportProps {
  banks: Bank[];
}

const FinancialReport: React.FC<FinancialReportProps> = ({ banks }) => {
  const totalInvestment = banks.reduce(
    (sum, bank) => sum + bank.investmentAmount,
    0
  );
  const totalInterest = banks.reduce(
    (sum, bank) => sum + (calculateTotalAmount(bank) - bank.investmentAmount),
    0
  );
  const totalFinalAmount = banks.reduce(
    (sum, bank) => sum + calculateTotalAmount(bank),
    0
  );

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Annual Financial Report', 14, 22);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);

    const tableData = banks.map((bank) => {
      const finalAmount = calculateTotalAmount(bank);
      const interestEarned = finalAmount - bank.investmentAmount;
      const annualReturn = (
        (finalAmount / bank.investmentAmount - 1) *
        100
      ).toFixed(2);
      return [
        bank.name,
        `$${bank.investmentAmount.toFixed(2)}`,
        `$${interestEarned.toFixed(2)}`,
        `$${finalAmount.toFixed(2)}`,
        `${annualReturn}%`,
      ];
    });

    tableData.push([
      'Total',
      `$${totalInvestment.toFixed(2)}`,
      `$${totalInterest.toFixed(2)}`,
      `$${totalFinalAmount.toFixed(2)}`,
      `${((totalFinalAmount / totalInvestment - 1) * 100).toFixed(2)}%`,
    ]);

    autoTable(doc, {
      head: [
        [
          'Bank',
          'Initial Investment',
          'Interest Earned',
          'Final Amount',
          'Annual Return (%)',
        ],
      ],
      body: tableData,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] },
      footStyles: {
        fillColor: [211, 211, 211],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
    });

    doc.save('financial_report.pdf');
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Report Table</CardTitle>
        </div>
        <Button onClick={generatePDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Financial summary for the year</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Bank</TableHead>
              <TableHead>Initial Investment</TableHead>
              <TableHead>Interest Earned</TableHead>
              <TableHead>Final Amount</TableHead>
              <TableHead>Annual Return (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banks.map((bank) => {
              const finalAmount = calculateTotalAmount(bank);
              const interestEarned = finalAmount - bank.investmentAmount;
              const annualReturn = (
                (finalAmount / bank.investmentAmount - 1) *
                100
              ).toFixed(2);
              return (
                <TableRow key={bank.id}>
                  <TableCell>{bank.name}</TableCell>
                  <TableCell>${bank.investmentAmount.toFixed(2)}</TableCell>
                  <TableCell>${interestEarned.toFixed(2)}</TableCell>
                  <TableCell>${finalAmount.toFixed(2)}</TableCell>
                  <TableCell>{annualReturn}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableBody>
            <TableRow className="font-bold">
              <TableCell>Total</TableCell>
              <TableCell>${totalInvestment.toFixed(2)}</TableCell>
              <TableCell>${totalInterest.toFixed(2)}</TableCell>
              <TableCell>${totalFinalAmount.toFixed(2)}</TableCell>
              <TableCell>
                {((totalFinalAmount / totalInvestment - 1) * 100).toFixed(2)}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FinancialReport;
