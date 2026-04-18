import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/colors";

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
   const { t } = useTranslation("home");

   return (
      <View>
         <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-3 ml-1">
            {t("sections.quickActions")}
         </Typography>
         <View className="flex-row flex-wrap justify-between gap-y-3">
            <ActionItem
               label={t("quickActions.logMeal")}
               description={t("quickActions.logMealDesc")}
               icon="silverware-fork-knife"
               iconBg="bg-primary/10"
               iconColor={Colors.icon.primary}
               onPress={onLogMeal}
            />
            <ActionItem
               label={t("quickActions.addExpense")}
               description={t("quickActions.addExpenseDesc")}
               icon="card-plus-outline"
               iconBg="bg-info/10"
               iconColor={Colors.icon.info}
               onPress={onAddExpense}
            />
            <ActionItem
               label={t("quickActions.expenses")}
               description={t("quickActions.expensesDesc")}
               icon="wallet-outline"
               iconBg="bg-success/10"
               iconColor={Colors.icon.success}
               onPress={onViewExpenses}
            />
            <ActionItem
               label={t("quickActions.members")}
               description={t("quickActions.membersDesc")}
               icon="account-group-outline"
               iconBg="bg-secondary-600/30"
               iconColor={Colors.icon.subtle}
               onPress={onMembers}
            />
         </View>
      </View>
   );
};
