"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useFetch from "@/hook/usefetch";
import { Check, Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateBudget } from "@/actions/budget";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const BudgetProgress = ({ initialBudget, currentExpenses, accountId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const percentUsed = initialBudget?.amount
    ? Math.min((currentExpenses / initialBudget.amount) * 100, 100)
    : 0;

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudgetData,
    error,
  } = useFetch(updateBudget);

  const handleBudgetUpdate = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    await updateBudgetFn(amount);
  };

  useEffect(() => {
    if (updatedBudgetData?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudgetData]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  return (
    <Card className="mt-4 p-3 bg-gradient-to-br from-indigo-100 to-violet-200 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl shadow-md transition-all duration-300 border border-transparent hover:shadow-lg">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between pb-2 space-y-2 md:space-y-0">
        <Link href={`/accounts/${accountId}`}>
          <CardTitle className="text-xl font-semibold text-indigo-900 dark:text-indigo-200">
            Monthly Budget (Default Account)
          </CardTitle>
        </Link>
        <div>
          {isEditing ? (
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-36 rounded-xl px-3 py-2 bg-white dark:bg-zinc-800 border border-indigo-300 dark:border-zinc-600 text-sm focus:ring-2 focus:ring-indigo-400 transition-all"
                placeholder="Enter new budget"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBudgetUpdate}
                className="rounded-full p-2 hover:bg-green-100 dark:hover:bg-green-900">
                <Check className="h-5 w-5 text-green-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className="rounded-full p-2 hover:bg-red-100 dark:hover:bg-red-900">
                <X className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <CardDescription className="text-sm text-muted-foreground">
                {typeof currentExpenses === "number" && initialBudget
                  ? `₹${currentExpenses.toFixed(
                      2
                    )} of ₹${initialBudget.amount.toFixed(2)} spent`
                  : "No budget set"}
              </CardDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="rounded-full p-2 hover:bg-indigo-100 dark:hover:bg-zinc-700">
                <Pencil className="h-5 w-5 text-indigo-600" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {initialBudget ? (
          <>
            <Progress
              value={percentUsed}
              extraStyles={`${
                percentUsed >= 80
                  ? "bg-red-400"
                  : percentUsed >= 70
                  ? "bg-purple-400"
                  : "bg-indigo-400"
              }`}
            />
            <p className="text-sm text-right text-muted-foreground">
              {percentUsed.toFixed(1)}% used
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Set a monthly budget to track your expenses.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
