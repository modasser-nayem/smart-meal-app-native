import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ActionItemProps {
   label: string;
   description: string;
   icon: string;
   iconBg: string;
   iconColor: string;
   onPress?: () => void;
}

const ActionItem = ({ label, description, icon, iconBg, iconColor, onPress }: ActionItemProps) => (
   <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="w-[48%] bg-surface-container p-4 rounded-2xl border border-outline/10 active:scale-95"
   >
      <View className={`w-10 h-10 rounded-xl items-center justify-center mb-3 ${iconBg}`}>
         <MaterialCommunityIcons name={icon as any} size={22} color={iconColor} />
      </View>
      <Typography className="text-on-surface font-bold text-sm leading-tight">{label}</Typography>
      <Typography className="text-secondary-400 text-[10px] mt-0.5">{description}</Typography>
   </TouchableOpacity>
);

interface QuickActionsProps {
   onLogMeal: () => void;
   onAddExpense: () => void;
   onViewExpenses: () => void;
   onMembers: () => void;
}

export const QuickActions = ({
   onLogMeal,
   onAddExpense,
   onViewExpenses,
   onMembers,
}: QuickActionsProps) => {
   return (
      <View>
         <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-3 ml-1">
            Quick Actions
         </Typography>
         <View className="flex-row flex-wrap justify-between gap-y-3">
            <ActionItem
               label="Log Meal"
               description="Record today's meals"
               icon="silverware-fork-knife"
               iconBg="bg-primary/10"
               iconColor="#F59E0B"
               onPress={onLogMeal}
            />
            <ActionItem
               label="Add Expense"
               description="Record a group cost"
               icon="card-plus-outline"
               iconBg="bg-info/10"
               iconColor="#3B82F6"
               onPress={onAddExpense}
            />
            <ActionItem
               label="Expenses"
               description="View billing & balances"
               icon="wallet-outline"
               iconBg="bg-success/10"
               iconColor="#22C55E"
               onPress={onViewExpenses}
            />
            <ActionItem
               label="Members"
               description="Group & join requests"
               icon="account-group-outline"
               iconBg="bg-secondary-600/30"
               iconColor="#94A3B8"
               onPress={onMembers}
            />
         </View>
      </View>
   );
};
