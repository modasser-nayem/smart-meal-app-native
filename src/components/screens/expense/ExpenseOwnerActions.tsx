import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";

export const ExpenseOwnerActions = () => {
   return (
      <View className="px-6 pb-4 items-center">
         <TouchableOpacity className="w-full py-4 px-6 rounded-2xl border-2 border-error/30 bg-transparent active:bg-error/5 transition-all mb-4">
            <Typography className="text-error font-bold uppercase tracking-widest text-xs text-center">
               Close This Month
            </Typography>
         </TouchableOpacity>
         <View className="items-center">
            <Typography className="text-[11px] text-on-surface/40 mb-1 text-center">
               Closing will finalize all calculations and notify members.
            </Typography>
            <TouchableOpacity>
               <Typography className="text-[11px] text-primary/60 underline tracking-wide">
                  Learn more about month finalization
               </Typography>
            </TouchableOpacity>
         </View>
      </View>
   );
};
