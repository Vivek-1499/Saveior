import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "saveior",
  name: "Saveior",
  retryFunction: async(attempt) =>({
    delay: Math.pow(2, attempt)*1000,
    maxAttempts: 2,
  })
 });