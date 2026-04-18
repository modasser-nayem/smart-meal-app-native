import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/colors";

interface ExpenseOwnerActionsProps {
   isOwner: boolean;
   isMonthOpen: boolean;
   onCloseMonth?: () => void;
   onExport?: () => void;
}

export const ExpenseOwnerActions = ({
   isOwner,
   isMonthOpen,
   onCloseMonth,
   onExport,
}: ExpenseOwnerActionsProps) => {
   const { t } = useTranslation("expense");
   if (!isOwner) return null;

   return (
      <View className="px-5 mt-5">
         <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-3 ml-1">
            {t("ownerActions.title")}
         </Typography>
         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline">
            <TouchableOpacity
               onPress={onExport}
               activeOpacity={0.75}
               className="flex-row items-center gap-3 px-4 py-4 border-b border-outline active:bg-surface"
            >
               <View className="w-10 h-10 rounded-xl bg-info/10 items-center justify-center">
                  <MaterialCommunityIcons
                     name="export-variant"
                     size={20}
                     color={Colors.icon.info}
                  />
               </View>
               <View className="flex-1">
                  <Typography className="text-on-surface font-semibold text-[15px]">
                     {t("ownerActions.exportReport")}
                  </Typography>
                  <Typography className="text-secondary-400 text-xs mt-0.5">
                     {t("ownerActions.exportDesc")}
                  </Typography>
               </View>
               <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.icon.muted} />
            </TouchableOpacity>

            {isMonthOpen && (
               <TouchableOpacity
                  onPress={onCloseMonth}
                  activeOpacity={0.75}
                  className="flex-row items-center gap-3 px-4 py-4 active:bg-surface"
               >
                  <View className="w-10 h-10 rounded-xl bg-error/10 items-center justify-center">
                     <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        color={Colors.icon.error}
                     />
                  </View>
                  <View className="flex-1">
                     <Typography className="text-error font-bold text-[15px]">
                        {t("ownerActions.closeMonth")}
                     </Typography>
                     <Typography className="text-secondary-400 text-xs mt-0.5">
                        {t("ownerActions.closeDesc")}
                     </Typography>
                  </View>
                  <MaterialCommunityIcons
                     name="chevron-right"
                     size={18}
                     color={Colors.icon.muted}
                  />
               </TouchableOpacity>
            )}
         </View>
      </View>
   );
};
