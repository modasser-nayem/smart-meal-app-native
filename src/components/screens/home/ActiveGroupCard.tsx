import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ActiveGroupCardProps {
   groupName: string;
   memberCount: number;
   month: string;
   inviteCode: string;
   userRole: string;
   onSwitchGroup?: () => void;
   onCopyCode?: () => void;
}

export const ActiveGroupCard = ({
   groupName,
   memberCount,
   month,
   inviteCode,
   userRole,
   onSwitchGroup,
   onCopyCode,
}: ActiveGroupCardProps) => {
   return (
      <Card className="bg-surface-container rounded-3xl p-6 relative overflow-hidden border-t-4 border-x-[1px] border-b-[1px] border-primary">
         <View className="flex-row justify-between items-start mb-4">
            <View className="space-y-1">
               <Typography
                  variant="h2"
                  className="text-2xl font-bold text-on-surface"
               >
                  {groupName}
               </Typography>
               <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center gap-1">
                     <MaterialCommunityIcons
                        name="account-group"
                        size={14}
                        color="#dae2fd"
                     />
                     <Typography className="text-on-surface text-sm">
                        {memberCount} members
                     </Typography>
                  </View>
                  <Typography className="text-outline">•</Typography>
                  <View className="flex-row items-center gap-1">
                     <MaterialCommunityIcons
                        name="calendar-month"
                        size={14}
                        color="#dae2fd"
                     />
                     <Typography className="text-on-surface text-sm">
                        {month}
                     </Typography>
                  </View>
               </View>
            </View>
            <TouchableOpacity onPress={onSwitchGroup}>
               <Typography className="text-primary font-semibold text-sm">
                  Switch Group
               </Typography>
            </TouchableOpacity>
         </View>
         <View className="flex-row items-center justify-between mt-6">
            <View className="flex-row items-center gap-2 bg-surface/90 px-3 py-2 rounded-xl">
               <Typography className="text-xs font-mono text-on-surface">
                  Code: {inviteCode}
               </Typography>
               <TouchableOpacity onPress={onCopyCode}>
                  <MaterialCommunityIcons
                     name="content-copy"
                     size={18}
                     color="#F59E0B"
                  />
               </TouchableOpacity>
            </View>
            <View className="bg-primary/10 text-primary px-3 py-1.5 rounded-full">
               <Typography className="text-[10px] font-bold uppercase">
                  You: {userRole}
               </Typography>
            </View>
         </View>
      </Card>
   );
};
