// app/layout.js
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Saveior",
  description: "An AI-powered Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-blue-50 py-8 text-center text-gray-600">
            &copy; Made by Vivek-1499
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
