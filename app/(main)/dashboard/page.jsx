import { checkUser } from "@/lib/checkUser";

export default async function DashboardPage() {
  await checkUser(); // Runs on server
  return <div>Welcome to dashboard</div>;
}
