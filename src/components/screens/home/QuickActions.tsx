import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface ActionItemProps {
   label: string;
   icon: string;
   color: string;
   iconColor: string;
   onPress?: () => void;
}

const ActionItem = ({
   label,
   icon,
   color,
   iconColor,
   onPress,
}: ActionItemProps) => {
   return (
      <TouchableOpacity
         onPress={onPress}
         className="w-[48%] bg-surface-container p-4 rounded-2xl flex-col gap-3 active:scale-95"
      >
         <View
            className={cn(
               "w-10 h-10 rounded-xl items-center justify-center",
               color,
            )}
         >
            <MaterialCommunityIcons
               name={icon as any}
               size={24}
               color={iconColor}
            />
         </View>
         <Typography className="font-bold text-sm text-white">
            {label}
         </Typography>
      </TouchableOpacity>
   );
};

interface QuickActionsProps {
   onLogMeal: () => void;
   onAddExpense: () => void;
   onViewSummary: () => void;
   onMembers: () => void;
}

export const QuickActions = ({
   onLogMeal,
   onAddExpense,
   onViewSummary,
   onMembers,
}: QuickActionsProps) => {
   return (
      <View className="my-8 flex-row flex-wrap justify-between gap-y-4">
         <ActionItem
            label="Log Meal"
            icon="silverware-fork-knife"
            color="bg-primary/10"
            iconColor="#F59E0B"
            onPress={onLogMeal}
         />
         <ActionItem
            label="Add Expense"
            icon="card-plus-outline"
            color="bg-secondary-container/10"
            iconColor="#3B82F6"
            onPress={onAddExpense}
         />
         <ActionItem
            label="View Summary"
            icon="chart-bar"
            color="bg-purple-500/10"
            iconColor="#A855F7"
            onPress={onViewSummary}
         />
         <ActionItem
            label="Members"
            icon="account-group"
            color="bg-tertiary-container/10"
            iconColor="#22C55E"
            onPress={onMembers}
         />
      </View>
   );
};
