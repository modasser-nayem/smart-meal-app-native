import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ExpenseMetricsProps {
   totalMeals: number;
   mealRate: number;
   totalExpense: number;
   eligibleMembers: number;
}

interface MetricTileProps {
   label: string;
   value: string;
   icon: string;
   iconColor: string;
   accent?: boolean;
}

const MetricTile = ({ label, value, icon, iconColor, accent }: MetricTileProps) => (
   <View
      className={`flex-1 bg-surface-container rounded-2xl p-4 ${
         accent ? "border-l-[3px] border-primary" : ""
      }`}
   >
      <MaterialCommunityIcons name={icon as any} size={18} color={iconColor} />
      <Typography className="text-on-surface text-xl font-extrabold mt-2 tracking-tight">
         {value}
      </Typography>
      <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">
         {label}
      </Typography>
   </View>
);

export const ExpenseMetrics = ({
   totalMeals,
   mealRate,
   totalExpense,
   eligibleMembers,
}: ExpenseMetricsProps) => {
   return (
      <View className="px-5 mt-4">
         <View className="flex-row gap-3 mb-3">
            <MetricTile
               label="Total Meals"
               value={String(totalMeals)}
               icon="silverware-fork-knife"
               iconColor="#F59E0B"
               accent
            />
            <MetricTile
               label="Meal Rate"
               value={`৳${mealRate.toFixed(0)}`}
               icon="trending-up"
               iconColor="#3B82F6"
            />
         </View>
         <View className="flex-row gap-3">
            <MetricTile
               label="Total Expense"
               value={`৳${totalExpense.toLocaleString()}`}
               icon="wallet-outline"
               iconColor="#EF4444"
            />
            <MetricTile
               label="Members"
               value={`${eligibleMembers} eligible`}
               icon="account-group-outline"
               iconColor="#22C55E"
            />
         </View>
      </View>
   );
};
