"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { categoryColors } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, RefreshCw, ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TransactionTable = ({ transactions }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sorted, setSorted] = useState({
    field: "date",
    direction: "desc",
  });

  const handleSort = (field) => {
    setSorted((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
  };

  const router = useRouter();

  return (
    <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 w-[95%] mx-auto my-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-indigo-100 dark:bg-indigo-950">
            <TableHead className="w-[40px] pl-4">
              <Checkbox />
            </TableHead>
            <TableHead
              onClick={() => handleSort("date")}
              className="text-indigo-700 dark:text-indigo-200 font-medium cursor-pointer"
            >
              <div className="flex items-center">
                Date{" "}
                {sorted.field === "date" &&
                  (sorted.direction === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  ))}
              </div>
            </TableHead>
            <TableHead className="text-indigo-700 dark:text-indigo-200 font-medium cursor-pointer">
              Description
            </TableHead>
            <TableHead
              onClick={() => handleSort("category")}
              className="text-indigo-700 dark:text-indigo-200 font-medium cursor-pointer">
              <div className="flex items-center">Category{" "}
                {sorted.field === "category" &&
                  (sorted.direction === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  ))}</div>
            </TableHead>
            <TableHead className="text-indigo-700 dark:text-indigo-200 text-right font-medium cursor-pointer">
              Amount (₹){" "}
                {sorted.field === "amount" &&
                  (sorted.direction === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  ))}
            </TableHead>
            <TableHead className="text-indigo-700 dark:text-indigo-200 font-medium cursor-pointer">
              Recurring{" "}
                {sorted.field === "recurring" &&
                  (sorted.direction === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  ))}
            </TableHead>
            <TableHead className="w-[40px] pr-4" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((txn) => (
              <TableRow
                key={txn.id}
                className="hover:bg-indigo-50 dark:hover:bg-zinc-800 transition-colors">
                <TableCell className="pl-4">
                  <Checkbox />
                </TableCell>
                <TableCell className="text-sm text-zinc-700 dark:text-zinc-200">
                  {format(new Date(txn.date), "dd MMM yyyy")}
                </TableCell>
                <TableCell className="text-sm text-zinc-700 dark:text-zinc-300 max-w-[200px] truncate">
                  {txn.description || "—"}
                </TableCell>
                <TableCell>
                  <span
                    className="px-3 py-1 rounded-full text-white text-xs font-medium capitalize"
                    style={{
                      backgroundColor:
                        categoryColors[txn.category] || "#6366f1",
                    }}>
                    {txn.category}
                  </span>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-sm text-right font-mono",
                    txn.type === "EXPENSE"
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  )}>
                  {txn.type === "EXPENSE" ? "−" : "+"}₹
                  {parseFloat(txn.amount).toFixed(2)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-sm",
                    txn.isRecurring
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-zinc-500 dark:text-zinc-400"
                  )}>
                  {txn.isRecurring ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant="outline"
                          className=" gap-1 bg-purple-300 hover:bg-purple-500">
                          <RefreshCw className="h-3 w-3" />
                          {RECURRING_INTERVALS[txn.recurringInterval] || "—"}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>
                          <div>Next Date:</div>
                          <div>
                            {format(new Date(txn.nextRecurringDate), "PP")}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      One-Time
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="pr-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0 h-8 w-8 ">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(`/transaction/create?edit=${txn.id}`);
                        }}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        // onClick={()=>{
                        //   deleteFn([txn.id])
                        // }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
