import { View, TouchableOpacity, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface HomeHeaderProps {
   username: string;
   photoUrl?: string;
   notificationCount?: number;
   onProfilePress?: () => void;
   onNotificationPress?: () => void;
}

export const HomeHeader = ({
   username,
   photoUrl,
   notificationCount = 0,
   onProfilePress,
   onNotificationPress,
}: HomeHeaderProps) => {
   return (
      <View className="flex-row items-center justify-between px-6 pt-8 bg-background">
         <View>
            <Typography className="text-on-surface text-[10px] uppercase font-bold tracking-widest mb-1">
               Good Morning 👋
            </Typography>
            <Typography
               variant="h2"
               className="text-xl font-bold text-primary"
            >
               {username}
            </Typography>
         </View>
         <View className="flex-row items-center gap-4">
            <TouchableOpacity
               onPress={onNotificationPress}
               className="relative active:scale-95"
            >
               <MaterialCommunityIcons
                  name="bell-outline"
                  size={24}
                  color="#dae2fd"
               />
               {notificationCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-primary w-4 h-4 rounded-full border-outline items-center justify-center">
                     <Typography className="text-outline text-[8px] font-bold">
                        {notificationCount}
                     </Typography>
                  </View>
               )}
            </TouchableOpacity>
            <TouchableOpacity onPress={onProfilePress}>
               <View className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden active:scale-95">
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
