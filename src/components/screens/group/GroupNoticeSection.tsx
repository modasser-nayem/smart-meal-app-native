import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";

interface Notice {
   id: string;
   title: string;
   body: string;
   timeAgo: string;
   pinColor?: string;
}

interface GroupNoticeSectionProps {
   notices: Notice[];
   isOwner: boolean;
   onNoticePress?: (id: string) => void;
   onSeeAll?: () => void;
   onPostNotice?: () => void;
}

const PIN_COLORS: Record<string, string> = {
   amber: "#F59E0B",
   blue: "#3B82F6",
   green: "#22C55E",
};

export const GroupNoticeSection = ({
   notices,
   isOwner,
   onNoticePress,
   onSeeAll,
   onPostNotice,
}: GroupNoticeSectionProps) => {
   return (
      <View className="gap-3">
         {/* Section header */}
         <View className="flex-row items-center justify-between px-1">
            <View className="flex-row items-center gap-2">
               <MaterialCommunityIcons
                  name="bullhorn-outline"
                  size={14}
                  color="#a08e7a"
               />
               <Typography className="text-outline text-[11px] font-bold uppercase tracking-[0.18em]">
                  Group Notices
               </Typography>
            </View>
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
               <Typography className="text-primary text-[11px] font-bold uppercase tracking-widest">
                  See All
               </Typography>
            </TouchableOpacity>
         </View>

         <Card padding="none" className="bg-surface-container rounded-2xl overflow-hidden border border-outline/5">
            {notices.map((notice, index) => {
               const pinColor = PIN_COLORS[notice.pinColor ?? "amber"] ?? PIN_COLORS.amber;
               const isLast = index === notices.length - 1;
               return (
                  <React.Fragment key={notice.id}>
                     <TouchableOpacity
                        onPress={() => onNoticePress?.(notice.id)}
                        activeOpacity={0.75}
                        className="flex-row items-start gap-3 px-4 py-4 active:bg-surface-container-high"
                     >
                        {/* Coloured pin */}
                        <View
                           className="w-1 self-stretch rounded-full mt-0.5 flex-shrink-0"
                           style={{ backgroundColor: pinColor }}
                        />
                        <View className="flex-1 gap-0.5">
                           <View className="flex-row justify-between items-start gap-2">
                              <Typography className="text-on-surface text-sm font-bold flex-1 leading-snug">
                                 {notice.title}
                              </Typography>
                              <Typography className="text-outline text-[10px] font-medium flex-shrink-0">
                                 {notice.timeAgo}
                              </Typography>
                           </View>
                           <Typography
                              className="text-on-surface-variant text-xs leading-relaxed"
                              numberOfLines={2}
                           >
                              {notice.body}
                           </Typography>
                        </View>
                        <MaterialCommunityIcons
                           name="chevron-right"
                           size={18}
                           color="#534434"
                        />
                     </TouchableOpacity>
                     {!isLast && (
                        <View className="h-px bg-outline-variant/10 mx-4" />
                     )}
                  </React.Fragment>
               );
            })}

            {/* Separator before CTA */}
            <View className="h-px bg-outline-variant/10 mx-4" />

            {/* Post notice CTA — always visible for owners, read-only link for members */}
            <TouchableOpacity
               onPress={isOwner ? onPostNotice : onSeeAll}
               activeOpacity={0.75}
               className="flex-row items-center gap-3 px-4 py-4 active:bg-surface-container-high"
            >
               <View className="w-9 h-9 rounded-xl bg-primary/10 items-center justify-center">
                  <MaterialCommunityIcons
                     name={isOwner ? "plus-circle-outline" : "arrow-right"}
                     size={18}
                     color="#F59E0B"
                  />
               </View>
               <Typography className="text-primary text-sm font-semibold flex-1">
                  {isOwner ? "Post New Notice" : "View All Notices"}
               </Typography>
               <MaterialCommunityIcons
                  name="arrow-right"
                  size={16}
                  color="#F59E0B"
               />
            </TouchableOpacity>
         </Card>
      </View>
   );
};
