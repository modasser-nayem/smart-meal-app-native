import { View, TouchableOpacity, ScrollView } from "react-native";
import { Typography } from "@/components/ui/Typography";

export type ExpenseFilter = "all" | "mine" | "meal" | "group";

interface ExpenseFilterTabsProps {
   active: ExpenseFilter;
   onChange: (filter: ExpenseFilter) => void;
}

const TABS: { key: ExpenseFilter; label: string }[] = [
   { key: "all", label: "All" },
   { key: "mine", label: "Mine" },
   { key: "meal", label: "Meal" },
   { key: "group", label: "Group" },
];

export const ExpenseFilterTabs = ({ active, onChange }: ExpenseFilterTabsProps) => {
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
                  className={`px-5 py-2 rounded-full border ${
                     isActive ? "bg-primary border-primary" : "bg-surface border-outline/20"
                  }`}
               >
                  <Typography
                     className={`text-sm font-bold ${
                        isActive ? "text-background" : "text-secondary-300"
                     }`}
                  >
                     {tab.label}
                  </Typography>
               </TouchableOpacity>
            );
         })}
      </ScrollView>
   );
};
