import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface Member {
   id: string;
   name: string;
   email: string;
   role: "Owner" | "Manager" | "Member";
   isActive: boolean;
   initials: string;
   avatarColor: string; // tailwind bg class e.g. "bg-blue-900"
}

interface GroupMembersSectionProps {
   members: Member[];
   totalCount: number;
   onMemberPress?: (id: string) => void;
   onSeeAll?: () => void;
}

const ROLE_STYLE: Record<
   Member["role"],
   { badge: string; text: string; label: string }
> = {
   Owner: {
      badge: "bg-primary/10 border border-primary/25",
      text: "text-primary",
      label: "Owner 👑",
   },
   Manager: {
      badge: "bg-secondary-container/15 border border-secondary/20",
      text: "text-secondary",
      label: "Manager",
   },
   Member: {
      badge: "bg-surface-container-highest border border-outline/10",
      text: "text-on-surface-variant",
      label: "Member",
   },
};

const MemberRow = ({
   member,
   onPress,
   isLast,
}: {
   member: Member;
   onPress?: () => void;
   isLast: boolean;
}) => {
   const role = ROLE_STYLE[member.role];
   return (
      <>
         <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.75}
            className={cn(
               "flex-row items-center gap-3 px-4 py-3.5 active:bg-surface-container-high",
               // Owner row gets a subtle left accent
               member.role === "Owner" && "border-l-2 border-primary"
            )}
         >
            {/* Avatar */}
            <View className="relative">
               <View
                  className={cn(
                     "w-11 h-11 rounded-full items-center justify-center border border-outline/10",
                     member.avatarColor
                  )}
               >
                  <Typography className="text-white font-extrabold text-base">
                     {member.initials}
                  </Typography>
               </View>
               {/* Online dot */}
               <View
                  className={cn(
                     "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface-container",
                     member.isActive ? "bg-tertiary" : "bg-outline"
                  )}
               />
            </View>

            {/* Name + email */}
            <View className="flex-1 min-w-0">
               <Typography
                  className="text-on-surface text-sm font-bold leading-tight"
                  numberOfLines={1}
               >
                  {member.name}
               </Typography>
               <Typography
                  className="text-outline text-[11px] font-medium mt-0.5"
                  numberOfLines={1}
               >
                  {member.email}
               </Typography>
            </View>

            {/* Role badge */}
            <View
               className={cn(
                  "px-2.5 py-1 rounded-full flex-shrink-0",
                  role.badge
               )}
            >
               <Typography
                  className={cn(
                     "text-[9px] font-black uppercase tracking-widest",
                     role.text
                  )}
               >
                  {role.label}
               </Typography>
            </View>

            <MaterialCommunityIcons
               name="chevron-right"
               size={18}
               color="#534434"
            />
         </TouchableOpacity>
         {!isLast && <View className="h-px bg-outline-variant/10 mx-4" />}
      </>
   );
};

export const GroupMembersSection = ({
   members,
   totalCount,
   onMemberPress,
   onSeeAll,
}: GroupMembersSectionProps) => {
   const remaining = totalCount - members.length;

   return (
      <View className="gap-3">
         {/* Section header */}
         <View className="flex-row items-center justify-between px-1">
            <View className="flex-row items-center gap-2">
               <MaterialCommunityIcons
                  name="account-group-outline"
                  size={14}
                  color="#a08e7a"
               />
               <Typography className="text-outline text-[11px] font-bold uppercase tracking-[0.18em]">
                  Members
               </Typography>
               <View className="bg-surface-container-high border border-outline/15 px-1.5 py-0.5 rounded-full">
                  <Typography className="text-on-surface-variant text-[10px] font-bold">
                     {totalCount}
                  </Typography>
               </View>
            </View>
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
               <Typography className="text-primary text-[11px] font-bold uppercase tracking-widest">
                  See All
               </Typography>
            </TouchableOpacity>
         </View>

         <Card
            padding="none"
            className="bg-surface-container rounded-2xl overflow-hidden border border-outline/5"
         >
            {members.map((member, index) => (
               <MemberRow
                  key={member.id}
                  member={member}
                  onPress={() => onMemberPress?.(member.id)}
                  isLast={index === members.length - 1}
               />
            ))}

            {/* Remaining members footer */}
            {remaining > 0 && (
               <>
                  <View className="h-px bg-outline-variant/10 mx-4" />
                  <TouchableOpacity
                     onPress={onSeeAll}
                     activeOpacity={0.75}
                     className="flex-row items-center justify-between px-4 py-3.5 active:bg-surface-container-high"
                  >
                     <View className="flex-row items-center gap-2">
                        {/* Mini avatar stack */}
                        <View className="flex-row">
                           {["bg-yellow-900", "bg-cyan-900", "bg-rose-900"].map(
                              (color, i) => (
                                 <View
                                    key={i}
                                    className={cn(
                                       "w-7 h-7 rounded-full border-2 border-surface-container items-center justify-center",
                                       color,
                                       i > 0 && "-ml-2"
                                    )}
                                 >
                                    <Typography className="text-white text-[9px] font-black">
                                       +
                                    </Typography>
                                 </View>
                              )
                           )}
                        </View>
                        <Typography className="text-on-surface-variant text-xs font-medium">
                           {remaining} more member{remaining !== 1 ? "s" : ""}
                        </Typography>
                     </View>
                     <View className="flex-row items-center gap-1">
                        <Typography className="text-primary text-xs font-bold">
                           See All Members
                        </Typography>
                        <MaterialCommunityIcons
                           name="arrow-right"
                           size={14}
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
