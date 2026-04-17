import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";

export interface Notice {
   id: string;
   title: string;
   body: string;
   timeAgo: string;
   pinColor?: "primary" | "info" | "success" | "warning";
}

interface GroupNoticeSectionProps {
   notices: Notice[];
   isOwner: boolean;
   onNoticePress?: (id: string) => void;
   onSeeAll?: () => void;
   onPostNotice?: () => void;
}

const PIN_COLOR: Record<string, string> = {
   primary: "#F59E0B",
   info: "#3B82F6",
   success: "#22C55E",
   warning: "#F59E0B",
};

export const GroupNoticeSection = ({
   notices,
   isOwner,
   onNoticePress,
   onSeeAll,
   onPostNotice,
}: GroupNoticeSectionProps) => {
   return (
      <View>
         {/* Section header */}
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
               Notices
            </Typography>
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
               <Typography className="text-primary text-[11px] font-bold uppercase tracking-widest">
                  See All
               </Typography>
            </TouchableOpacity>
         </View>

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
            {notices.length === 0 ? (
               <View className="items-center py-10 gap-3">
                  <View className="w-12 h-12 rounded-2xl bg-surface items-center justify-center">
                     <MaterialCommunityIcons name="bullhorn-outline" size={24} color="#334155" />
                  </View>
                  <Typography className="text-secondary-400 text-sm">No notices yet</Typography>
               </View>
            ) : (
               notices.map((notice, index) => {
                  const pinColor = PIN_COLOR[notice.pinColor ?? "primary"];
                  return (
                     <TouchableOpacity
                        key={notice.id}
                        onPress={() => onNoticePress?.(notice.id)}
                        activeOpacity={0.75}
                        className={`flex-row items-start gap-3 px-4 py-4 active:bg-surface ${
                           index < notices.length - 1 ? "border-b border-outline/10" : ""
                        }`}
                     >
                        {/* Color pin */}
                        <View
                           className="w-1 self-stretch rounded-full mt-0.5 flex-shrink-0"
                           style={{ backgroundColor: pinColor }}
                        />
                        <View className="flex-1">
                           <View className="flex-row items-start justify-between gap-2 mb-1">
                              <Typography className="text-on-surface text-sm font-bold flex-1 leading-snug">
                                 {notice.title}
                              </Typography>
                              <Typography className="text-secondary-400 text-[10px] flex-shrink-0">
                                 {notice.timeAgo}
                              </Typography>
                           </View>
                           <Typography
                              className="text-secondary-300 text-xs leading-relaxed"
                              numberOfLines={2}
                           >
                              {notice.body}
                           </Typography>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={16} color="#334155" />
                     </TouchableOpacity>
                  );
               })
            )}

            {/* Post notice CTA */}
            {isOwner && (
               <>
                  <View className="h-px bg-outline/10 mx-4" />
                  <TouchableOpacity
                     onPress={onPostNotice}
                     activeOpacity={0.75}
                     className="flex-row items-center gap-3 px-4 py-4 active:bg-surface"
                  >
                     <View className="w-9 h-9 rounded-xl bg-primary/10 items-center justify-center">
                        <MaterialCommunityIcons name="plus" size={18} color="#F59E0B" />
                     </View>
                     <Typography className="text-primary text-sm font-bold flex-1">
                        Post New Notice
                     </Typography>
                     <MaterialCommunityIcons name="arrow-right" size={16} color="#F59E0B" />
                  </TouchableOpacity>
               </>
            )}
         </View>
      </View>
   );
};
