import { View, TouchableOpacity, ScrollView } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { useTranslation } from "react-i18next";

export type ExpenseFilter = "all" | "mine" | "meal" | "group";

interface ExpenseFilterTabsProps {
   active: ExpenseFilter;
   onChange: (filter: ExpenseFilter) => void;
}

export const ExpenseFilterTabs = ({ active, onChange }: ExpenseFilterTabsProps) => {
   const { t } = useTranslation("expense");

   const TABS: { key: ExpenseFilter; label: string }[] = [
      { key: "all", label: t("filters.all") },
      { key: "mine", label: t("filters.mine") },
      { key: "meal", label: t("filters.meal") },
      { key: "group", label: t("filters.group") },
   ];

   return (
      <ScrollView
         horizontal
         showsHorizontalScrollIndicator={false}
         className="px-5"
         contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
      >
         {TABS.map((tab) => {
            const isActive = active === tab.key;
            return (
               <TouchableOpacity
                  key={tab.key}
                  onPress={() => onChange(tab.key)}
                  activeOpacity={0.75}
                  className={`px-5 py-2 rounded-full border ${isActive ? "bg-primary border-primary" : "bg-surface border-outline/20"}`}
               >
                  <Typography
                     className={`text-sm font-bold ${isActive ? "text-background" : "text-secondary-300"}`}
                  >
                     {tab.label}
                  </Typography>
               </TouchableOpacity>
            );
         })}
      </ScrollView>
   );
};
