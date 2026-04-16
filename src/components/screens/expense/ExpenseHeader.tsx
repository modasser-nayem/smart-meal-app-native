import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ExpenseHeader = () => {
   return (
      <View className="px-4 flex-row justify-between items-end mb-4">
         <View>
            <Typography className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
               Financials
            </Typography>
            <Typography className="text-on-surface font-extrabold text-3xl tracking-tight">
               Monthly Expense
            </Typography>
         </View>
         <View className="bg-primary/10 border border-primary/30 px-3 py-1 rounded-full flex-row items-center gap-1.5 mb-1">
            <MaterialCommunityIcons
               name="lock-open-outline"
               size={14}
               color="#f59e0b"
            />
            <Typography className="text-[11px] font-bold text-primary uppercase tracking-wider">
               Month Open
            </Typography>
         </View>
      </View>
   );
};
