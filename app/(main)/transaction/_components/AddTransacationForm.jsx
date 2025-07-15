"use client";

import { createTransaction, upadateTransation } from "@/actions/transaction";
import { TransactionSchema } from "@/app/lib/schema";
import CreateAccountDrawer from "@/components/CreateAccountDrawer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hook/usefetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ReceiptScanner from "./ReceiptScanner";

const AddTransactionForm = ({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(TransactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? upadateTransation : createTransaction);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");
  const selectedCategory = watch("category");
  const selectedType = watch("type");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode ? "Transaction updated successfully" : "Transaction added"
      );
      reset();
      router.push(`/accounts/${transactionResult.data.accountId}`);
    }
  }, [transactionLoading, transactionResult, editMode]);

  const handleScanComplete = (scannedData) => {
    console.log(scannedData);
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        const normalizedCategory = scannedData.category.toLowerCase();
        const matchedCategory = categories.find(
          (cat) => cat.id === normalizedCategory
        );

        if (matchedCategory) {
          setValue("type", matchedCategory.type);
          setTimeout(() => {
            setValue("category", matchedCategory.id);
          }, 0);
        } else {
          console.warn("Category not found:", scannedData.category);
        }
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-2xl w-full mx-auto">
      {!editMode && <ReceiptScanner onScanComplete={handleScanComplete} />}
      {/* Row: Type */}
      <div className="space-y-6">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Type
        </label>
        <Select
          value={selectedType}
          onValueChange={(value) => setValue("type", value)}>
          <SelectTrigger className="w-full hover:bg-indigo-50 hover:cursor-pointer">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              className="hover:bg-indigo-50 hover:cursor-pointer"
              value="EXPENSE">
              Expense
            </SelectItem>
            <SelectItem
              className="hover:bg-indigo-50 hover:cursor-pointer"
              value="INCOME">
              Income
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-red-400">{errors.type.message}</p>
        )}
      </div>

      {/* Row: Amount + Account */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Amount
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="text-sm text-red-400">{errors.amount.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Account
          </label>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}>
            <SelectTrigger className="w-full hover:bg-indigo-50 hover:cursor-pointer">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((acc) => (
                <SelectItem
                  key={acc.id}
                  value={acc.id}
                  className="hover:bg-indigo-50 hover:cursor-pointer">
                  {acc.name} (₹{parseFloat(acc.balance).toFixed(2)})
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button variant="outline" className="w-full mt-1">
                  Create Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="text-sm text-red-400">{errors.accountId.message}</p>
          )}
        </div>
      </div>

      {/* Row: Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Category
        </label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => setValue("category", value)}>
          <SelectTrigger className="w-full hover:bg-indigo-50 hover:cursor-pointer">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-400">{errors.category.message}</p>
        )}
      </div>

      {/* Row: Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Description
        </label>
        <Input placeholder="Enter Description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-400">{errors.description.message}</p>
        )}
      </div>

      {/* Row: Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal">
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setValue("date", date)}
              disabled={(date) =>
                date > new Date() || date < new Date("2000-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-sm text-red-400">{errors.date.message}</p>
        )}
      </div>

      {/* Row: Recurring */}
      <div
        onClick={() => setValue("isRecurring", !isRecurring)}
        className="flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <div className="space-y-1">
          <label className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
            Recurring Transaction
          </label>
          <p className="text-xs text-muted-foreground">
            Set up a recurring schedule for this transaction
          </p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={isRecurring}
            onCheckedChange={(checked) => setValue("isRecurring", checked)}
          />
        </div>
      </div>

      {isRecurring && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Recurring Interval
          </label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}>
            <SelectTrigger className="w-full hover:bg-indigo-50 hover:cursor-pointer">
              <SelectValue placeholder="Select Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">Daily</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-400">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

      {/* Row: Buttons */}
      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <button
          type="button"
          className="w-full py-2 border border-zinc-300 dark:border-zinc-600 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          onClick={() => router.back()}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={transactionLoading}
          className="w-full py-2 flex items-center justify-center gap-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed">
          {transactionLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{editMode ? "Updating..." : "Creating..."}</span>
            </>
          ) : (
            <span>
              {editMode ? "Update Transaction" : "Create Transaction"}
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
