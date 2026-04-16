import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";

interface GroupInfoCardProps {
   groupName: string;
   location: string;
   memberCount: number;
   activeCount: number;
   pendingCount: number;
   inviteCode: string;
   billingMonth: string;
   isOwner: boolean;
   onSwitchGroup?: () => void;
   onEditGroup?: () => void;
   onCopyCode?: () => void;
}

export const GroupInfoCard = ({
   groupName,
   location,
   memberCount,
   activeCount,
   pendingCount,
   inviteCode,
   billingMonth,
   isOwner,
   onSwitchGroup,
   onEditGroup,
   onCopyCode,
}: GroupInfoCardProps) => {
   return (
      <Card
         padding="none"
         className="bg-surface-container rounded-3xl overflow-hidden border border-outline/5"
      >
         {/* Top amber accent line */}
         <View className="h-1 bg-primary w-full" />

         <View className="p-5 gap-4">
            {/* Header row — group identity + action buttons */}
            <View className="flex-row items-start justify-between gap-3">
               {/* Icon + name */}
               <View className="flex-row items-center gap-3 flex-1">
                  <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20">
                     <Typography className="text-3xl">🏠</Typography>
                  </View>
                  <View className="flex-1">
                     <Typography className="text-on-surface text-xl font-extrabold tracking-tight leading-tight">
                        {groupName}
                     </Typography>
                     <View className="flex-row items-center gap-1 mt-0.5">
                        <MaterialCommunityIcons
                           name="map-marker-outline"
                           size={12}
                           color="#a08e7a"
                        />
                        <Typography className="text-outline text-xs font-medium">
                           {location}
                        </Typography>
                     </View>
                     {/* Live status pill */}
                     <View className="flex-row items-center gap-1.5 mt-1.5">
                        <View className="w-2 h-2 rounded-full bg-tertiary" />
                        <Typography className="text-tertiary text-[10px] font-bold uppercase tracking-widest">
                           Active
                        </Typography>
                        <Typography className="text-outline text-[10px]">•</Typography>
                        <Typography className="text-outline text-[10px] font-medium">
                           {billingMonth}
                        </Typography>
                     </View>
                  </View>
               </View>

               {/* Switch + Edit buttons */}
               <View className="items-end gap-2">
                  <TouchableOpacity
                     onPress={onSwitchGroup}
                     activeOpacity={0.75}
                     className="flex-row items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-2 rounded-xl active:scale-95"
                  >
                     <MaterialCommunityIcons
                        name="swap-horizontal"
                        size={14}
                        color="#F59E0B"
                     />
                     <Typography className="text-primary text-xs font-bold">
                        Switch
                     </Typography>
                  </TouchableOpacity>

                  {isOwner && (
                     <TouchableOpacity
                        onPress={onEditGroup}
                        activeOpacity={0.75}
                        className="flex-row items-center gap-1.5 bg-surface-container-high border border-outline/10 px-3 py-2 rounded-xl active:scale-95"
                     >
                        <MaterialCommunityIcons
                           name="pencil-outline"
                           size={14}
                           color="#adc6ff"
                        />
                        <Typography className="text-secondary text-xs font-bold">
                           Edit
                        </Typography>
                     </TouchableOpacity>
                  )}
               </View>
            </View>

            {/* Stats row */}
            <View className="flex-row rounded-2xl overflow-hidden border border-outline/10">
               <View className="flex-1 items-center py-3.5 gap-0.5 bg-surface-container-high">
                  <Typography className="text-on-surface text-xl font-extrabold">
                     {memberCount}
                  </Typography>
                  <Typography className="text-outline text-[10px] font-bold uppercase tracking-widest">
                     Members
                  </Typography>
               </View>
               <View className="w-px bg-outline/10" />
               <View className="flex-1 items-center py-3.5 gap-0.5 bg-surface-container-high">
                  <Typography className="text-tertiary text-xl font-extrabold">
                     {activeCount}
                  </Typography>
                  <Typography className="text-outline text-[10px] font-bold uppercase tracking-widest">
                     Active
                  </Typography>
               </View>
               <View className="w-px bg-outline/10" />
               <View className="flex-1 items-center py-3.5 gap-0.5 bg-surface-container-high">
                  <Typography className="text-primary text-xl font-extrabold">
                     {pendingCount}
                  </Typography>
                  <Typography className="text-outline text-[10px] font-bold uppercase tracking-widest">
                     Pending
                  </Typography>
               </View>
            </View>

            {/* Invite code strip */}
            <View className="flex-row items-center justify-between bg-surface-container-high rounded-2xl px-4 py-3 border border-outline/10">
               <View>
                  <Typography className="text-outline text-[10px] font-bold uppercase tracking-widest mb-0.5">
                     Invite Code
                  </Typography>
                  <Typography className="text-on-surface font-mono text-lg font-extrabold tracking-widest">
                     {inviteCode}
                  </Typography>
               </View>
               <TouchableOpacity
                  onPress={onCopyCode}
                  activeOpacity={0.7}
                  className="flex-row items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-2 rounded-xl active:scale-95"
               >
                  <MaterialCommunityIcons
                     name="content-copy"
                     size={14}
                     color="#F59E0B"
                  />
                  <Typography className="text-primary text-xs font-bold">
                     Copy
                  </Typography>
               </TouchableOpacity>
            </View>
         </View>
      </Card>
   );
};
