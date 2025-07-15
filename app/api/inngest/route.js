import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlert, generateMonthlyReports, processRecurringTransaction, triggerRecurringTransaction } from "@/lib/inngest/functions";

//exports to the inngest sowe can invoke from there
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    checkBudgetAlert, triggerRecurringTransaction, processRecurringTransaction, generateMonthlyReports
  ],
});