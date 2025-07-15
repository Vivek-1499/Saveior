import { getUserAccount } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import React from "react";
import AddTransactionForm from "../_components/AddTransacationForm";
import { getTransaction } from "@/actions/transaction";

const Page = async ({ searchParams }) => {
  const params = await searchParams;
  const editId = params?.edit;

  const accounts = await getUserAccount();

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }
  console.log(editId);
  return (
    <div className="min-h-screen px-4 py-8 flex justify-center items-start bg-[#f8f9ff]">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent ">
          {editId ? "Edit" : "Add"} Transaction
        </h1>
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
          editMode={!!editId}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default Page;
