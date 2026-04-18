import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Notice } from "@/components/screens/group/GroupNoticeSection";
import { NoticeDetailModal } from "@/components/screens/group/NoticeDetailModal";
import { Colors } from "@/constants/colors";

interface HomeNoticesProps {
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
   success: "bg-accent/10",
   warning: "bg-error/10",
};

export const HomeNotices = ({ notices, onSeeAll }: HomeNoticesProps) => {
   const [selected, setSelected] = useState<Notice | null>(null);

   // Pinned first, then show max 2
   const visible = [...notices]
      .sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1))
      .slice(0, 2);

   // Don't render the section at all if there are no notices
   if (notices.length === 0) return null;

   return (
      <View>
         {/* Section header */}
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <View className="flex-row items-center gap-2">
               <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
                  Noticeboard
               </Typography>
               {notices.length > 2 && (
                  <View className="bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                     <Typography className="text-primary text-[10px] font-black">
                        +{notices.length - 2} more
                     </Typography>
                  </View>
               )}
            </View>
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
               <Typography className="text-primary text-[11px] font-bold uppercase tracking-widest">
                  See All
               </Typography>
            </TouchableOpacity>
         </View>

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
            {visible.map((notice, index) => {
               const type = notice.pinColor ?? "primary";
               const color = TYPE_COLOR[type];
               const icon = TYPE_ICON[type];
               const bg = TYPE_BG[type];

               return (
                  <TouchableOpacity
                     key={notice.id}
                     onPress={() => setSelected(notice)}
                     activeOpacity={0.75}
                     className={`flex-row items-center gap-3 px-4 py-4 active:bg-surface ${
                        index < visible.length - 1 ? "border-b border-outline/10" : ""
                     }`}
                  >
                     {/* Type icon */}
                     <View
                        className={`w-9 h-9 rounded-xl items-center justify-center flex-shrink-0 ${bg}`}
                     >
                        <MaterialCommunityIcons name={icon as any} size={16} color={color} />
                     </View>

                     {/* Content */}
                     <View className="flex-1 min-w-0">
                        <View className="flex-row items-center gap-1.5 mb-0.5">
                           {notice.isPinned && (
                              <MaterialCommunityIcons name="pin" size={11} color={Colors.icon.primary} />
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
                           numberOfLines={1}
                        >
                           {notice.body}
                        </Typography>
                     </View>

                     {/* Time + chevron */}
                     <View className="items-end gap-1 flex-shrink-0">
                        <Typography className="text-secondary-400 text-[10px]">
                           {notice.timeAgo}
                        </Typography>
                        <MaterialCommunityIcons name="chevron-right" size={14} color={Colors.icon.muted} />
                     </View>
                  </TouchableOpacity>
               );
            })}
         </View>

         {/* Notice detail — read-only from home (isOwner=false, no delete) */}
         <NoticeDetailModal
            notice={selected}
            visible={!!selected}
            onClose={() => setSelected(null)}
            isOwner={false}
         />
      </View>
   );
};
