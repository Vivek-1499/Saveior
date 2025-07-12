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
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATE_RANGES = {
  week: { label: "Last 7 Days", days: 7 },
  month: { label: "Last Month", days: 30 },
  "3month": { label: "Last 3 Months", days: 90 },
  "6month": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

const AccountChart = ({ transactions }) => {
  const [dateRange, setDateRange] = useState("month");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();

    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");

      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }

      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }

      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  const currentLabel = DATE_RANGES[dateRange]?.label || "this range";

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-zinc-800 dark:to-zinc-900 shadow-xl rounded-2xl border-none">
      <CardHeader className="flex items-center justify-between pb-6">
        <CardTitle className="font-semibold text-xl text-indigo-900 dark:text-indigo-200">
          Transaction Overview
        </CardTitle>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[140px] rounded-md shadow bg-white dark:bg-zinc-800 border border-indigo-200 dark:border-zinc-600">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-around text-sm md:text-base">
          <div className="text-center space-y-1">
            <p className="text-muted-foreground">Total Income</p>
            <p className="text-lg font-bold text-green-500">
              ₹{totals.income.toFixed(2)}
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-muted-foreground">Total Expense</p>
            <p className="text-lg font-bold text-red-500">
              ₹{totals.expense.toFixed(2)}
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-muted-foreground">Net</p>
            <p
              className={`text-lg font-bold ${
                totals.income - totals.expense >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}>
              ₹{(totals.income - totals.expense).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="h-[300px] rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-inner">
          {filteredData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm md:text-base italic">
              No transactions in {currentLabel.toLowerCase()}.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 6, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹ ${value}`}
                />
                <Tooltip formatter={(value) => [`₹${value}`, undefined]} />
                <Legend />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountChart;
