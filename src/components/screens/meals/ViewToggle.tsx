import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
   activeTab: "daily" | "monthly";
   onTabChange: (tab: "daily" | "monthly") => void;
}

export const ViewToggle = ({ activeTab, onTabChange }: ViewToggleProps) => {
   return (
      <View className="px-6 mb-4">
         <View className="flex-row bg-surface-container rounded-2xl p-1.5 border border-outline/10">
            <TouchableOpacity
               onPress={() => onTabChange("daily")}
               className={cn(
                  "flex-1 py-2.5 rounded-xl items-center justify-center",
                  activeTab === "daily" ? "bg-primary" : "bg-transparent",
               )}
            >
               <Typography
                  className={cn(
                     "font-bold text-sm tracking-wide uppercase",
                     activeTab === "daily" ? "text-background" : "text-secondary-300",
                  )}
               >
                  Daily View
               </Typography>
            </TouchableOpacity>

            <TouchableOpacity
               onPress={() => onTabChange("monthly")}
               className={cn(
                  "flex-1 py-2.5 rounded-xl items-center justify-center",
                  activeTab === "monthly" ? "bg-primary" : "bg-transparent",
               )}
            >
               <Typography
                  className={cn(
                     "font-bold text-sm tracking-wide uppercase",
                     activeTab === "monthly" ? "text-background" : "text-secondary-300",
                  )}
               >
                  Monthly View
               </Typography>
            </TouchableOpacity>
         </View>
      </View>
   );
};
