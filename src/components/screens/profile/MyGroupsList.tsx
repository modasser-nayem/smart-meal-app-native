import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

type Role = "Owner" | "Manager" | "Member";

export interface GroupItem {
   id: string;
   name: string;
   role: Role;
   memberCount: number;
   isActive: boolean;
   emoji?: string;
}

interface MyGroupsListProps {
   groups: GroupItem[];
   onGroupPress?: (id: string) => void;
   onCreateGroup?: () => void;
   onJoinGroup?: () => void;
}

const ROLE_COLORS: Record<Role, string> = {
   Owner: "text-primary",
   Manager: "text-info",
   Member: "text-secondary-300",
};

const ROLE_DOT: Record<Role, string> = {
   Owner: "bg-primary",
   Manager: "bg-info",
   Member: "bg-secondary-400",
};

export const MyGroupsList = ({
   groups,
   onGroupPress,
   onCreateGroup,
   onJoinGroup,
}: MyGroupsListProps) => {
   return (
      <View className="mx-6">
         {/* Section label */}
         <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-3 ml-1">
            My Groups
         </Typography>

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
            {groups.map((group, index) => (
               <TouchableOpacity
                  key={group.id}
                  onPress={() => onGroupPress?.(group.id)}
                  activeOpacity={0.7}
                  className={`flex-row items-center justify-between px-4 py-4 active:bg-surface ${
                     index < groups.length - 1 ? "border-b border-outline/10" : ""
                  }`}
               >
                  <View className="flex-row items-center gap-3 flex-1">
                     {/* Group avatar */}
                     <View
                        className={`w-11 h-11 rounded-2xl items-center justify-center ${
                           group.isActive
                              ? "bg-primary/10 border border-primary/20"
                              : "bg-surface border border-outline/20"
                        }`}
                     >
                        <Typography className="text-xl">{group.emoji || "🏠"}</Typography>
                     </View>

                     {/* Info */}
                     <View className="flex-1">
                        <View className="flex-row items-center gap-2">
                           <Typography className="text-on-surface font-semibold text-[15px]">
                              {group.name}
                           </Typography>
                           {group.isActive && (
                              <View className="w-1.5 h-1.5 rounded-full bg-primary" />
                           )}
                        </View>
                        <View className="flex-row items-center gap-2 mt-0.5">
                           <View className={`w-1.5 h-1.5 rounded-full ${ROLE_DOT[group.role]}`} />
                           <Typography
                              className={`text-xs font-bold uppercase tracking-wider ${ROLE_COLORS[group.role]}`}
                           >
                              {group.role}
                           </Typography>
                           <Typography className="text-secondary-400 text-xs">•</Typography>
                           <Typography className="text-secondary-300 text-xs">
                              {group.memberCount} members
                           </Typography>
                        </View>
                     </View>
                  </View>

                  {/* Active label or switch hint */}
                  {group.isActive ? (
                     <View className="bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                        <Typography className="text-primary text-[10px] font-black uppercase tracking-widest">
                           Active
                        </Typography>
                     </View>
                  ) : (
                     <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="swap-horizontal" size={15} color={Colors.icon.muted} />
                        <Typography className="text-secondary-400 text-[11px] font-bold">
                           Switch
                        </Typography>
                     </View>
                  )}
               </TouchableOpacity>
            ))}

            {/* Divider before actions */}
            <View className="h-px bg-outline/10 mx-4" />

            {/* Create Group */}
            <TouchableOpacity
               onPress={onCreateGroup}
               activeOpacity={0.7}
               className="flex-row items-center gap-3 px-4 py-4 active:bg-surface border-b border-outline/10"
            >
               <View className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center">
                  <MaterialCommunityIcons name="plus" size={20} color={Colors.icon.primary} />
               </View>
               <Typography className="text-primary font-bold text-base">
                  Create New Group
               </Typography>
            </TouchableOpacity>

            {/* Join Group */}
            <TouchableOpacity
               onPress={onJoinGroup}
               activeOpacity={0.7}
               className="flex-row items-center gap-3 px-4 py-4 active:bg-surface"
            >
               <View className="w-11 h-11 rounded-2xl bg-surface border border-outline/20 items-center justify-center">
                  <MaterialCommunityIcons name="account-plus-outline" size={20} color={Colors.icon.subtle} />
               </View>
               <View className="flex-1">
                  <Typography className="text-on-surface font-semibold text-[15px]">
                     Join a Group
                  </Typography>
                  <Typography className="text-secondary-300 text-xs mt-0.5">
                     Enter an invite code
                  </Typography>
               </View>
               <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.icon.muted} />
            </TouchableOpacity>
         </View>
      </View>
   );
};
