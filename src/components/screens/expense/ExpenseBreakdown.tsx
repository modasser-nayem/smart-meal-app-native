import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ExpenseBreakdownProps {
   mealExpense: number;
   groupExpense: number;
   sharedCostPerMember: number;
}

interface BarRowProps {
   label: string;
   amount: number;
   total: number;
   color: string;
   textColor: string;
}

const BarRow = ({ label, amount, total, color, textColor }: BarRowProps) => {
   const pct = total > 0 ? Math.round((amount / total) * 100) : 0;
   return (
      <View className="mb-4">
         <View className="flex-row justify-between items-end mb-2">
            <Typography className="text-secondary-200 text-sm font-medium">{label}</Typography>
            <Typography className={`text-base font-bold ${textColor}`}>
               ৳{amount.toLocaleString()}
            </Typography>
         </View>
         <View className="h-2 w-full bg-surface rounded-full overflow-hidden">
            <View className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
         </View>
         <Typography className="text-secondary-400 text-[10px] mt-1">{pct}% of total</Typography>
      </View>
   );
};

export const ExpenseBreakdown = ({
   mealExpense,
   groupExpense,
   sharedCostPerMember,
}: ExpenseBreakdownProps) => {
   const total = mealExpense + groupExpense;

   return (
      <View className="px-5 mt-5">
         <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-3 ml-1">
            Expense Breakdown
         </Typography>
         <View className="bg-surface-container rounded-3xl px-5 py-5 border border-outline/10">
            <BarRow
               label="Meal Expense"
               amount={mealExpense}
               total={total}
               color="bg-primary"
               textColor="text-primary"
            />
            <BarRow
               label="Shared / Group Expense"
               amount={groupExpense}
               total={total}
               color="bg-info"
               textColor="text-info"
            />

            {/* Shared cost per member */}
            <View className="flex-row items-center gap-3 bg-surface rounded-2xl px-4 py-3 mt-1 border border-outline/10">
               <MaterialCommunityIcons name="information-outline" size={18} color="#64748B" />
               <Typography className="text-secondary-300 text-sm flex-1">
                  Shared cost per member:{" "}
                  <Typography className="text-on-surface font-bold">
                     ৳{sharedCostPerMember.toFixed(2)}
                  </Typography>
               </Typography>
            </View>
         </View>
      </View>
   );
};
