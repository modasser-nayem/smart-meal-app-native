import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Container } from "@/components/ui/Container";
import { CustomAlert } from "@/components/ui/CustomAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ExpenseHeader } from "@/components/screens/expense/ExpenseHeader";
import { ExpenseFilterTabs, ExpenseFilter } from "@/components/screens/expense/ExpenseFilterTabs";
import { ExpenseMetrics } from "@/components/screens/expense/ExpenseMetrics";
import { ExpenseBreakdown } from "@/components/screens/expense/ExpenseBreakdown";
import { RecentTransactions, Transaction } from "@/components/screens/expense/RecentTransactions";
import { MemberBalances, MemberBalance } from "@/components/screens/expense/MemberBalances";
import {
   SettlementSuggestions,
   Settlement,
} from "@/components/screens/expense/SettlementSuggestions";
import { ExpenseOwnerActions } from "@/components/screens/expense/ExpenseOwnerActions";
import { AddExpenseSheet } from "@/components/screens/expense/AddExpenseSheet";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MONTHS = ["February 2026", "March 2026", "April 2026"];

const ALL_TRANSACTIONS: Transaction[] = [
   {
      id: "t1",
      title: "Bazar - Monthly Groceries",
      amount: 2850,
      payer: "Rahim",
      date: "Today",
      type: "meal",
      icon: "cart-variant",
   },
   {
      id: "t2",
      title: "Chicken & Eggs",
      amount: 850,
      payer: "Karim",
      date: "Yesterday",
      type: "meal",
      icon: "food-drumstick-outline",
   },
   {
      id: "t3",
      title: "Internet Bill",
      amount: 1000,
      payer: "Me",
      date: "Apr 02",
      type: "group",
      icon: "wifi",
   },
   {
      id: "t4",
      title: "Gas Cylinder",
      amount: 1200,
      payer: "Ali",
      date: "Apr 01",
      type: "group",
      icon: "gas-cylinder",
   },
   {
      id: "t5",
      title: "Rice & Lentils",
      amount: 650,
      payer: "Me",
      date: "Mar 30",
      type: "meal",
      icon: "bowl-mix-outline",
   },
];

const MEMBER_BALANCES: MemberBalance[] = [
   {
      id: "m1",
      name: "Rahim",
      initials: "RA",
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuDl711jqMydNZDs9MR4r5IU6X6tIkdXRkpdJGhw9FW7wC5aaXCIz0htr_Z6xfeyFQPjgNPnVad97EMKT7l_jF_KUlroc0U7QixBHDYHKl8gfL15L1flf_DlC50nIhkofmARXCCgwJU1IQw5aIW6vFToIt95VxFoNGIYoRoKn1YGgqf6hOwqDnqxp1z3KXOLCw0FB_MXveGot-scuFK6-dpecNXscA2Kd0QfvV3auR2S-JOaYPLlcvbDmS1yAa6lUlv46QB23e0dfsw",
      meals: 14,
      cost: 1356,
      paid: 1500,
      balance: 144,
   },
   {
      id: "m2",
      name: "Ali",
      initials: "AL",
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuB1eb5ViOTvt_Nw1KVBMvZAblt-A_JXqMxftfv77k2eokrVgREU9BhRLgJt_TQaC_xs-yH_WN7gfB78hZOwrcG3RWdPJqnYz55qUsDth-SjmIVe8RzAaNxYSpJiXnUGisRerU1J5-sqtBVKngh3SXqBb_Ku4urh-_OX94IXMAKx9J9gesophd0lukpbdZ1P8MKc1xu3FEOHQwrhrivhSo9JXmnHhxiQVM2VDX2qzS6yjgCSHv1LV8grPJjQuGOEKoYAQ8dGa8-W_r8",
      meals: 42,
      cost: 1830,
      paid: 1600,
      balance: -230,
   },
   {
      id: "m3",
      name: "Karim",
      initials: "KA",
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuCmnaGLcUymCqtbhNMsybCsB1NEtlNmcbPQbTSWPa5VIzEqJv3cb2qbQWxjcmiT5zlLm0Vnjg7lVem1dWwGqa7ltQ8QWGbdF07SND3u7oYE7flB8Y2SL2PE8OquFyPC242FBNEJLvf2oeBU1K4AWzVXhXiPCmfGct_X6Wy4avYaMIYTD5BWEjOiAIFhbnK8mlSLmQRk7UFyZ0Gxuq7jOUjHWYb5oPVsOrsDFFXJf32tWNLPDqaUEn7wyN5YEzk0kHUef5DMnw7zqqg",
      meals: 28,
      cost: 1095,
      paid: 1000,
      balance: -95,
   },
   {
      id: "m4",
      name: "Nayem",
      initials: "NA",
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuApZJHODsKwkoO_qlPwnCbYZDuiBP6yw3JRun7wPXNHLKiz35_TpupAo5fdTp5ce2DFKJ8RDBfe-96ZatcBnQIetyaZRzDm7qs9c1mRBo6MI04zAyVHUZYx34Z2dYr7riWSwMTzXiPj8qQ2AYwSy1XZkyHD1lb1yipVOWs3kkCux-qAecmebEKiddkP3zRxs7g_67nN0Mmo2WSsx3_mg5dW2IuXz8s-Z1QwLgT8e4kUF71nTFJ17_8mtoKcif6WJq1sDnj4oRhF9bE",
      meals: 12,
      cost: 1084,
      paid: 1200,
      balance: 116,
   },
];

const INITIAL_SETTLEMENTS: Settlement[] = [
   {
      id: "s1",
      sender: "Ali",
      senderInitials: "AL",
      senderAvatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuB1eb5ViOTvt_Nw1KVBMvZAblt-A_JXqMxftfv77k2eokrVgREU9BhRLgJt_TQaC_xs-yH_WN7gfB78hZOwrcG3RWdPJqnYz55qUsDth-SjmIVe8RzAaNxYSpJiXnUGisRerU1J5-sqtBVKngh3SXqBb_Ku4urh-_OX94IXMAKx9J9gesophd0lukpbdZ1P8MKc1xu3FEOHQwrhrivhSo9JXmnHhxiQVM2VDX2qzS6yjgCSHv1LV8grPJjQuGOEKoYAQ8dGa8-W_r8",
      receiver: "Rahim",
      receiverInitials: "RA",
      receiverAvatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuDl711jqMydNZDs9MR4r5IU6X6tIkdXRkpdJGhw9FW7wC5aaXCIz0htr_Z6xfeyFQPjgNPnVad97EMKT7l_jF_KUlroc0U7QixBHDYHKl8gfL15L1flf_DlC50nIhkofmARXCCgwJU1IQw5aIW6vFToIt95VxFoNGIYoRoKn1YGgqf6hOwqDnqxp1z3KXOLCw0FB_MXveGot-scuFK6-dpecNXscA2Kd0QfvV3auR2S-JOaYPLlcvbDmS1yAa6lUlv46QB23e0dfsw",
      amount: 230,
      settled: false,
   },
   {
      id: "s2",
      sender: "Karim",
      senderInitials: "KA",
      senderAvatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuCmnaGLcUymCqtbhNMsybCsB1NEtlNmcbPQbTSWPa5VIzEqJv3cb2qbQWxjcmiT5zlLm0Vnjg7lVem1dWwGqa7ltQ8QWGbdF07SND3u7oYE7flB8Y2SL2PE8OquFyPC242FBNEJLvf2oeBU1K4AWzVXhXiPCmfGct_X6Wy4avYaMIYTD5BWEjOiAIFhbnK8mlSLmQRk7UFyZ0Gxuq7jOUjHWYb5oPVsOrsDFFXJf32tWNLPDqaUEn7wyN5YEzk0kHUef5DMnw7zqqg",
      receiver: "Nayem",
      receiverInitials: "NA",
      receiverAvatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuApZJHODsKwkoO_qlPwnCbYZDuiBP6yw3JRun7wPXNHLKiz35_TpupAo5fdTp5ce2DFKJ8RDBfe-96ZatcBnQIetyaZRzDm7qs9c1mRBo6MI04zAyVHUZYx34Z2dYr7riWSwMTzXiPj8qQ2AYwSy1XZkyHD1lb1yipVOWs3kkCux-qAecmebEKiddkP3zRxs7g_67nN0Mmo2WSsx3_mg5dW2IuXz8s-Z1QwLgT8e4kUF71nTFJ17_8mtoKcif6WJq1sDnj4oRhF9bE",
      amount: 95,
      settled: false,
   },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ExpenseScreen() {
   const [monthIndex, setMonthIndex] = useState(2); // April 2026
   const [filter, setFilter] = useState<ExpenseFilter>("all");
   const [sheetVisible, setSheetVisible] = useState(false);
   const [settlements, setSettlements] = useState<Settlement[]>(INITIAL_SETTLEMENTS);
   const [transactions, setTransactions] = useState<Transaction[]>(ALL_TRANSACTIONS);
   const [closeMonthAlert, setCloseMonthAlert] = useState(false);
   const [isMonthOpen, setIsMonthOpen] = useState(true);

   const month = MONTHS[monthIndex];
   const isCurrentMonth = monthIndex === MONTHS.length - 1;

   // Filter transactions
   const filtered = transactions.filter((t) => {
      if (filter === "all") return true;
      if (filter === "mine") return t.payer === "Me";
      return t.type === filter;
   });

   const handleMarkSettled = (id: string) => {
      setSettlements((prev) => prev.map((s) => (s.id === id ? { ...s, settled: true } : s)));
   };

   const handleAddExpense = (data: {
      title: string;
      amount: number;
      type: "meal" | "group";
      date: string;
   }) => {
      const newTx: Transaction = {
         id: `t${Date.now()}`,
         title: data.title,
         amount: data.amount,
         payer: "Me",
         date: data.date,
         type: data.type,
         icon: data.type === "meal" ? "silverware-fork-knife" : "account-group-outline",
      };
      setTransactions((prev) => [newTx, ...prev]);
   };

   const handleCloseMonth = () => {
      setCloseMonthAlert(true);
   };

   return (
      <View className="flex-1 bg-background">
         <Container scrollable withSafeArea padding={false} className="bg-background">
            {/* ① Header — month nav + my balance */}
            <ExpenseHeader
               month={month}
               isMonthOpen={isMonthOpen}
               onPrevMonth={() => setMonthIndex((i) => Math.max(0, i - 1))}
               onNextMonth={() => setMonthIndex((i) => Math.min(MONTHS.length - 1, i + 1))}
               canGoNext={monthIndex < MONTHS.length - 1}
               myBalance={116}
               myMeals={12}
               myCost={1084}
               myPaid={1200}
            />

            {/* ② Filter tabs */}
            <View className="mt-4">
               <ExpenseFilterTabs active={filter} onChange={setFilter} />
            </View>

            {/* ③ Metrics */}
            <ExpenseMetrics
               totalMeals={165}
               mealRate={32.5}
               totalExpense={5365}
               eligibleMembers={8}
            />

            {/* ④ Breakdown */}
            <ExpenseBreakdown mealExpense={4550} groupExpense={815} sharedCostPerMember={101.88} />

            {/* ⑤ Transactions */}
            <RecentTransactions transactions={filtered} onSeeAll={() => {}} />

            {/* ⑥ Member Balances */}
            <MemberBalances balances={MEMBER_BALANCES} />

            {/* ⑦ Settlements */}
            <SettlementSuggestions settlements={settlements} onMarkSettled={handleMarkSettled} />

            {/* ⑧ Owner Actions */}
            <ExpenseOwnerActions
               isOwner
               isMonthOpen={isMonthOpen}
               onCloseMonth={handleCloseMonth}
               onExport={() => {}}
            />

            <View className="h-28" />
         </Container>

         {/* FAB — Add Expense */}
         <TouchableOpacity
            onPress={() => setSheetVisible(true)}
            activeOpacity={0.85}
            className="absolute bottom-6 right-5 w-14 h-14 bg-primary rounded-2xl items-center justify-center"
            style={{ elevation: 8 }}
         >
            <MaterialCommunityIcons name="plus" size={28} color="#0F172A" />
         </TouchableOpacity>

         {/* Add Expense Sheet */}
         <AddExpenseSheet
            visible={sheetVisible}
            onClose={() => setSheetVisible(false)}
            onSubmit={handleAddExpense}
         />

         {/* Close Month Alert */}
         <CustomAlert
            visible={closeMonthAlert}
            onClose={() => setCloseMonthAlert(false)}
            icon="lock-outline"
            iconVariant="danger"
            title="Close This Month?"
            message="This will finalize all calculations and notify all members. This action cannot be undone."
            actions={[
               {
                  label: "Close Month",
                  variant: "danger",
                  onPress: () => {
                     setIsMonthOpen(false);
                     setCloseMonthAlert(false);
                  },
               },
               { label: "Cancel", onPress: () => setCloseMonthAlert(false) },
            ]}
         />
      </View>
   );
}
