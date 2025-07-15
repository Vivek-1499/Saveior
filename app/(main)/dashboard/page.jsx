import { getDashboardData, getUserAccount } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/CreateAccountDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import AccountCard from "./_components/AccountCard";
import { getCurrentBudget } from "@/actions/budget";
import BudgetProgress from "./_components/BudgetProgress";
import { Suspense } from "react";
import DashBoardOverview from "./_components/TransactionOverview";

async function DashboardPage() {
  const accounts = await getUserAccount();
  const defaultAccount = accounts?.find((account)=>account.isDefault)

  let budgetData = null
  if(defaultAccount){
    budgetData = await getCurrentBudget(defaultAccount.id)
  }

  const transaction = await getDashboardData()
  return (
    <div className="px-5">
      {/* Account Progress*/}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full">
              <Plus className="h-10 w-10 mb-2 " />
              <p className="text-sm font-medium"> Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts?.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>

      {/* Budget Progress*/}
       {defaultAccount && <BudgetProgress
       initialBudget={budgetData?.budget}
       currentExpenses ={budgetData?.currentExpenses || 0}
       accountId={defaultAccount.id}
       />}

      {/* OverView Progress*/}
    <Suspense fallback={"Loading OverView..."}>
      <DashBoardOverview
      accounts={accounts}
      transactions = {transaction ||[]}
      />
    </Suspense>

    </div>
  );
}
export default DashboardPage;
