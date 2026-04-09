import React from "react";
import { View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
   return (
      <Card
         padding="lg"
         className="bg-surface-container rounded-3xl space-y-6"
      >
         <View className="flex-row">
            <View className="flex-1 space-y-1">
               <Typography className="text-amber-400 text-[10px] uppercase font-bold tracking-widest">
                  My Cost
               </Typography>
               <View className="flex-row items-baseline gap-1">
                  <Typography className="text-2xl font-bold text-primary">
                     {cost}
                  </Typography>
                  <Typography className="text-xs text-on-surface">
                     for April
                  </Typography>
               </View>
            </View>
            <View className="flex-1 space-y-1 items-end text-right">
               <Typography className="text-amber-400 text-[10px] uppercase font-bold tracking-widest">
                  I Paid
               </Typography>
               <View className="flex-row items-baseline gap-1">
                  <Typography className="text-2xl text-success font-bold">
                     {paid}
                  </Typography>
               </View>
            </View>
         </View>

         <View className="relative my-2 py-2 items-center justify-center border-y border-outline">
            <View className="flex-row items-center gap-2">
               <MaterialCommunityIcons
                  name={isSurplus ? "trending-up" : "trending-down"}
                  size={32}
                  color={isSurplus ? "#51E77B" : "#EF4444"}
               />
               <Typography
                  className={`text-4xl font-extrabold ${isSurplus ? "text-success" : "text-error"}`}
               >
                  {isSurplus ? "+" : "-"}৳{balance}
               </Typography>
            </View>
            <Typography className="text-[12px] text-on-surface mt-2 font-medium tracking-wide">
               Current {isSurplus ? "Surplus" : "Deficit"} Balance
            </Typography>
         </View>

         <View className="flex-row items-center justify-center gap-4">
            <View className="flex-row items-center gap-1">
               <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={14}
                  color="#94A3B8"
               />
               <Typography className="text-[11px] font-medium text-on-surface uppercase tracking-tight">
                  <Typography className="text-[11px] text-primary">
                     {mealCount}
                  </Typography>{" "}
                  meals
               </Typography>
            </View>
            <View className="w-1 h-1 bg-outline-variant/30 rounded-full" />
            <View className="flex-row items-center gap-1">
               <MaterialCommunityIcons
                  name="cash-multiple"
                  size={14}
                  color="#94A3B8"
               />
               <Typography className="text-[11px] font-medium text-on-surface uppercase tracking-tight">
                  Rate: {mealRate}
               </Typography>
            </View>
         </View>
      </Card>
   );
};
