import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/colors";

interface ProfileHeaderProps {
   username: string;
   email: string;
   photoUrl?: string;
   groupCount: number;
   totalMeals: number;
   memberSince: string;
   onEditPhoto?: () => void;
   onEditProfile?: () => void;
}

export const ProfileHeader = ({
   username,
   email,
   photoUrl,
   groupCount,
   totalMeals,
   memberSince,
   onEditPhoto,
   onEditProfile,
}: ProfileHeaderProps) => {
   const { t } = useTranslation("profile");

   return (
      <View className="items-center px-6 pt-10 pb-6">
         {/* Avatar */}
         <View className="relative mb-5">
            <View className="w-28 h-28 rounded-full border-[3px] border-primary/40 overflow-hidden bg-surface-container">
               <Image
                  source={{
                     uri:
                        photoUrl ||
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3jdD-poSuSANiPR7VgxC9B5ccrozavF_CsDqU_hz9pgdLErGMIjcY7oU1_wM2iqXC14693hLM0pu_ieHOtK9G4pzPT1ZaDeK8N_5RdShmxU2AhBcJGr7VCQWqI-HLJYLTAl9hl6fUyLR8PcgLpOLisTYV4_i1TcX87m3yjXGNCMN7ZIT0jeSRA6JTpZpJCvC66y6yYX98Vwgc9-TQw_MePrtLN8p-c3Lf7WWIoq9Iv59PBV_AjExIUSMhn7VW29vPgNnRtNfxSA",
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
               />
            </View>
            <TouchableOpacity
               onPress={onEditPhoto}
               activeOpacity={0.8}
               className="absolute bottom-0 right-0 w-9 h-9 bg-primary rounded-full items-center justify-center border-[3px] border-background active:scale-90"
            >
               <MaterialCommunityIcons name="camera" size={15} color={Colors.icon.onPrimary} />
            </TouchableOpacity>
         </View>

         {/* Name + Email */}
         <Typography className="text-on-surface text-2xl font-extrabold tracking-tight">
            {username}
         </Typography>
         <Typography className="text-secondary-300 text-sm font-medium mt-0.5">{email}</Typography>

         {/* Edit Profile Button */}
         <TouchableOpacity
            onPress={onEditProfile}
            activeOpacity={0.75}
            className="mt-4 flex-row items-center gap-1.5 px-5 py-2 rounded-full border border-primary/30 active:bg-primary/10"
         >
            <MaterialCommunityIcons name="pencil-outline" size={14} color={Colors.icon.primary} />
            <Typography className="text-primary font-bold text-xs uppercase tracking-widest">
               {t("header.editProfile")}
            </Typography>
         </TouchableOpacity>

         {/* Stats Strip */}
         <View className="flex-row items-center mt-6 w-full bg-surface-container rounded-2xl border border-white/5 overflow-hidden">
            <View className="flex-1 items-center py-4 gap-0.5">
               <Typography className="text-primary font-extrabold text-xl">{groupCount}</Typography>
               <Typography className="text-[10px] text-secondary-300 uppercase font-bold tracking-widest">
                  {t("header.groups")}
               </Typography>
            </View>
            <View className="w-px h-10 bg-outline/20" />
            <View className="flex-1 items-center py-4 gap-0.5">
               <Typography className="text-primary font-extrabold text-xl">{totalMeals}</Typography>
               <Typography className="text-[10px] text-secondary-300 uppercase font-bold tracking-widest">
                  {t("header.meals")}
               </Typography>
            </View>
            <View className="w-px h-10 bg-outline/20" />
            <View className="flex-1 items-center py-4 gap-0.5">
               <Typography className="text-primary font-extrabold text-sm">
                  {memberSince}
               </Typography>
               <Typography className="text-[10px] text-secondary-300 uppercase font-bold tracking-widest">
                  {t("header.since")}
               </Typography>
            </View>
         </View>
      </View>
   );
};
