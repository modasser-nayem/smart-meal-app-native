import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ExpenseHeader = () => {
   return (
      <View className="px-4 flex-row justify-between items-end mb-4">
         <View>
            <Typography className="text-primary/60 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
               Financials
            </Typography>
            <Typography className="text-on-surface font-extrabold text-3xl tracking-tight">
               Monthly Expense
            </Typography>
         </View>
         <View className="bg-primary-container/10 border border-primary-container/20 px-3 py-1 rounded-full flex-row items-center gap-1.5 mb-1">
            <MaterialCommunityIcons
               name="lock-open-outline"
               size={14}
               color="#f59e0b"
            />
            <Typography className="text-[11px] font-bold text-primary-container uppercase tracking-wider">
               Month Open
            </Typography>
         </View>
      </View>
   );
};
