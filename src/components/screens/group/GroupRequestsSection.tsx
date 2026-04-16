import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface PendingItem {
   id: string;
   name: string;
   email: string;
   timeAgo: string;
   type: "join_request" | "invitation";
   initials: string;
   avatarColor: string;
   isActive?: boolean;
}

interface GroupRequestsSectionProps {
   items: PendingItem[];
   totalJoinRequests: number;
   totalInvitations: number;
   isOwner: boolean;
   onAccept?: (id: string) => void;
   onReject?: (id: string) => void;
   onRevoke?: (id: string) => void;
   onSeeAll?: () => void;
}

const RequestRow = ({
   item,
   isOwner,
   onAccept,
   onReject,
   onRevoke,
   isLast,
}: {
   item: PendingItem;
   isOwner: boolean;
   onAccept?: () => void;
   onReject?: () => void;
   onRevoke?: () => void;
   isLast: boolean;
}) => {
   const isJoinReq = item.type === "join_request";
   const accentColor = isJoinReq ? "#F59E0B" : "#3B82F6";
   const badgeBg = isJoinReq
      ? "bg-primary/10 border border-primary/25"
      : "bg-secondary-container/15 border border-secondary/20";
   const badgeText = isJoinReq ? "text-primary" : "text-secondary";
   const badgeLabel = isJoinReq ? "Join Request" : "Invited";

   return (
      <>
         <View
            className="px-4 py-4"
            style={{ borderLeftWidth: 2, borderLeftColor: accentColor }}
         >
            {/* Person info row */}
            <View className="flex-row items-center gap-3 mb-3">
               <View className="relative flex-shrink-0">
                  <View
                     className={cn(
                        "w-11 h-11 rounded-2xl items-center justify-center border border-outline/10",
                        item.avatarColor
                     )}
                  >
                     <Typography className="text-white font-extrabold text-base">
                        {item.initials}
                     </Typography>
                  </View>
                  {item.isActive !== undefined && (
                     <View
                        className={cn(
                           "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface-container",
                           item.isActive ? "bg-tertiary" : "bg-outline"
                        )}
                     />
                  )}
               </View>

               <View className="flex-1 min-w-0">
                  <View className="flex-row items-center gap-2 flex-wrap">
                     <Typography
                        className="text-on-surface text-sm font-bold leading-tight"
                        numberOfLines={1}
                     >
                        {item.name}
                     </Typography>
                     <View className={cn("px-2 py-0.5 rounded-full", badgeBg)}>
                        <Typography
                           className={cn(
                              "text-[9px] font-black uppercase tracking-widest",
                              badgeText
                           )}
                        >
                           {badgeLabel}
                        </Typography>
                     </View>
                  </View>
                  <Typography
                     className="text-outline text-[11px] mt-0.5"
                     numberOfLines={1}
                  >
                     {item.email} · {item.timeAgo}
                  </Typography>
               </View>
            </View>

            {/* Actions */}
            {isJoinReq && isOwner && (
               <View className="flex-row gap-2">
                  <TouchableOpacity
                     onPress={onAccept}
                     activeOpacity={0.8}
                     className="flex-1 flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl bg-tertiary/90 active:opacity-80"
                  >
                     <MaterialCommunityIcons
                        name="check-circle"
                        size={15}
                        color="#002109"
                     />
                     <Typography className="text-on-tertiary-fixed text-xs font-bold">
                        Accept
                     </Typography>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={onReject}
                     activeOpacity={0.8}
                     className="flex-1 flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl border border-error/35 active:bg-error-container/15"
                  >
                     <MaterialCommunityIcons
                        name="close-circle-outline"
                        size={15}
                        color="#ffb4ab"
                     />
                     <Typography className="text-error text-xs font-bold">
                        Reject
                     </Typography>
                  </TouchableOpacity>
               </View>
            )}

            {!isJoinReq && (
               <View className="flex-row items-center justify-between">
                  <Typography className="text-outline text-xs italic">
                     Awaiting response…
                  </Typography>
                  {isOwner && (
                     <TouchableOpacity
                        onPress={onRevoke}
                        activeOpacity={0.7}
                        className="px-3 py-1 rounded-lg border border-error/25 active:bg-error-container/15"
                     >
                        <Typography className="text-error text-[11px] font-bold">
                           Revoke
                        </Typography>
                     </TouchableOpacity>
                  )}
               </View>
            )}
         </View>
         {!isLast && <View className="h-px bg-outline-variant/10 mx-4" />}
      </>
   );
};

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
   const totalPending = totalJoinRequests + totalInvitations;

   return (
      <View className="gap-3">
         {/* Section header */}
         <View className="flex-row items-center justify-between px-1">
            <View className="flex-row items-center gap-2">
               <MaterialCommunityIcons
                  name="account-clock-outline"
                  size={14}
                  color="#a08e7a"
               />
               <Typography className="text-outline text-[11px] font-bold uppercase tracking-[0.18em]">
                  Requests & Invitations
               </Typography>
            </View>
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
               <Typography className="text-primary text-[11px] font-bold uppercase tracking-widest">
                  See All
               </Typography>
            </TouchableOpacity>
         </View>

         {/* Pending summary banner */}
         {totalPending > 0 && (
            <View className="flex-row items-center gap-3 bg-primary/5 border border-primary/15 rounded-2xl px-4 py-3">
               <View className="w-8 h-8 rounded-xl bg-primary/10 items-center justify-center">
                  <MaterialCommunityIcons
                     name="clock-alert-outline"
                     size={18}
                     color="#F59E0B"
                  />
               </View>
               <View className="flex-1">
                  <Typography className="text-on-surface text-sm font-bold">
                     {totalPending} Pending Action{totalPending !== 1 ? "s" : ""}
                  </Typography>
                  <Typography className="text-outline text-[11px]">
                     {totalJoinRequests} join request{totalJoinRequests !== 1 ? "s" : ""} ·{" "}
                     {totalInvitations} invitation{totalInvitations !== 1 ? "s" : ""} sent
                  </Typography>
               </View>
               {/* Pulse dot */}
               <View className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
            </View>
         )}

         <Card
            padding="none"
            className="bg-surface-container rounded-2xl overflow-hidden border border-outline/5"
         >
            {items.length === 0 ? (
               <View className="items-center py-10 gap-3">
                  <View className="w-14 h-14 rounded-3xl bg-surface-container-high items-center justify-center">
                     <MaterialCommunityIcons
                        name="email-check-outline"
                        size={28}
                        color="#534434"
                     />
                  </View>
                  <Typography className="text-on-surface-variant text-sm font-medium">
                     No pending requests
                  </Typography>
               </View>
            ) : (
               items.map((item, index) => (
                  <RequestRow
                     key={item.id}
                     item={item}
                     isOwner={isOwner}
                     onAccept={() => onAccept?.(item.id)}
                     onReject={() => onReject?.(item.id)}
                     onRevoke={() => onRevoke?.(item.id)}
                     isLast={index === items.length - 1}
                  />
               ))
            )}

            {/* See all row */}
            {totalPending > items.length && (
               <>
                  <View className="h-px bg-outline-variant/10 mx-4" />
                  <TouchableOpacity
                     onPress={onSeeAll}
                     activeOpacity={0.75}
                     className="flex-row items-center justify-between px-4 py-4 active:bg-surface-container-high"
                  >
                     <View className="flex-row items-center gap-2">
                        <MaterialCommunityIcons
                           name="account-clock-outline"
                           size={18}
                           color="#F59E0B"
                        />
                        <Typography className="text-on-surface text-sm font-semibold">
                           See All Requests & Invitations
                        </Typography>
                     </View>
                     <View className="flex-row items-center gap-1.5">
                        <View className="bg-primary/10 px-2 py-0.5 rounded-full">
                           <Typography className="text-primary text-[11px] font-black">
                              {totalPending}
                           </Typography>
                        </View>
                        <MaterialCommunityIcons
                           name="arrow-right"
                           size={16}
                           color="#F59E0B"
                        />
                     </View>
                  </TouchableOpacity>
               </>
            )}
         </Card>
      </View>
   );
};
