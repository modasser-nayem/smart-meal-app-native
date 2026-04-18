import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/colors";

interface ActiveGroupCardProps {
   groupName: string;
   memberCount: number;
   month: string;
   userRole: string;
   isMonthOpen?: boolean;
   onSwitchGroup?: () => void;
   onGoToGroup?: () => void;
}

export const ActiveGroupCard = ({
   groupName,
   memberCount,
   month,
   userRole,
   isMonthOpen = true,
   onSwitchGroup,
   onGoToGroup,
}: ActiveGroupCardProps) => {
   const { t } = useTranslation("home");

   return (
      <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
         <View className="h-[3px] bg-primary w-full" />
         <View className="px-5 py-4">
            <View className="flex-row items-start justify-between mb-3">
               <View className="flex-1">
                  <Typography className="text-[10px] text-secondary-300 uppercase font-bold tracking-widest mb-0.5">
                     {t("sections.activeGroup")}
                  </Typography>
                  <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
                     {groupName}
                  </Typography>
               </View>
               <TouchableOpacity
                  onPress={onSwitchGroup}
                  activeOpacity={0.75}
                  className="flex-row items-center gap-1 bg-surface border border-outline/20 px-3 py-1.5 rounded-xl active:scale-95"
               >
                  <MaterialCommunityIcons
                     name="swap-horizontal"
                     size={14}
                     color={Colors.icon.subtle}
                  />
                  <Typography className="text-secondary-300 text-xs font-bold">
                     {t("group.switchGroup")}
                  </Typography>
               </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-4 mb-4">
               <View className="flex-row items-center gap-1.5">
                  <MaterialCommunityIcons
                     name="account-group-outline"
                     size={14}
                     color={Colors.icon.dim}
                  />
                  <Typography className="text-secondary-300 text-sm">
                     {t("group.members", { count: memberCount })}
                  </Typography>
               </View>
               <View className="w-1 h-1 rounded-full bg-outline/40" />
               <View className="flex-row items-center gap-1.5">
                  <MaterialCommunityIcons
                     name="calendar-month-outline"
                     size={14}
                     color={Colors.icon.dim}
                  />
                  <Typography className="text-secondary-300 text-sm">{month}</Typography>
               </View>
               <View className="w-1 h-1 rounded-full bg-outline/40" />
               <View
                  className={`flex-row items-center gap-1 px-2 py-0.5 rounded-full ${isMonthOpen ? "bg-primary/10" : "bg-surface"}`}
               >
                  <MaterialCommunityIcons
                     name={isMonthOpen ? "lock-open-outline" : "lock-outline"}
                     size={11}
                     color={isMonthOpen ? Colors.icon.primary : Colors.icon.dim}
                  />
                  <Typography
                     className={`text-[10px] font-black uppercase tracking-widest ${isMonthOpen ? "text-primary" : "text-secondary-400"}`}
                  >
                     {isMonthOpen ? t("group.billingOpen") : t("group.billingClosed")}
                  </Typography>
               </View>
            </View>

            <View className="flex-row items-center justify-between">
               <View className="bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                  <Typography className="text-primary text-[10px] font-black uppercase tracking-widest">
                     {userRole}
                  </Typography>
               </View>
               <TouchableOpacity
                  onPress={onGoToGroup}
                  activeOpacity={0.75}
                  className="flex-row items-center gap-1.5 active:opacity-70"
               >
                  <Typography className="text-primary text-xs font-bold">
                     {t("group.openGroup")}
                  </Typography>
                  <MaterialCommunityIcons
                     name="arrow-right"
                     size={14}
                     color={Colors.icon.primary}
                  />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};
