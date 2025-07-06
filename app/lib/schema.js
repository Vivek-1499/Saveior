import z from "zod";

//file structure used zod so it'll give an error if not in the required manner and left side is same as db columns name and accordingly it's type

export const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["CURRENT", "SAVINGS"]),
  balance: z.string().min(1, "Initial balance is required"),
  isDefault: z.boolean().default(false),
})