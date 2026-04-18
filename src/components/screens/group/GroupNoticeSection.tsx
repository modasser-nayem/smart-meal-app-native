import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { useTranslation } from "react-i18next";
import { NoticeDetailModal } from "./NoticeDetailModal";
import { PostNoticeSheet, NewNotice } from "./PostNoticeSheet";
import { Colors } from "@/constants/colors";

export interface Notice {
   id: string;
   title: string;
   body: string;
   timeAgo: string;
   pinColor?: "primary" | "info" | "success" | "warning";
   postedBy?: string;
   isPinned?: boolean;
}

interface GroupNoticeSectionProps {
   notices: Notice[];
   isOwner: boolean;
   onNoticePress?: (id: string) => void;
   onSeeAll?: () => void;
   onPostNotice?: (notice: NewNotice) => void;
   onDeleteNotice?: (id: string) => void;
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

export const GroupNoticeSection = ({
   notices,
   isOwner,
   onSeeAll,
   onPostNotice,
   onDeleteNotice,
}: GroupNoticeSectionProps) => {
   const { t } = useTranslation("group");
   const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
   const [postSheetVisible, setPostSheetVisible] = useState(false);

   const sorted = [...notices].sort((a, b) =>
      a.isPinned && !b.isPinned ? -1 : !a.isPinned && b.isPinned ? 1 : 0,
   );

   return (
      <View>
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <View className="flex-row items-center gap-2">
               <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
                  {t("notices.title")}
               </Typography>
               {notices.length > 0 && (
                  <View className="bg-surface border border-outline/20 px-2 py-0.5 rounded-full">
                     <Typography className="text-secondary-300 text-[10px] font-bold">
                        {notices.length}
                     </Typography>
                  </View>
               )}
            </View>
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
               <Typography className="text-primary text-[11px] font-bold uppercase tracking-widest">
                  {t("members.seeAll")}
               </Typography>
            </TouchableOpacity>
         </View>

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
            {sorted.length === 0 ? (
               <View className="items-center py-10 gap-3">
                  <View className="w-12 h-12 rounded-2xl bg-surface items-center justify-center">
                     <MaterialCommunityIcons
                        name="bullhorn-outline"
                        size={24}
                        color={Colors.icon.muted}
                     />
                  </View>
                  <Typography className="text-secondary-400 text-sm">
                     {t("notices.noNotices")}
                  </Typography>
                  {isOwner && (
                     <TouchableOpacity
                        onPress={() => setPostSheetVisible(true)}
                        activeOpacity={0.75}
                        className="flex-row items-center gap-1.5 bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl active:scale-95"
                     >
                        <MaterialCommunityIcons name="plus" size={14} color={Colors.icon.primary} />
                        <Typography className="text-primary text-xs font-bold">
                           {t("notices.postFirst")}
                        </Typography>
                     </TouchableOpacity>
                  )}
               </View>
            ) : (
               sorted.map((notice, index) => {
                  const type = notice.pinColor ?? "primary";
                  return (
                     <TouchableOpacity
                        key={notice.id}
                        onPress={() => setSelectedNotice(notice)}
                        activeOpacity={0.75}
                        className={`flex-row items-start gap-3 px-4 py-4 active:bg-surface ${index < sorted.length - 1 ? "border-b border-outline/10" : ""}`}
                     >
                        <View
                           className={`w-9 h-9 rounded-xl items-center justify-center flex-shrink-0 mt-0.5 ${TYPE_BG[type]}`}
                        >
                           <MaterialCommunityIcons
                              name={TYPE_ICON[type] as any}
                              size={16}
                              color={TYPE_COLOR[type]}
                           />
                        </View>
                        <View className="flex-1 min-w-0">
                           <View className="flex-row items-start justify-between gap-2 mb-1">
                              <View className="flex-row items-center gap-1.5 flex-1 flex-wrap">
                                 {notice.isPinned && (
                                    <MaterialCommunityIcons
                                       name="pin"
                                       size={12}
                                       color={Colors.icon.primary}
                                    />
                                 )}
                                 <Typography
                                    className="text-on-surface text-sm font-bold leading-snug flex-1"
                                    numberOfLines={1}
                                 >
                                    {notice.title}
                                 </Typography>
                              </View>
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
                           {notice.postedBy && (
                              <View className="flex-row items-center gap-1 mt-1.5">
                                 <MaterialCommunityIcons
                                    name="account-outline"
                                    size={11}
                                    color={Colors.icon.dim}
                                 />
                                 <Typography className="text-secondary-400 text-[10px]">
                                    {notice.postedBy}
                                 </Typography>
                              </View>
                           )}
                        </View>
                        <MaterialCommunityIcons
                           name="chevron-right"
                           size={16}
                           color={Colors.icon.muted}
                        />
                     </TouchableOpacity>
                  );
               })
            )}

            {isOwner && notices.length > 0 && (
               <>
                  <View className="h-px bg-outline/10 mx-4" />
                  <TouchableOpacity
                     onPress={() => setPostSheetVisible(true)}
                     activeOpacity={0.75}
                     className="flex-row items-center gap-3 px-4 py-4 active:bg-surface"
                  >
                     <View className="w-9 h-9 rounded-xl bg-primary/10 items-center justify-center">
                        <MaterialCommunityIcons name="plus" size={18} color={Colors.icon.primary} />
                     </View>
                     <Typography className="text-primary text-sm font-bold flex-1">
                        {t("notices.postNew")}
                     </Typography>
                     <MaterialCommunityIcons
                        name="arrow-right"
                        size={16}
                        color={Colors.icon.primary}
                     />
                  </TouchableOpacity>
               </>
            )}
         </View>

         <NoticeDetailModal
            notice={selectedNotice}
            visible={!!selectedNotice}
            onClose={() => setSelectedNotice(null)}
            isOwner={isOwner}
            onDelete={(id) => {
               onDeleteNotice?.(id);
               setSelectedNotice(null);
            }}
         />
         <PostNoticeSheet
            visible={postSheetVisible}
            onClose={() => setPostSheetVisible(false)}
            onSubmit={(notice) => {
               onPostNotice?.(notice);
               setPostSheetVisible(false);
            }}
         />
      </View>
   );
};
