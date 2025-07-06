"use client"

import { updateDefaultAccount } from "@/actions/accounts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hook/usefetch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;

  const {
      data: updateAccount,
      fn: updateDefault,
      loading: loadingDefault,
      error,
    } = useFetch(updateDefaultAccount);

    const handleDefaultChange = async(event) =>{
      event.preventDefault();

      if(isDefault){
        toast.warning("You need atleast 1 default account")
        return;
      }

      await updateDefault(id);
    }

    useEffect(()=>{
      if(updateAccount?.success){
        toast.success("Default account updated successfully")
      }
    },[updateAccount, loadingDefault])

    useEffect(()=>{
      if(error){
        toast.error(error.message||"Failed to update")
      }
    },[error])

  return (
    <Card className="group relative transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.01] border border-border bg-background rounded-2xl">
  <Link href={`/accounts/${id}`} className="block px-4 pt-4 pb-2">
    <CardHeader className="flex flex-row items-start justify-between p-0">
      <CardTitle className="text-base font-semibold capitalize text-foreground">
        {name}
      </CardTitle>
      <Switch checked={isDefault} onClick={handleDefaultChange} disabled={loadingDefault}/>
    </CardHeader>

    <CardContent className="p-0 pt-4">
      <div className="text-3xl font-bold text-foreground mb-1">
        ₹{parseFloat(balance).toFixed(2)}
      </div>
      <p className="text-sm text-muted-foreground">
        {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} Account
      </p>
    </CardContent>

    <CardFooter className="flex justify-between items-center p-0 pt-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1 text-green-600">
        <ArrowUpRight className="h-4 w-4 " />
        Income
      </div>
      <div className="flex items-center gap-1 text-red-600">
        <ArrowDownRight className="h-4 w-4" />
        Expense
      </div>
    </CardFooter>
  </Link>
</Card>

  );
};

export default AccountCard;
