"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#a855f7", // Violet
  "#14b8a6", // Teal
];

const DashBoardOverview = ({ accounts, transactions }) => {
  const [selectAccountId, setSelectAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectAccountId
  );

  const currentDate = new Date();

  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += transaction.amount;
    return acc;
  }, {});

  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 my-6">
      {/* Recent Transactions Card */}
      <Card className="shadow-md border-indigo-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            Recent Transactions
          </CardTitle>
          <Select value={selectAccountId} onValueChange={setSelectAccountId}>
            <SelectTrigger className="w-[180px] bg-indigo-50 hover:bg-indigo-100">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No recent Transactions
            </p>
          ) : (
            recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium">
                    {transaction.description || "Untitled Transaction"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(transaction.date), "PP")}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex items-center font-semibold text-sm",
                    transaction.type === "EXPENSE"
                      ? "text-red-500"
                      : "text-green-500"
                  )}
                >
                  {transaction.type === "EXPENSE" ? (
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                  )}
                  ₹{transaction.amount.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Pie Chart Card */}
      <Card className="shadow-md border-violet-100">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Monthly Expense Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          {pieChartData.length === 0 ? (
            <p className="text-center text-muted-foreground mt-10">
              No Expenses This Month
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ₹${value.toFixed(2)}`}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoardOverview;
