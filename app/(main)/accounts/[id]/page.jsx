import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { TransactionTable } from "../_components/TransactionTable";
import { BarLoader } from "react-spinners";
import AccountChart from "../_components/AccountChart";

const AccountsPage = async ({ params }) => {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, totalTransactions, ...account } = accountData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-zinc-900 dark:to-zinc-800 px-6 py-10">
      <div className="max-w-[95%] mx-auto space-y-10">
        {/* Account Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b pb-6">
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl font-bold gradient-title">
              {account.name}
            </h1>
            <p className="text-md text-purple-700 dark:text-purple-300 font-medium">
              {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="text-4xl font-bold text-indigo-900 dark:text-indigo-100">
              ₹{parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {account._count.transactions} Transactions
            </p>
          </div>
        </div>
        {/* Charts Section */}
        <Suspense fallback={<BarLoader className="mt-4" color="#933333"/>}>
        <AccountChart transactions={transactions}/>
        </Suspense>

        {/* Transactions Table */}
        <Suspense
          fallback={
            <BarLoader className="mt-4" width={"100%"} color={"#ffffff"} />
          }
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
};

export default AccountsPage;
