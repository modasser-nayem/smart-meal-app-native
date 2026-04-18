import { useState } from "react";
import { View, TouchableOpacity, Modal, Switch } from "react-native";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { PendingItem } from "./GroupRequestsSection";
import { Colors } from "@/constants/colors";

interface AcceptRequestModalProps {
   item: PendingItem | null;
   visible: boolean;
   onClose: () => void;
   onAccept: (id: string, includeMonth: boolean) => void;
}

export const AcceptRequestModal = ({
   item,
   visible,
   onClose,
   onAccept,
}: AcceptRequestModalProps) => {
   const [includeMonth, setIncludeMonth] = useState(false);

   const handleAccept = () => {
      if (!item) return;
      onAccept(item.id, includeMonth);
      setIncludeMonth(false);
      onClose();
   };

   const handleClose = () => {
      setIncludeMonth(false);
      onClose();
   };

   if (!item) return null;

   const { t } = useTranslation("group");

   return (
      <Modal
         visible={visible}
         transparent
         animationType="slide"
         onRequestClose={handleClose}
         statusBarTranslucent
      >
         {/* Backdrop */}
         <TouchableOpacity className="flex-1 bg-black/60" activeOpacity={1} onPress={handleClose} />

         {/* Sheet */}
         <View className="bg-surface-container rounded-t-[32px] px-6 pt-4 pb-12 border-t border-outline/10">
            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-outline/30 self-center mb-5" />

            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
               <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
                  {t("requests.acceptModal.title")}
               </Typography>
               <TouchableOpacity
                  onPress={handleClose}
                  className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
               >
                  <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
               </TouchableOpacity>
            </View>

            {/* Person card */}
            <View className="flex-row items-center gap-3 bg-surface rounded-2xl px-4 py-4 border border-outline/10 mb-6">
               <View className="w-12 h-12 rounded-full bg-surface-container border border-outline/20 items-center justify-center">
                  <Typography className="text-on-surface font-extrabold text-lg">
                     {item.initials}
                  </Typography>
               </View>
               <View className="flex-1">
                  <Typography className="text-on-surface font-bold text-[15px]">
                     {item.name}
                  </Typography>
                  <Typography className="text-secondary-400 text-xs mt-0.5">
                     {item.email}
                  </Typography>
               </View>
               <View className="bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                  <Typography className="text-primary text-[9px] font-black uppercase tracking-widest">
                     {t("requests.joinRequest")}
                  </Typography>
               </View>
            </View>

            {/* Include in current month toggle */}
            <View className="bg-surface rounded-2xl border border-outline/15 overflow-hidden mb-6">
               <View className="flex-row items-center justify-between px-4 py-4">
                  <View className="flex-1 pr-4">
                     <Typography className="text-on-surface font-semibold text-[15px]">
                        {t("requests.acceptModal.includeMonth")}
                     </Typography>
                     <Typography className="text-secondary-400 text-xs mt-0.5 leading-relaxed">
                        {t("requests.acceptModal.includeMonthDesc")}
                     </Typography>
                  </View>
                  <Switch
                     value={includeMonth}
                     onValueChange={setIncludeMonth}
                     trackColor={{ false: "#334155", true: "#F59E0B" }}
                     thumbColor={includeMonth ? "#0F172A" : "#94A3B8"}
                  />
               </View>

               {/* Month indicator */}
               <View
                  className={`mx-4 mb-4 px-3 py-2.5 rounded-xl flex-row items-center gap-2 ${
                     includeMonth
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-surface-container border border-outline/10"
                  }`}
               >
                  <MaterialCommunityIcons
                     name="calendar-month-outline"
                     size={15}
                     color={includeMonth ? "#F59E0B" : "#64748B"}
                  />
                  <Typography
                     className={`text-xs font-bold ${
                        includeMonth ? "text-primary" : "text-secondary-400"
                     }`}
                  >
                     {includeMonth
                        ? t("requests.acceptModal.billingThisMonth", { month: "April 2026" })
                        : t("requests.acceptModal.billingNextMonth", { month: "May 2026" })}
                  </Typography>
               </View>
            </View>

            {/* Actions */}
            <View className="gap-3">
               <TouchableOpacity
                  onPress={handleAccept}
                  activeOpacity={0.85}
                  className="h-14 bg-success rounded-2xl items-center justify-center flex-row gap-2 active:opacity-80"
               >
                  <MaterialCommunityIcons
                     name="check-circle"
                     size={20}
                     color={Colors.icon.onPrimary}
                  />
                  <Typography className="text-background font-bold text-base">
                     {t("requests.acceptModal.acceptMember")}
                  </Typography>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={handleClose}
                  activeOpacity={0.7}
                  className="h-12 items-center justify-center rounded-2xl border border-outline/20 active:bg-surface"
               >
                  <Typography className="text-secondary-300 font-semibold text-sm">
                     {t("common.cancel")}
                  </Typography>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
};
