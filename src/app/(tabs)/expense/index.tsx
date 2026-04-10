import React from "react";
import { Container } from "@/components/ui/Container";

import { ExpenseHeader } from "@/components/screens/expense/ExpenseHeader";
import { ExpenseMetrics } from "@/components/screens/expense/ExpenseMetrics";
import { ExpenseBreakdown } from "@/components/screens/expense/ExpenseBreakdown";
import { MemberBalances } from "@/components/screens/expense/MemberBalances";
import { SettlementSuggestions } from "@/components/screens/expense/SettlementSuggestions";
import { RecentTransactions } from "@/components/screens/expense/RecentTransactions";
import { ExpenseOwnerActions } from "@/components/screens/expense/ExpenseOwnerActions";

// Dummy data based on the HTML prototype
const metrics = {
   totalMeals: 165,
   mealRate: 32.5,
   totalExpense: "৳5,365",
   eligibleMembers: 8,
};

const balances = [
   {
      name: "Rahim",
      meals: 14,
      cost: "1,356",
      paid: "1,500",
      amount: "+৳144",
      isPositive: true,
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuDl711jqMydNZDs9MR4r5IU6X6tIkdXRkpdJGhw9FW7wC5aaXCIz0htr_Z6xfeyFQPjgNPnVad97EMKT7l_jF_KUlroc0U7QixBHDYHKl8gfL15L1flf_DlC50nIhkofmARXCCgwJU1IQw5aIW6vFToIt95VxFoNGIYoRoKn1YGgqf6hOwqDnqxp1z3KXOLCw0FB_MXveGot-scuFK6-dpecNXscA2Kd0QfvV3auR2S-JOaYPLlcvbDmS1yAa6lUlv46QB23e0dfsw",
   },
   {
      name: "Ali",
      meals: 42,
      cost: "1,830",
      paid: "1,600",
      amount: "-৳230",
      isPositive: false,
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuB1eb5ViOTvt_Nw1KVBMvZAblt-A_JXqMxftfv77k2eokrVgREU9BhRLgJt_TQaC_xs-yH_WN7gfB78hZOwrcG3RWdPJqnYz55qUsDth-SjmIVe8RzAaNxYSpJiXnUGisRerU1J5-sqtBVKngh3SXqBb_Ku4urh-_OX94IXMAKx9J9gesophd0lukpbdZ1P8MKc1xu3FEOHQwrhrivhSo9JXmnHhxiQVM2VDX2qzS6yjgCSHv1LV8grPJjQuGOEKoYAQ8dGa8-W_r8",
   },
   {
      name: "Karim",
      meals: 28,
      cost: "1,095",
      paid: "1,000",
      amount: "-৳95",
      isPositive: false,
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuCmnaGLcUymCqtbhNMsybCsB1NEtlNmcbPQbTSWPa5VIzEqJv3cb2qbQWxjcmiT5zlLm0Vnjg7lVem1dWwGqa7ltQ8QWGbdF07SND3u7oYE7flB8Y2SL2PE8OquFyPC242FBNEJLvf2oeBU1K4AWzVXhXiPCmfGct_X6Wy4avYaMIYTD5BWEjOiAIFhbnK8mlSLmQRk7UFyZ0Gxuq7jOUjHWYb5oPVsOrsDFFXJf32tWNLPDqaUEn7wyN5YEzk0kHUef5DMnw7zqqg",
   },
   {
      name: "Nayem",
      meals: 12,
      cost: "1,084",
      paid: "1,200",
      amount: "+৳116",
      isPositive: true,
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuApZJHODsKwkoO_qlPwnCbYZDuiBP6yw3JRun7wPXNHLKiz35_TpupAo5fdTp5ce2DFKJ8RDBfe-96ZatcBnQIetyaZRzDm7qs9c1mRBo6MI04zAyVHUZYx34Z2dYr7riWSwMTzXiPj8qQ2AYwSy1XZkyHD1lb1yipVOWs3kkCux-qAecmebEKiddkP3zRxs7g_67nN0Mmo2WSsx3_mg5dW2IuXz8s-Z1QwLgT8e4kUF71nTFJ17_8mtoKcif6WJq1sDnj4oRhF9bE",
   },
];

const settlements = [
   { sender: "Rahim", receiver: "Ali", amount: "৳230" },
   { sender: "Karim", receiver: "Nayem", amount: "৳95" },
];

const recentTransactions = [
   {
      title: "Bazar - Monthly Groceries",
      amount: "৳2,850",
      payer: "Rahim",
      date: "Today",
      type: "Grocery",
      icon: "cart-variant",
      color: "bg-orange-500/10",
      iconColor: "#FB923C",
   },
   {
      title: "Chicken & Eggs",
      amount: "৳850",
      payer: "Karim",
      date: "Yesterday",
      type: "Food",
      icon: "food-apple-outline",
      color: "bg-red-500/10",
      iconColor: "#F87171",
   },
   {
      title: "Internet Bill",
      amount: "৳1,000",
      payer: "Me",
      date: "April 02",
      type: "Other",
      icon: "wifi",
      color: "bg-blue-500/10",
      iconColor: "#60A5FA",
   },
];

export default function ExpenseScreen() {
   return (
      <Container
         scrollable
         className="bg-background pt-12 pb-32"
      >
         <ExpenseHeader />
         <ExpenseMetrics metrics={metrics} />
         <ExpenseBreakdown />
         <MemberBalances balances={balances} />
         <SettlementSuggestions settlements={settlements} />
         <RecentTransactions transactions={recentTransactions} />
         <ExpenseOwnerActions />
      </Container>
   );
}
