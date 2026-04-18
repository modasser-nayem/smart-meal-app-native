import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Colors } from "@/constants/colors";

interface BalanceCardProps {
   cost: string;
   paid: string;
   balance: string;
   isSurplus: boolean;
   mealCount: number;
   mealRate: string;
}

export const BalanceCard = ({
   cost,
   paid,
   balance,
   isSurplus,
   mealCount,
   mealRate,
}: BalanceCardProps) => {
   const currentMonth = format(new Date(), "MMMM");

   return (
      <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
         {/* Accent line — green for surplus, red for deficit */}
         <View
            className="h-[3px] w-full"
            style={{ backgroundColor: isSurplus ? Colors.icon.success : Colors.icon.error }}
         />

         <View className="px-5 py-5 gap-4">
            {/* Section label */}
            <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
               My Balance · {currentMonth}
            </Typography>

            {/* Cost / Paid row */}
            <View className="flex-row">
               <View className="flex-1">
                  <Typography className="text-primary text-[10px] uppercase font-bold tracking-widest mb-1">
                     My Cost
                  </Typography>
                  <Typography className="text-on-surface text-2xl font-extrabold tracking-tight">
                     {cost}
                  </Typography>
               </View>
               <View className="w-px bg-outline/15 mx-4" />
               <View className="flex-1 items-end">
                  <Typography className="text-primary text-[10px] uppercase font-bold tracking-widest mb-1">
                     I Paid
                  </Typography>
                  <Typography className="text-success text-2xl font-extrabold tracking-tight">
                     {paid}
                  </Typography>
               </View>
            </View>

            {/* Balance hero */}
            <View className="items-center py-4 border-y border-outline/10">
               <View className="flex-row items-center gap-2 mb-1">
                  <MaterialCommunityIcons
                     name={isSurplus ? "trending-up" : "trending-down"}
                     size={28}
                     color={isSurplus ? "#22C55E" : "#EF4444"}
                  />
                  <Typography
                     className={`text-4xl font-extrabold tracking-tight ${
                        isSurplus ? "text-success" : "text-error"
                     }`}
                  >
                     {isSurplus ? "+" : "-"}৳{balance}
                  </Typography>
               </View>
               <Typography className="text-secondary-300 text-xs font-medium">
                  Current {isSurplus ? "surplus" : "deficit"} balance
               </Typography>
            </View>

            {/* Meal stats footer */}
            <View className="flex-row items-center justify-center gap-5">
               <View className="flex-row items-center gap-1.5">
                  <MaterialCommunityIcons
                     name="silverware-fork-knife"
                     size={13}
                     color={Colors.icon.dim}
                  />
                  <Typography className="text-secondary-300 text-xs font-medium">
                     <Typography className="text-primary text-xs font-extrabold">
                        {mealCount}
                     </Typography>{" "}
                     meals
                  </Typography>
               </View>
               <View className="w-1 h-1 rounded-full bg-outline/30" />
               <View className="flex-row items-center gap-1.5">
                  <MaterialCommunityIcons name="cash-multiple" size={13} color={Colors.icon.dim} />
                  <Typography className="text-secondary-300 text-xs font-medium">
                     Rate:{" "}
                     <Typography className="text-on-surface text-xs font-bold">
                        {mealRate}
                     </Typography>
                  </Typography>
               </View>
            </View>
         </View>
      </View>
   );
};
