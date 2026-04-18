import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/colors";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

interface ExpenseMetricsProps {
   totalMeals: number;
   mealRate: number;
   totalExpense: number;
   eligibleMembers: number;
}

const MetricTile = ({
   label,
   value,
   icon,
   iconColor,
   accent,
}: {
   label: string;
   value: string;
   icon: string;
   iconColor: string;
   accent?: boolean;
}) => (
   <View
      className={`flex-1 bg-surface-container rounded-2xl p-4 ${accent ? "border-l-[3px] border-primary" : ""}`}
   >
      <MaterialCommunityIcons name={icon as any} size={18} color={iconColor} />
      <Typography className="text-on-surface text-xl font-extrabold mt-2 tracking-tight">
         {value}
      </Typography>
      <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">
         {label}
      </Typography>
   </View>
);

export const ExpenseMetrics = ({
   totalMeals,
   mealRate,
   totalExpense,
   eligibleMembers,
}: ExpenseMetricsProps) => {
   const { t } = useTranslation("expense");
   const { format } = useCurrencyFormat();

   return (
      <View className="px-5 mt-4">
         <View className="flex-row gap-3 mb-3">
            <MetricTile
               label={t("stats.totalMeals")}
               value={String(totalMeals)}
               icon="silverware-fork-knife"
               iconColor={Colors.icon.primary}
               accent
            />
            <MetricTile
               label={t("stats.mealRate")}
               value={`${format(Number(mealRate.toFixed(0)))}`}
               icon="trending-up"
               iconColor={Colors.icon.info}
            />
         </View>
         <View className="flex-row gap-3">
            <MetricTile
               label={t("stats.totalExpense")}
               value={`${format(totalExpense)}`}
               icon="wallet-outline"
               iconColor={Colors.icon.error}
            />
            <MetricTile
               label={t("stats.members")}
               value={`${eligibleMembers} ${t("stats.eligible")}`}
               icon="account-group-outline"
               iconColor={Colors.icon.success}
            />
         </View>
      </View>
   );
};
