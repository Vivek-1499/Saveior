import { seedTransactions } from "@/actions/actions";

export async function GET() {
  const result = await seedTransactions();
  return Response.json(result);
}