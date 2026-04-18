import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

interface ExpenseHeaderProps {
   month: string;
   isMonthOpen: boolean;
   onPrevMonth: () => void;
   onNextMonth: () => void;
   canGoNext: boolean;
   myBalance: number;
   myMeals: number;
   myCost: number;
   myPaid: number;
}

export const ExpenseHeader = ({
   month,
   isMonthOpen,
   onPrevMonth,
   onNextMonth,
   canGoNext,
   myBalance,
   myMeals,
   myCost,
   myPaid,
}: ExpenseHeaderProps) => {
   const isSurplus = myBalance >= 0;

   return (
      <View className="px-5 pt-4 pb-2">
         {/* Top row — month nav + status */}
         <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center gap-3">
               <TouchableOpacity
                  onPress={onPrevMonth}
                  activeOpacity={0.7}
                  className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
               >
                  <MaterialCommunityIcons
                     name="chevron-left"
                     size={22}
                     color={Colors.icon.onDark}
                  />
               </TouchableOpacity>
               <View>
                  <Typography className="text-[10px] text-secondary-300 uppercase font-bold tracking-widest">
                     Financials
                  </Typography>
                  <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
                     {month}
                  </Typography>
               </View>
               <TouchableOpacity
                  onPress={onNextMonth}
                  activeOpacity={0.7}
                  disabled={!canGoNext}
                  className={`w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90 ${!canGoNext ? "opacity-30" : ""}`}
               >
                  <MaterialCommunityIcons
                     name="chevron-right"
                     size={22}
                     color={Colors.icon.onDark}
                  />
               </TouchableOpacity>
            </View>

            {/* Month status badge */}
            <View
               className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                  isMonthOpen ? "bg-primary/10 border-primary/25" : "bg-surface border-outline/20"
               }`}
            >
               <MaterialCommunityIcons
                  name={isMonthOpen ? "lock-open-outline" : "lock-outline"}
                  size={12}
                  color={isMonthOpen ? "#F59E0B" : "#64748B"}
               />
               <Typography
                  className={`text-[10px] font-black uppercase tracking-widest ${
                     isMonthOpen ? "text-primary" : "text-secondary-400"
                  }`}
               >
                  {isMonthOpen ? "Open" : "Closed"}
               </Typography>
            </View>
         </View>

         {/* My Balance hero card */}
         <View className="bg-surface-container rounded-3xl border border-outline/10 overflow-hidden">
            <View
               className="h-[3px]"
               style={{ backgroundColor: isSurplus ? Colors.icon.success : Colors.icon.error }}
            />
            <View className="px-5 pt-4 pb-5">
               <Typography className="text-[10px] text-secondary-300 uppercase font-bold tracking-widest mb-4">
                  My Balance This Month
               </Typography>

               {/* Balance + stats row */}
               <View className="flex-row items-stretch gap-4">
                  {/* Left — big balance number */}
                  <View className="flex-1 justify-center">
                     <View className="flex-row items-center gap-1.5 mb-1">
                        <MaterialCommunityIcons
                           name={isSurplus ? "trending-up" : "trending-down"}
                           size={18}
                           color={isSurplus ? "#22C55E" : "#EF4444"}
                        />
                        <Typography
                           className={`text-[10px] font-black uppercase tracking-widest ${
                              isSurplus ? "text-success" : "text-error"
                           }`}
                        >
                           {isSurplus ? "Surplus" : "You Owe"}
                        </Typography>
                     </View>
                     <Typography
                        className={`text-4xl font-extrabold tracking-tight leading-none ${
                           isSurplus ? "text-success" : "text-error"
                        }`}
                     >
                        {isSurplus ? "+" : "-"}৳{Math.abs(myBalance)}
                     </Typography>
                  </View>

                  {/* Divider */}
                  <View className="w-px bg-outline/15 my-1" />

                  {/* Right — 3 stat pills stacked */}
                  <View className="gap-2 justify-center">
                     {/* Meals */}
                     <View className="flex-row items-center justify-between gap-6">
                        <View className="flex-row items-center gap-1.5">
                           <MaterialCommunityIcons
                              name="silverware-fork-knife"
                              size={12}
                              color={Colors.icon.dim}
                           />
                           <Typography className="text-secondary-400 text-xs">Meals</Typography>
                        </View>
                        <Typography className="text-on-surface text-sm font-extrabold">
                           {myMeals}
                        </Typography>
                     </View>
                     {/* Cost */}
                     <View className="flex-row items-center justify-between gap-6">
                        <View className="flex-row items-center gap-1.5">
                           <MaterialCommunityIcons
                              name="calculator-variant-outline"
                              size={12}
                              color={Colors.icon.dim}
                           />
                           <Typography className="text-secondary-400 text-xs">Cost</Typography>
                        </View>
                        <Typography className="text-on-surface text-sm font-extrabold">
                           ৳{myCost.toLocaleString()}
                        </Typography>
                     </View>
                     {/* Paid */}
                     <View className="flex-row items-center justify-between gap-6">
                        <View className="flex-row items-center gap-1.5">
                           <MaterialCommunityIcons
                              name="cash-check"
                              size={12}
                              color={Colors.icon.dim}
                           />
                           <Typography className="text-secondary-400 text-xs">Paid</Typography>
                        </View>
                        <Typography className="text-on-surface text-sm font-extrabold">
                           ৳{myPaid.toLocaleString()}
                        </Typography>
                     </View>
                  </View>
               </View>
            </View>
         </View>
      </View>
   );
};
