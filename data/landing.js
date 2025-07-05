import {
  BarChart3,
  PieChart,
  CreditCard,
} from "lucide-react";
import Lottie from "lottie-react";

export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

export const featuresData = [
  {
    key: "analytics",
    title: "Intelligent Dashboards",
    description:
      "Visualize your income, expenses, and savings with real-time dynamic dashboards",
  },
  {
    key: "receipt",
    title: "AI Receipt Parser",
    description:
      "Scan, upload, and auto-parse receipts into expense categories with ease",
  },
  {
    key: "budget",
    title: "Goal-Based Budgeting",
    description:
      "Set financial goals and let AI adjust your spending to help reach them faster",
  },
  {
    key: "wallet",
    title: "Unified Wallet",
    description:
      "Sync all your bank accounts and cards to track money movement seamlessly",
  },
  {
    key: "globe",
    title: "Global Access",
    description:
      "Use the app across countries with auto-detection and real-time FX rates",
  },
  {
    key: "alert",
    title: "Smart Alerts",
    description:
      "Get notified instantly when unusual activity or overspending is detected",
  },
];


export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-purple-600" />,
    title: "1. Sign Up Instantly",
    description:
      "Create your profile in seconds with bank-grade encryption and authentication",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
    title: "2. Link & Sync Accounts",
    description:
      "Connect your financial accounts securely and begin automatic tracking",
  },
  {
    icon: <PieChart className="h-8 w-8 text-purple-600" />,
    title: "3. Analyze & Save",
    description:
      "Let AI uncover patterns and help you budget smarter, save faster",
  },
];

export const testimonialsData = [
  {
    name: "Aanya Kapoor",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "Saveiour helped me streamline my personal and business finances in one dashboard. I’ve never felt more in control.",
  },
  {
    name: "Ravi Mehta",
    role: "Remote Developer",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    quote:
      "I travel often, and the multi-currency feature is a game-changer. Plus, I love how intuitive the UI is.",
  },
  {
    name: "Lina Davis",
    role: "Finance Coach",
    image: "https://randomuser.me/api/portraits/women/61.jpg",
    quote:
      "Saveiour is perfect for clients just starting out or seasoned investors. The automated insights are spot-on and actionable.",
  },
  {
    name: "Rohan Kaparria",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Saveiour helped me streamline my personal and business finances in one dashboard. I’ve never felt more in control.",
  },
];
