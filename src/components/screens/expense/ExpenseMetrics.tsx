import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ExpenseMetricsProps {
   metrics: {
      totalMeals: number;
      mealRate: number;
      totalExpense: string;
      eligibleMembers: number;
   };
}

export const ExpenseMetrics = ({ metrics }: ExpenseMetricsProps) => {
   return (
      <View className="px-6 flex-row flex-wrap justify-between gap-y-4 mb-8">
         {/* Total Meals */}
         <TouchableOpacity className="w-[48%] bg-surface-container rounded-2xl border-l-4 border-primary p-5 overflow-hidden active:bg-surface-container transition-all">
            <View className="z-10 flex-col">
               <Typography className="text-[11px] font-semibold text-on-surface/60 uppercase tracking-widest mb-1">
                  Total Meals
               </Typography>
               <Typography className="text-3xl font-bold text-on-surface">
                  {metrics.totalMeals}
               </Typography>
            </View>
         </TouchableOpacity>

         {/* Meal Rate */}
         <TouchableOpacity className="w-[48%] bg-surface-container rounded-2xl p-5 overflow-hidden active:bg-surface-container transition-all">
            <View className="z-10 flex-col">
               <Typography className="text-[11px] font-semibold text-on-surface/60 uppercase tracking-widest mb-1">
                  Meal Rate
               </Typography>
               <View className="flex-row items-baseline gap-1">
                  <Typography className="text-3xl font-bold text-on-surface">
                     ৳{metrics.mealRate.toFixed(2)}
                  </Typography>
                  <Typography className="text-sm font-medium text-on-surface/40">
                     /meal
                  </Typography>
               </View>
            </View>
         </TouchableOpacity>

         {/* Total Expense */}
         <TouchableOpacity className="w-[48%] bg-surface-container rounded-2xl p-5 border-l-4 border-error overflow-hidden active:bg-surface-container transition-all">
            <View className="z-10 flex-col">
               <Typography className="text-[11px] font-semibold text-on-surface/60 uppercase tracking-widest mb-1">
                  Total Expense
               </Typography>
               <Typography className="text-3xl font-bold text-on-surface">
                  {metrics.totalExpense}
               </Typography>
            </View>
         </TouchableOpacity>

         {/* Members */}
         <TouchableOpacity className="w-[48%] bg-surface-container rounded-2xl p-5 overflow-hidden active:bg-surface-container transition-all">
            <View className="z-10 flex-col">
               <Typography className="text-[11px] font-semibold text-on-surface/60 uppercase tracking-widest mb-1">
                  Members
               </Typography>
               <View className="flex-row items-baseline gap-1">
                  <Typography className="text-3xl font-bold text-on-surface">
                     {metrics.eligibleMembers}
                  </Typography>
                  <Typography className="text-sm font-medium text-on-surface/40">
                     Eligible
                  </Typography>
               </View>
            </View>
         </TouchableOpacity>
      </View>
   );
};
