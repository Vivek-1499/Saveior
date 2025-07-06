"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import useFetch from "@/hook/usefetch";
import { createAccount } from "@/actions/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

  //so thr useForm will return the follow register ....
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema), //setups the scheme
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: LoadingAccount,
  } = useFetch(createAccount);

  useEffect(()=>{
    if(newAccount && !LoadingAccount){
      toast.success("Account created successfully");
      reset()
      setOpen(false)
    }
  },[LoadingAccount, newAccount])

  useEffect(()=>{
    if(error){
      toast.error(error.message || "Failed to create the account")
    }
  },[error])

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-4xl rounded-t-2xl shadow-lg border bg-white dark:bg-zinc-900">
        {" "}
        <DrawerHeader className="text-center border-b pb-2">
          {" "}
          <DrawerTitle className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
            Create New Account
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-6 py-5">
          {" "}
          {/* 💡 extra padding for cleaner layout */}
          <form
            action=""
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}>
            {/* Account Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                Account Name
              </label>
              <Input
                id="name"
                className="rounded-lg px-4 py-2 text-sm bg-muted/40 focus:ring-2 focus:ring-violet-500"
                placeholder="e.g. Main Checking"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <label
                htmlFor="type"
                className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                Account Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}>
                <SelectTrigger
                  id="type"
                  className="rounded-lg px-4 py-2 text-sm bg-muted/40 focus:ring-2 focus:ring-violet-500">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-xs text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Balance */}
            <div className="space-y-2">
              <label
                htmlFor="balance"
                className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                className="rounded-lg px-4 py-2 text-sm bg-muted/40 focus:ring-2 focus:ring-violet-500"
                placeholder="0.00"
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-xs text-red-500">{errors.balance.message}</p>
              )}
            </div>

            {/* Toggle Row */}
            <div
              onClick={() => setValue("isDefault", !watch("isDefault"))}
              className="flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors hover:bg-muted/40">
              <div className="space-y-1">
                <label
                  htmlFor="isDefault"
                  className="font-medium text-sm text-zinc-700 dark:text-zinc-200">
                  Set as Default
                </label>
                <p className="text-xs text-muted-foreground">
                  This account will be selected as default
                </p>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <Switch
                  id="isDefault"
                  onCheckedChange={(checked) => setValue("isDefault", checked)}
                  checked={watch("isDefault")}
                />
              </div>
            </div>

            <div className="flex items-center gap-10">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>

              <Button type="submit" className="flex-1" disabled={LoadingAccount}>
                {LoadingAccount ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
