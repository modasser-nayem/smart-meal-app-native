import React from "react";
import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Settlement {
   sender: string;
   receiver: string;
   amount: string;
}

interface SettlementSuggestionsProps {
   settlements: Settlement[];
}

export const SettlementSuggestions = ({ settlements }: SettlementSuggestionsProps) => {
   return (
      <View className="px-6 mb-8">
         <View className="flex-row items-center gap-2 mb-4">
            <MaterialCommunityIcons name="hand-coin" size={20} color="#f59e0b" />
            <Typography className="text-sm font-bold uppercase tracking-widest text-[#ffc174]">
               Suggested Settlements
            </Typography>
         </View>

         <View className="space-y-3">
            {settlements.map((settle, i) => (
               <View key={i} className="bg-surface-container-high/40 rounded-2xl p-5 flex-row items-center justify-between border border-outline-variant/10 mb-3">
                  <View className="flex-row items-center flex-1 pr-4">
                     <View className="text-center items-center">
                        <Typography className="text-sm font-bold text-on-surface">{settle.sender}</Typography>
                        <Typography className="text-[10px] text-error">Sender</Typography>
                     </View>
                     <View className="flex-1 items-center px-2">
                        <View className="h-[1px] w-8 bg-outline-variant/30 flex-row items-center justify-center">
                           <MaterialCommunityIcons name="arrow-right" size={16} color="#f59e0b" style={{ position: 'absolute' }} />
                        </View>
                     </View>
                     <View className="text-center items-center">
                        <Typography className="text-sm font-bold text-on-surface">{settle.receiver}</Typography>
                        <Typography className="text-[10px] text-tertiary">Receiver</Typography>
                     </View>
                  </View>
                  <View className="bg-primary-container/10 px-4 py-2 rounded-xl">
                     <Typography className="text-lg font-black text-primary-container tracking-tight">{settle.amount}</Typography>
                  </View>
               </View>
            ))}
         </View>
      </View>
   );
};
