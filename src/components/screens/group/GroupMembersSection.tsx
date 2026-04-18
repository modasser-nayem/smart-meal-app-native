import { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { MemberInfoModal } from "./MemberInfoModal";
import { Colors } from "@/constants/colors";

export type MemberRole = "Owner" | "Manager" | "Member";

export interface Member {
   id: string;
   name: string;
   email: string;
   role: MemberRole;
   isActive: boolean;
   initials: string;
   avatar?: string;
}

interface GroupMembersSectionProps {
   members: Member[];
   totalCount: number;
   isOwner: boolean;
   onSeeAll?: () => void;
   onRemoveMember?: (id: string) => void;
   onChangeRole?: (id: string) => void;
}

const ROLE_CONFIG: Record<MemberRole, { bg: string; text: string; label: string }> = {
   Owner: { bg: "bg-primary/10", text: "text-primary", label: "Owner 👑" },
   Manager: { bg: "bg-info/10", text: "text-info", label: "Manager" },
   Member: { bg: "bg-surface", text: "text-secondary-300", label: "Member" },
};

export const GroupMembersSection = ({
   members,
   totalCount,
   isOwner,
   onSeeAll,
   onRemoveMember,
   onChangeRole,
}: GroupMembersSectionProps) => {
   const [selectedMember, setSelectedMember] = useState<Member | null>(null);
   const remaining = totalCount - members.length;

   return (
      <View>
         {/* Section header */}
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <View className="flex-row items-center gap-2">
               <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
                  Members
               </Typography>
               <View className="bg-surface border border-outline/60 px-2 py-0.5 rounded-full">
                  <Typography className="text-secondary-300 text-[10px] font-bold">
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

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
            {members.map((member, index) => {
               const roleStyle = ROLE_CONFIG[member.role];
               return (
                  <TouchableOpacity
                     key={member.id}
                     onPress={() => setSelectedMember(member)}
                     activeOpacity={0.75}
                     className={`flex-row items-center gap-3 px-4 py-4 active:bg-surface ${
                        member.role === "Owner" ? "border-l-[3px] border-primary" : ""
                     } ${index < members.length - 1 ? "border-b border-outline" : ""}`}
                  >
                     {/* Avatar */}
                     <View className="relative">
                        {member.avatar ? (
                           <View className="w-12 h-12 rounded-full overflow-hidden border-2 border-outline">
                              <Image
                                 source={{ uri: member.avatar }}
                                 className="w-full h-full"
                                 resizeMode="cover"
                              />
                           </View>
                        ) : (
                           <View className="w-12 h-12 rounded-full bg-surface border-2 border-outline/20 items-center justify-center">
                              <Typography className="text-on-surface font-extrabold text-base">
                                 {member.initials}
                              </Typography>
                           </View>
                        )}
                        {/* Online dot */}
                        <View
                           className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface-container ${
                              member.isActive ? "bg-accent" : "bg-outline"
                           }`}
                        />
                     </View>

                     {/* Info */}
                     <View className="flex-1 min-w-0">
                        <Typography
                           className="text-on-surface text-[15px] font-bold leading-tight"
                           numberOfLines={1}
                        >
                           {member.name}
                        </Typography>
                        <Typography className="text-secondary-400 text-xs mt-0.5" numberOfLines={1}>
                           {member.email}
                        </Typography>
                     </View>

                     {/* Role badge */}
                     <View
                        className={`px-2.5 py-1 rounded-full border border-outline/15 ${roleStyle.bg}`}
                     >
                        <Typography
                           className={`text-[9px] font-black uppercase tracking-widest ${roleStyle.text}`}
                        >
                           {roleStyle.label}
                        </Typography>
                     </View>

                     <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.icon.dim} />
                  </TouchableOpacity>
               );
            })}

            {/* See all footer */}
            {remaining > 0 && (
               <>
                  <View className="h-px bg-outline/10 mx-4" />
                  <TouchableOpacity
                     onPress={onSeeAll}
                     activeOpacity={0.75}
                     className="flex-row items-center justify-between px-4 py-4 active:bg-surface"
                  >
                     <Typography className="text-secondary-300 text-sm">
                        {remaining} more member{remaining !== 1 ? "s" : ""}
                     </Typography>
                     <View className="flex-row items-center gap-1">
                        <Typography className="text-primary text-xs font-bold">See All</Typography>
                        <MaterialCommunityIcons name="arrow-right" size={14} color={Colors.icon.primary} />
                     </View>
                  </TouchableOpacity>
               </>
            )}
         </View>

         {/* Member info modal */}
         <MemberInfoModal
            member={selectedMember}
            visible={!!selectedMember}
            onClose={() => setSelectedMember(null)}
            isOwner={isOwner}
            onRemoveMember={(id) => {
               onRemoveMember?.(id);
               setSelectedMember(null);
            }}
            onChangeRole={(id) => {
               onChangeRole?.(id);
               setSelectedMember(null);
            }}
         />
      </View>
   );
};
