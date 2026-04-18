import { View, TouchableOpacity, Modal, Image, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Member, MemberRole } from "./GroupMembersSection";
import { Colors } from "@/constants/colors";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

interface MemberInfoModalProps {
   member: Member | null;
   visible: boolean;
   onClose: () => void;
   isOwner: boolean;
   onRemoveMember?: (id: string) => void;
   onChangeRole?: (id: string) => void;
}

const ROLE_CONFIG: Record<MemberRole, { bg: string; text: string; label: string; color: string }> =
   {
      Owner: {
         bg: "bg-primary/10",
         text: "text-primary",
         label: "Owner 👑",
         color: Colors.icon.primary,
      },
      Manager: { bg: "bg-info/10", text: "text-info", label: "Manager", color: Colors.icon.info },
      Member: {
         bg: "bg-surface",
         text: "text-secondary-300",
         label: "Member",
         color: Colors.icon.subtle,
      },
   };

export const MemberInfoModal = ({
   member,
   visible,
   onClose,
   isOwner,
   onRemoveMember,
   onChangeRole,
}: MemberInfoModalProps) => {
   if (!member) return null;

   const { t } = useTranslation("group");
   const { format } = useCurrencyFormat();
   const roleStyle = ROLE_CONFIG[member.role];

   // Mock stats — replace with real API data
   const MOCK_STATS = {
      totalMeals: 28,
      thisMonthMeals: 14,
      totalPaid: format(4200),
      balance: `+${format(144)}`,
      isSurplus: true,
      joinedDate: "March 2025",
   };

   return (
      <Modal
         visible={visible}
         transparent
         animationType="slide"
         onRequestClose={onClose}
         statusBarTranslucent
      >
         {/* Backdrop */}
         <TouchableOpacity className="flex-1 bg-black/60" activeOpacity={1} onPress={onClose} />

         {/* Sheet */}
         <View className="bg-surface-container rounded-t-[32px] border-t border-outline/10">
            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-outline/30 self-center mt-3 mb-1" />

            <ScrollView
               contentContainerStyle={{ paddingBottom: 40 }}
               showsVerticalScrollIndicator={false}
            >
               {/* Header */}
               <View className="flex-row items-center justify-between px-6 py-4">
                  <Typography className="text-on-surface text-lg font-extrabold tracking-tight">
                     {t("members.info.title")}
                  </Typography>
                  <TouchableOpacity
                     onPress={onClose}
                     className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
                  </TouchableOpacity>
               </View>

               {/* Profile section */}
               <View className="items-center px-6 pb-6 border-b border-outline/10">
                  {/* Avatar */}
                  <View className="relative mb-4">
                     {member.avatar ? (
                        <View className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-primary/30">
                           <Image
                              source={{ uri: member.avatar }}
                              className="w-full h-full"
                              resizeMode="cover"
                           />
                        </View>
                     ) : (
                        <View className="w-20 h-20 rounded-full bg-surface border-[3px] border-outline/20 items-center justify-center">
                           <Typography className="text-on-surface font-extrabold text-2xl">
                              {member.initials}
                           </Typography>
                        </View>
                     )}
                     {/* Online dot */}
                     <View
                        className={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-surface-container ${
                           member.isActive ? "bg-accent" : "bg-outline"
                        }`}
                     />
                  </View>

                  <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
                     {member.name}
                  </Typography>
                  <Typography className="text-secondary-400 text-sm mt-0.5">
                     {member.email}
                  </Typography>

                  {/* Role + status row */}
                  <View className="flex-row items-center gap-3 mt-3">
                     <View
                        className={`px-3 py-1.5 rounded-full border border-outline/15 ${roleStyle.bg}`}
                     >
                        <Typography
                           className={`text-xs font-black uppercase tracking-widest ${roleStyle.text}`}
                        >
                           {roleStyle.label}
                        </Typography>
                     </View>
                     <View
                        className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full ${
                           member.isActive ? "bg-accent/10" : "bg-surface"
                        }`}
                     >
                        <View
                           className={`w-1.5 h-1.5 rounded-full ${
                              member.isActive ? "bg-accent" : "bg-outline"
                           }`}
                        />
                        <Typography
                           className={`text-xs font-bold ${
                              member.isActive ? "text-success" : "text-secondary-400"
                           }`}
                        >
                           {member.isActive ? t("members.info.active") : t("members.info.inactive")}
                        </Typography>
                     </View>
                  </View>
               </View>

               {/* Stats grid */}
               <View className="px-6 pt-5 pb-2">
                  <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-3">
                     {t("members.info.thisMonth")}
                  </Typography>
                  <View className="flex-row gap-3 mb-3">
                     <View className="flex-1 bg-surface rounded-2xl p-4 border border-outline/10">
                        <Typography className="text-primary font-extrabold text-2xl">
                           {MOCK_STATS.thisMonthMeals}
                        </Typography>
                        <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">
                           {t("members.info.meals")}
                        </Typography>
                     </View>
                     <View className="flex-1 bg-surface rounded-2xl p-4 border border-outline/10">
                        <Typography className="text-on-surface font-extrabold text-xl">
                           {MOCK_STATS.totalPaid}
                        </Typography>
                        <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">
                           {t("members.info.paid")}
                        </Typography>
                     </View>
                     <View className="flex-1 bg-surface rounded-2xl p-4 border border-outline/10">
                        <Typography
                           className={`font-extrabold text-xl ${
                              MOCK_STATS.isSurplus ? "text-success" : "text-error"
                           }`}
                        >
                           {MOCK_STATS.balance}
                        </Typography>
                        <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">
                           {t("members.info.balance")}
                        </Typography>
                     </View>
                  </View>

                  {/* Joined date */}
                  <View className="flex-row items-center gap-3 bg-surface rounded-2xl px-4 py-3 border border-outline/10">
                     <MaterialCommunityIcons
                        name="calendar-account-outline"
                        size={18}
                        color={Colors.icon.dim}
                     />
                     <Typography className="text-secondary-300 text-sm">
                        {t("members.info.memberSince")}{" "}
                        <Typography className="text-on-surface font-bold text-sm">
                           {MOCK_STATS.joinedDate}
                        </Typography>
                     </Typography>
                  </View>
               </View>

               {/* Owner actions */}
               {isOwner && member.role !== "Owner" && (
                  <View className="px-6 pt-4 gap-3">
                     <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-1">
                        {t("members.info.actions")}
                     </Typography>
                     <TouchableOpacity
                        onPress={() => onChangeRole?.(member.id)}
                        activeOpacity={0.75}
                        className="flex-row items-center gap-3 bg-surface-container rounded-2xl px-4 py-4 border border-outline/10 active:bg-surface"
                     >
                        <View className="w-10 h-10 rounded-xl bg-info/10 items-center justify-center">
                           <MaterialCommunityIcons
                              name="shield-account-outline"
                              size={20}
                              color={Colors.icon.info}
                           />
                        </View>
                        <View className="flex-1">
                           <Typography className="text-on-surface font-semibold text-[15px]">
                              {t("members.info.changeRole")}
                           </Typography>
                           <Typography className="text-secondary-400 text-xs mt-0.5">
                              Promote to Manager or demote to Member
                           </Typography>
                        </View>
                        <MaterialCommunityIcons
                           name="chevron-right"
                           size={18}
                           color={Colors.icon.muted}
                        />
                     </TouchableOpacity>

                     <TouchableOpacity
                        onPress={() => onRemoveMember?.(member.id)}
                        activeOpacity={0.75}
                        className="flex-row items-center gap-3 bg-error/5 rounded-2xl px-4 py-4 border border-error/15 active:bg-error/10"
                     >
                        <View className="w-10 h-10 rounded-xl bg-error/10 items-center justify-center">
                           <MaterialCommunityIcons
                              name="account-remove-outline"
                              size={20}
                              color={Colors.icon.error}
                           />
                        </View>
                        <View className="flex-1">
                           <Typography className="text-error font-bold text-[15px]">
                              {t("members.info.removeMember")}
                           </Typography>
                           <Typography className="text-secondary-400 text-xs mt-0.5">
                              Remove from this group permanently
                           </Typography>
                        </View>
                     </TouchableOpacity>
                  </View>
               )}
            </ScrollView>
         </View>
      </Modal>
   );
};
