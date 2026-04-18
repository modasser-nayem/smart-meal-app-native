import { View, TouchableOpacity, Modal, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Notice } from "./GroupNoticeSection";
import { Colors } from "@/constants/colors";

interface NoticeDetailModalProps {
   notice: Notice | null;
   visible: boolean;
   onClose: () => void;
   isOwner: boolean;
   onDelete?: (id: string) => void;
}

const PIN_COLOR: Record<string, string> = {
   primary: "#F59E0B",
   info: "#3B82F6",
   success: "#22C55E",
   warning: "#EF4444",
};

const PIN_BG: Record<string, string> = {
   primary: "bg-primary/10",
   info: "bg-info/10",
   success: "bg-accent/10",
   warning: "bg-error/10",
};

const PIN_LABEL: Record<string, string> = {
   primary: "Announcement",
   info: "Info",
   success: "Update",
   warning: "Urgent",
};

const PIN_ICON: Record<string, string> = {
   primary: "bullhorn-outline",
   info: "information-outline",
   success: "check-circle-outline",
   warning: "alert-outline",
};

export const NoticeDetailModal = ({
   notice,
   visible,
   onClose,
   isOwner,
   onDelete,
}: NoticeDetailModalProps) => {
   if (!notice) return null;

   const type = notice.pinColor ?? "primary";
   const color = PIN_COLOR[type];
   const bg = PIN_BG[type];
   const label = PIN_LABEL[type];
   const icon = PIN_ICON[type];

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
         <View className="bg-surface-container rounded-t-[32px] border-t border-outline/10 max-h-[80%]">
            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-outline/30 self-center mt-3 mb-1" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-outline/10">
               {/* Type badge */}
               <View className={`flex-row items-center gap-2 px-3 py-1.5 rounded-full ${bg}`}>
                  <MaterialCommunityIcons name={icon as any} size={14} color={color} />
                  <Typography
                     className="text-xs font-black uppercase tracking-widest"
                     style={{ color }}
                  >
                     {label}
                  </Typography>
               </View>

               <View className="flex-row items-center gap-2">
                  {/* Delete — owner only */}
                  {isOwner && (
                     <TouchableOpacity
                        onPress={() => {
                           onDelete?.(notice.id);
                           onClose();
                        }}
                        activeOpacity={0.75}
                        className="w-9 h-9 rounded-full bg-error/10 items-center justify-center active:scale-90"
                     >
                        <MaterialCommunityIcons name="delete-outline" size={18} color={Colors.icon.error} />
                     </TouchableOpacity>
                  )}
                  <TouchableOpacity
                     onPress={onClose}
                     className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
                  </TouchableOpacity>
               </View>
            </View>

            <ScrollView
               contentContainerStyle={{ paddingBottom: 40 }}
               showsVerticalScrollIndicator={false}
            >
               <View className="px-6 pt-5 gap-4">
                  {/* Title */}
                  <Typography className="text-on-surface text-xl font-extrabold leading-snug">
                     {notice.title}
                  </Typography>

                  {/* Meta */}
                  <View className="flex-row items-center gap-2">
                     <MaterialCommunityIcons name="clock-outline" size={13} color={Colors.icon.dim} />
                     <Typography className="text-secondary-400 text-xs">
                        {notice.timeAgo}
                     </Typography>
                     {notice.postedBy && (
                        <>
                           <View className="w-1 h-1 rounded-full bg-outline/40" />
                           <MaterialCommunityIcons
                              name="account-outline"
                              size={13}
                              color={Colors.icon.dim}
                           />
                           <Typography className="text-secondary-400 text-xs">
                              {notice.postedBy}
                           </Typography>
                        </>
                     )}
                  </View>

                  {/* Divider */}
                  <View className="h-px bg-outline/10" />

                  {/* Body */}
                  <Typography className="text-secondary-100 text-sm leading-relaxed">
                     {notice.body}
                  </Typography>
               </View>
            </ScrollView>
         </View>
      </Modal>
   );
};
