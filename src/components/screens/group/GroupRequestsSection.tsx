import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { AcceptRequestModal } from "./AcceptRequestModal";
import { Colors } from "@/constants/colors";

export type RequestType = "join_request" | "invitation";

export interface PendingItem {
   id: string;
   name: string;
   email: string;
   timeAgo: string;
   type: RequestType;
   initials: string;
   avatar?: string;
   isActive?: boolean;
}

interface GroupRequestsSectionProps {
   items: PendingItem[];
   totalJoinRequests: number;
   totalInvitations: number;
   isOwner: boolean;
   onAccept?: (id: string, includeMonth: boolean) => void;
   onReject?: (id: string) => void;
   onRevoke?: (id: string) => void;
   onSeeAll?: () => void;
}

export const GroupRequestsSection = ({
   items,
   totalJoinRequests,
   totalInvitations,
   isOwner,
   onAccept,
   onReject,
   onRevoke,
   onSeeAll,
}: GroupRequestsSectionProps) => {
   const [acceptTarget, setAcceptTarget] = useState<PendingItem | null>(null);
   const totalPending = totalJoinRequests + totalInvitations;

   return (
      <View>
         {/* Section header */}
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <View className="flex-row items-center gap-2">
               <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
                  Requests & Invitations
               </Typography>
               {totalPending > 0 && (
                  <View className="bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                     <Typography className="text-primary text-[10px] font-black">
                        {totalPending}
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

         {/* Summary banner */}
         {totalPending > 0 && (
            <View className="flex-row items-center gap-3 bg-primary/5 border border-primary/15 rounded-2xl px-4 py-3 mb-3">
               <MaterialCommunityIcons name="clock-alert-outline" size={18} color={Colors.icon.primary} />
               <View className="flex-1">
                  <Typography className="text-on-surface text-sm font-bold">
                     {totalPending} pending action{totalPending !== 1 ? "s" : ""}
                  </Typography>
                  <Typography className="text-secondary-400 text-[11px]">
                     {totalJoinRequests} join request{totalJoinRequests !== 1 ? "s" : ""} ·{" "}
                     {totalInvitations} invitation{totalInvitations !== 1 ? "s" : ""} sent
                  </Typography>
               </View>
               <View className="w-2 h-2 rounded-full bg-primary" />
            </View>
         )}

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
            {items.length === 0 ? (
               <View className="items-center py-10 gap-3">
                  <View className="w-12 h-12 rounded-2xl bg-surface items-center justify-center">
                     <MaterialCommunityIcons name="email-check-outline" size={24} color={Colors.icon.muted} />
                  </View>
                  <Typography className="text-secondary-400 text-sm">
                     No pending requests
                  </Typography>
               </View>
            ) : (
               items.map((item, index) => {
                  const isJoinReq = item.type === "join_request";
                  return (
                     <View
                        key={item.id}
                        className={`px-4 py-4 border-l-[3px] ${
                           isJoinReq ? "border-l-primary" : "border-l-info"
                        } ${index < items.length - 1 ? "border-b border-outline/10" : ""}`}
                     >
                        {/* Person row */}
                        <View className="flex-row items-center gap-3 mb-3">
                           <View className="relative">
                              <View className="w-11 h-11 rounded-full bg-surface border border-outline/20 items-center justify-center">
                                 <Typography className="text-on-surface font-extrabold text-base">
                                    {item.initials}
                                 </Typography>
                              </View>
                              {item.isActive !== undefined && (
                                 <View
                                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface-container ${
                                       item.isActive ? "bg-accent" : "bg-outline"
                                    }`}
                                 />
                              )}
                           </View>

                           <View className="flex-1 min-w-0">
                              <View className="flex-row items-center gap-2 flex-wrap">
                                 <Typography
                                    className="text-on-surface text-sm font-bold"
                                    numberOfLines={1}
                                 >
                                    {item.name}
                                 </Typography>
                                 <View
                                    className={`px-2 py-0.5 rounded-full ${
                                       isJoinReq ? "bg-primary/10" : "bg-info/10"
                                    }`}
                                 >
                                    <Typography
                                       className={`text-[9px] font-black uppercase tracking-widest ${
                                          isJoinReq ? "text-primary" : "text-info"
                                       }`}
                                    >
                                       {isJoinReq ? "Join Request" : "Invited"}
                                    </Typography>
                                 </View>
                              </View>
                              <Typography
                                 className="text-secondary-400 text-[11px] mt-0.5"
                                 numberOfLines={1}
                              >
                                 {item.email} · {item.timeAgo}
                              </Typography>
                           </View>
                        </View>

                        {/* Join request actions */}
                        {isJoinReq && isOwner && (
                           <View className="flex-row gap-2">
                              <TouchableOpacity
                                 onPress={() => setAcceptTarget(item)}
                                 activeOpacity={0.8}
                                 className="flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-xl bg-success active:opacity-80"
                              >
                                 <MaterialCommunityIcons
                                    name="check-circle"
                                    size={15}
                                    color={Colors.icon.onPrimary}
                                 />
                                 <Typography className="text-background text-xs font-bold">
                                    Accept
                                 </Typography>
                              </TouchableOpacity>
                              <TouchableOpacity
                                 onPress={() => onReject?.(item.id)}
                                 activeOpacity={0.8}
                                 className="flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-xl border border-error/30 active:bg-error/5"
                              >
                                 <MaterialCommunityIcons
                                    name="close-circle-outline"
                                    size={15}
                                    color={Colors.icon.error}
                                 />
                                 <Typography className="text-error text-xs font-bold">
                                    Reject
                                 </Typography>
                              </TouchableOpacity>
                           </View>
                        )}

                        {/* Invitation row */}
                        {!isJoinReq && (
                           <View className="flex-row items-center justify-between">
                              <View className="flex-row items-center gap-1.5">
                                 <MaterialCommunityIcons
                                    name="clock-outline"
                                    size={13}
                                    color={Colors.icon.dim}
                                 />
                                 <Typography className="text-secondary-400 text-xs">
                                    Awaiting response
                                 </Typography>
                              </View>
                              {isOwner && (
                                 <TouchableOpacity
                                    onPress={() => onRevoke?.(item.id)}
                                    activeOpacity={0.7}
                                    className="px-3 py-1.5 rounded-xl border border-error/25 active:bg-error/5"
                                 >
                                    <Typography className="text-error text-[11px] font-bold">
                                       Revoke
                                    </Typography>
                                 </TouchableOpacity>
                              )}
                           </View>
                        )}
                     </View>
                  );
               })
            )}
         </View>

         {/* Accept modal */}
         <AcceptRequestModal
            item={acceptTarget}
            visible={!!acceptTarget}
            onClose={() => setAcceptTarget(null)}
            onAccept={(id, includeMonth) => {
               onAccept?.(id, includeMonth);
               setAcceptTarget(null);
            }}
         />
      </View>
   );
};
