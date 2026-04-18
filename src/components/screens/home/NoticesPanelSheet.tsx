import { useState } from "react";
import { View, TouchableOpacity, Modal, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Notice } from "@/components/screens/group/GroupNoticeSection";
import { NoticeDetailModal } from "@/components/screens/group/NoticeDetailModal";

interface NoticesPanelSheetProps {
   visible: boolean;
   onClose: () => void;
   notices: Notice[];
   onSeeAll?: () => void;
}

const TYPE_COLOR: Record<string, string> = {
   primary: "#F59E0B",
   info: "#3B82F6",
   success: "#22C55E",
   warning: "#EF4444",
};

const TYPE_ICON: Record<string, string> = {
   primary: "bullhorn-outline",
   info: "information-outline",
   success: "check-circle-outline",
   warning: "alert-outline",
};

const TYPE_BG: Record<string, string> = {
   primary: "bg-primary/10",
   info: "bg-info/10",
   success: "bg-success/10",
   warning: "bg-error/10",
};

export const NoticesPanelSheet = ({
   visible,
   onClose,
   notices,
   onSeeAll,
}: NoticesPanelSheetProps) => {
   const [selected, setSelected] = useState<Notice | null>(null);

   const sorted = [...notices].sort((a, b) =>
      a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1,
   );

   return (
      <>
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
            <View className="bg-surface-container rounded-t-[32px] border-t border-outline/10 max-h-[75%]">
               {/* Handle */}
               <View className="w-10 h-1 rounded-full bg-outline/30 self-center mt-3 mb-1" />

               {/* Header */}
               <View className="flex-row items-center justify-between px-6 py-4 border-b border-outline/10">
                  <View className="flex-row items-center gap-3">
                     <View className="w-9 h-9 rounded-xl bg-primary/10 items-center justify-center">
                        <MaterialCommunityIcons name="bullhorn-outline" size={18} color="#F59E0B" />
                     </View>
                     <View>
                        <Typography className="text-on-surface text-lg font-extrabold tracking-tight">
                           Noticeboard
                        </Typography>
                        <Typography className="text-secondary-400 text-xs mt-0.5">
                           {notices.length} notice{notices.length !== 1 ? "s" : ""} from your group
                        </Typography>
                     </View>
                  </View>
                  <TouchableOpacity
                     onPress={onClose}
                     className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color="#94A3B8" />
                  </TouchableOpacity>
               </View>

               {/* Notice list */}
               {sorted.length === 0 ? (
                  <View className="items-center py-16 gap-3">
                     <View className="w-14 h-14 rounded-2xl bg-surface items-center justify-center">
                        <MaterialCommunityIcons name="bullhorn-outline" size={28} color="#334155" />
                     </View>
                     <Typography className="text-secondary-400 text-sm">
                        No notices from your group
                     </Typography>
                  </View>
               ) : (
                  <ScrollView
                     showsVerticalScrollIndicator={false}
                     contentContainerStyle={{ paddingBottom: 24 }}
                  >
                     <View className="px-5 pt-4 gap-2.5">
                        {sorted.map((notice) => {
                           const type = notice.pinColor ?? "primary";
                           const color = TYPE_COLOR[type];
                           const icon = TYPE_ICON[type];
                           const bg = TYPE_BG[type];

                           return (
                              <TouchableOpacity
                                 key={notice.id}
                                 onPress={() => setSelected(notice)}
                                 activeOpacity={0.75}
                                 className="flex-row items-start gap-3 bg-surface rounded-2xl px-4 py-4 border border-outline/10 active:bg-surface-container"
                              >
                                 {/* Icon */}
                                 <View
                                    className={`w-9 h-9 rounded-xl items-center justify-center flex-shrink-0 mt-0.5 ${bg}`}
                                 >
                                    <MaterialCommunityIcons
                                       name={icon as any}
                                       size={16}
                                       color={color}
                                    />
                                 </View>

                                 {/* Content */}
                                 <View className="flex-1 min-w-0">
                                    <View className="flex-row items-center gap-1.5 mb-0.5">
                                       {notice.isPinned && (
                                          <MaterialCommunityIcons
                                             name="pin"
                                             size={11}
                                             color="#F59E0B"
                                          />
                                       )}
                                       <Typography
                                          className="text-on-surface text-sm font-bold flex-1"
                                          numberOfLines={1}
                                       >
                                          {notice.title}
                                       </Typography>
                                    </View>
                                    <Typography
                                       className="text-secondary-300 text-xs leading-relaxed"
                                       numberOfLines={2}
                                    >
                                       {notice.body}
                                    </Typography>
                                    <View className="flex-row items-center gap-3 mt-2">
                                       {notice.postedBy && (
                                          <View className="flex-row items-center gap-1">
                                             <MaterialCommunityIcons
                                                name="account-outline"
                                                size={11}
                                                color="#64748B"
                                             />
                                             <Typography className="text-secondary-400 text-[10px]">
                                                {notice.postedBy}
                                             </Typography>
                                          </View>
                                       )}
                                       <Typography className="text-secondary-400 text-[10px]">
                                          {notice.timeAgo}
                                       </Typography>
                                    </View>
                                 </View>

                                 <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={16}
                                    color="#334155"
                                 />
                              </TouchableOpacity>
                           );
                        })}
                     </View>

                     {/* See all in Group tab */}
                     <TouchableOpacity
                        onPress={() => {
                           onClose();
                           onSeeAll?.();
                        }}
                        activeOpacity={0.75}
                        className="mx-5 mt-4 h-12 rounded-2xl border border-outline/20 items-center justify-center flex-row gap-2 active:bg-surface"
                     >
                        <Typography className="text-secondary-300 text-sm font-semibold">
                           Open Group Noticeboard
                        </Typography>
                        <MaterialCommunityIcons name="arrow-right" size={16} color="#64748B" />
                     </TouchableOpacity>
                  </ScrollView>
               )}
            </View>
         </Modal>

         {/* Full notice detail — read-only from home */}
         <NoticeDetailModal
            notice={selected}
            visible={!!selected}
            onClose={() => setSelected(null)}
            isOwner={false}
         />
      </>
   );
};
