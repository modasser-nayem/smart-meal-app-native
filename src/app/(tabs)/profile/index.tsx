import React from "react";
import { View, ScrollView, TouchableOpacity, Image, Switch } from "react-native";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGetProfileQuery } from "@/api/userApi";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
   const dispatch = useDispatch();
   const router = useRouter();
   const { data: profile } = useGetProfileQuery();

   const handleLogout = () => {
      dispatch(logout());
      router.replace("/(auth)/login");
   };

   const SettingItem = ({ icon, label, value, onPress, color = "#F59E0B" }: any) => (
      <TouchableOpacity 
         onPress={onPress}
         className="flex-row items-center justify-between py-4 border-b border-outline-variant/10 active:opacity-70"
      >
         <View className="flex-row items-center gap-4">
            <View className="w-10 h-10 rounded-xl bg-surface-container-highest items-center justify-center">
               <MaterialCommunityIcons name={icon} size={22} color={color} />
            </View>
            <Typography className="text-on-surface font-medium text-base">{label}</Typography>
         </View>
         {value !== undefined ? (
            <Typography className="text-on-surface-variant text-sm">{value}</Typography>
         ) : (
            <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
         )}
      </TouchableOpacity>
   );

   return (
      <Container scrollable className="bg-background pt-12 pb-32">
         {/* Profile Header */}
         <View className="items-center px-6 py-8">
            <View className="relative">
               <View className="w-28 h-28 rounded-[40px] border-4 border-primary-container overflow-hidden p-1 bg-background">
                  <Image 
                     source={{ uri: profile?.photoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3jdD-poSuSANiPR7VgxC9B5ccrozavF_CsDqU_hz9pgdLErGMIjcY7oU1_wM2iqXC14693hLM0pu_ieHOtK9G4pzPT1ZaDeK8N_5RdShmxU2AhBcJGr7VCQWqI-HLJYLTAl9hl6fUyLR8PcgLpOLisTYV4_i1TcX87m3yjXGNCMN7ZIT0jeSRA6JTpZpJCvC66y6yYX98Vwgc9-TQw_MePrtLN8p-c3Lf7WWIoq9Iv59PBV_AjExIUSMhn7VW29vPgNnRtNfxSA" }}
                     className="w-full h-full rounded-[32px]"
                  />
               </View>
               <TouchableOpacity className="absolute bottom-1 right-1 w-8 h-8 bg-primary rounded-full items-center justify-center border-4 border-background active:scale-90">
                  <MaterialCommunityIcons name="camera" size={14} color="#0F172A" />
               </TouchableOpacity>
            </View>
            <Typography variant="h1" className="text-2xl font-bold text-white mt-4">{profile?.username || "Nayem Hossain"}</Typography>
            <Typography className="text-secondary text-sm font-medium">modasir.nayem@gmail.com</Typography>
            
            <TouchableOpacity className="mt-6 px-8 py-2.5 rounded-full border border-primary/30 active:bg-primary/10">
               <Typography className="text-primary font-bold text-xs uppercase tracking-widest">Edit Profile</Typography>
            </TouchableOpacity>
         </View>

         {/* Stats Row */}
         <View className="flex-row px-6 gap-4 mb-8">
            <Card className="flex-1 bg-surface-container rounded-2xl p-4 items-center gap-1 border border-white/5">
               <Typography className="text-primary font-bold text-lg">24</Typography>
               <Typography className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">Meals Taken</Typography>
            </Card>
            <Card className="flex-1 bg-surface-container rounded-2xl p-4 items-center gap-1 border border-white/5">
               <Typography className="text-tertiary font-bold text-lg">৳1,250</Typography>
               <Typography className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">Total Expense</Typography>
            </Card>
            <Card className="flex-1 bg-surface-container rounded-2xl p-4 items-center gap-1 border border-white/5">
               <Typography className="text-secondary font-bold text-lg">3</Typography>
               <Typography className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">Groups</Typography>
            </Card>
         </View>

         <View className="px-6 space-y-8 pb-12">
            {/* Account Group */}
            <View>
               <Typography className="text-primary text-[10px] uppercase font-black tracking-widest mb-4 ml-1">Account & Settings</Typography>
               <Card className="bg-surface-container rounded-3xl px-4 py-2 border border-white/5">
                  <SettingItem icon="shield-check-outline" label="Security & Password" />
                  <SettingItem icon="bell-badge-outline" label="Notifications" value="On" />
                  <SettingItem icon="translate" label="Language" value="English" />
                  <SettingItem icon="theme-light-dark" label="Display Mode" value="Dark" />
               </Card>
            </View>

            {/* Support Group */}
            <View>
               <Typography className="text-primary text-[10px] uppercase font-black tracking-widest mb-4 ml-1">Support & Others</Typography>
               <Card className="bg-surface-container rounded-3xl px-4 py-2 border border-white/5">
                  <SettingItem icon="help-circle-outline" label="Help Center" />
                  <SettingItem icon="file-document-outline" label="Privacy Policy" />
                  <SettingItem icon="star-outline" label="Rate the App" />
               </Card>
            </View>

            {/* Logout */}
            <TouchableOpacity 
               onPress={handleLogout}
               className="flex-row items-center justify-center p-5 bg-error/10 border border-error/20 rounded-3xl active:bg-error/20 transition-all"
            >
               <MaterialCommunityIcons name="logout" size={24} color="#EF4444" />
               <Typography className="text-error font-bold text-base ml-3">Log Out Account</Typography>
            </TouchableOpacity>

            <View className="items-center py-8">
               <Typography className="text-on-surface-variant/40 text-[10px] uppercase font-bold tracking-[0.2em]">Smart Meal v1.0.4 - Built with ❤️</Typography>
            </View>
         </View>
      </Container>
   );
}
