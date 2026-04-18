import { View, TouchableOpacity, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";

interface HomeHeaderProps {
   username: string;
   photoUrl?: string;
   notificationCount?: number;
   noticeCount?: number;
   onProfilePress?: () => void;
   onNotificationPress?: () => void;
   onNoticePress?: () => void;
}

const getGreeting = () => {
   const hour = new Date().getHours();
   if (hour < 12) return "Good Morning ☀️";
   if (hour < 17) return "Good Afternoon 🌤️";
   return "Good Evening 🌙";
};

export const HomeHeader = ({
   username,
   photoUrl,
   notificationCount = 0,
   noticeCount = 0,
   onProfilePress,
   onNotificationPress,
   onNoticePress,
}: HomeHeaderProps) => {
   const insets = useSafeAreaInsets();

   return (
      <View
         className="flex-row items-center justify-between px-6 pb-3 bg-background"
         style={{ paddingTop: insets.top + 8 }}
      >
         <View>
            <Typography className="text-secondary-300 text-[10px] uppercase font-bold tracking-widest mb-1">
               {getGreeting()}
            </Typography>
            <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
               {username}
            </Typography>
         </View>

         <View className="flex-row items-center gap-2.5">
            {/* Group notices */}
            <TouchableOpacity
               onPress={onNoticePress}
               activeOpacity={0.75}
               className="relative w-10 h-10 rounded-full bg-surface-container items-center justify-center active:scale-95"
            >
               <MaterialCommunityIcons
                  name="bullhorn-outline"
                  size={20}
                  color={Colors.icon.onDark}
               />
               {noticeCount > 0 && (
                  <View className="absolute top-1 right-1 min-w-[16px] h-4 rounded-full bg-primary items-center justify-center px-1 border border-background">
                     <Typography className="text-background text-[9px] font-black">
                        {noticeCount > 9 ? "9+" : noticeCount}
                     </Typography>
                  </View>
               )}
            </TouchableOpacity>

            {/* App notifications */}
            <TouchableOpacity
               onPress={onNotificationPress}
               activeOpacity={0.75}
               className="relative w-10 h-10 rounded-full bg-surface-container items-center justify-center active:scale-95"
            >
               <MaterialCommunityIcons name="bell-outline" size={20} color={Colors.icon.onDark} />
               {notificationCount > 0 && (
                  <View className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary border border-background" />
               )}
            </TouchableOpacity>

            {/* Avatar */}
            <TouchableOpacity onPress={onProfilePress} activeOpacity={0.85}>
               <View className="w-11 h-11 rounded-full border-2 border-primary/40 overflow-hidden active:scale-95">
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
            </TouchableOpacity>
         </View>
      </View>
   );
};
