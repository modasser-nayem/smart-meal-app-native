import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface Transaction {
   title: string;
   amount: string;
   payer: string;
   date: string;
   type: string;
   icon: string;
   color: string;
   iconColor: string;
}

interface RecentTransactionsProps {
   transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
   return (
      <View className="px-6 mb-8">
         <View className="flex-row justify-between items-center mb-4">
            <Typography className="text-sm font-bold uppercase tracking-widest text-[#ffc174]">
               Recent Transactions
            </Typography>
            <TouchableOpacity>
               <Typography className="text-[11px] font-bold text-primary uppercase tracking-widest">
                  See All
               </Typography>
            </TouchableOpacity>
         </View>

         <View className="space-y-3">
            {transactions.map((item, i) => (
               <TouchableOpacity
                  key={i}
                  className="bg-surface-container rounded-2xl p-4 flex-row items-center gap-4 border border-outline/5 active:bg-surface-container-high transition-all mb-3"
               >
                  <View className={cn("w-14 h-14 rounded-2xl items-center justify-center", item.color)}>
                     <MaterialCommunityIcons name={item.icon as any} size={28} color={item.iconColor} />
                  </View>
                  <View className="flex-1">
                     <Typography className="text-on-surface font-bold text-base">{item.title}</Typography>
                     <View className="flex-row items-center gap-2 mt-1">
                        <Typography className="text-on-surface text-[10px] font-bold">{item.payer}</Typography>
                        <Typography className="text-outline">•</Typography>
                        <Typography className="text-on-surface text-[10px] font-medium">{item.date}</Typography>
                     </View>
                  </View>
                  <View className="items-end">
                     <Typography className="text-on-surface font-bold text-lg">{item.amount}</Typography>
                     <View className="px-2 py-0.5 rounded-md bg-surface-container mt-1">
                        <Typography className="text-[8px] font-black uppercase text-primary tracking-tighter">{item.type}</Typography>
                     </View>
                  </View>
               </TouchableOpacity>
            ))}
         </View>
      </View>
   );
};
