import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full fixed top-0 z-50 bg-background text-foreground border-b border-border dark:bg-background backdrop-blur-md">
      <div className="conatiner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Saveior Logo"
            width={200}
            height={80}
            className="object-contain h-12 w-auto"
          />
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4 gap-4">
          <SignedIn>
            <Link
              href={"/dashboard"}
              className="cursor-pointer flex items-center gap-2">
              <Button
                variant="default"
                className="bg-primary text-primary-foreground">
                <LayoutDashboard size={20} />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href={"/transaction/create"}>
              <Button className="flex items-center gap-2">
                <PenBox size={20} />
                <span className="hidden sm:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut className="cursor-pointer">
            <SignInButton
              forceRedirectUrl="/dashboard"
              className="cursor-pointer">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 transition hover:bg-[#5a3ee0]">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
