import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGetGroupsQuery } from "@/api/groupApi";
import { cn } from "@/lib/utils";
   
export default function GroupScreen() {
   const { data: groups, isLoading } = useGetGroupsQuery();
   const activeGroup = groups?.[0]; // Default to first group for now

   return (
      <Container scrollable className="bg-background pt-12 pb-32">
         {/* TopAppBar */}
         <View className="flex-row justify-between items-center px-4 h-16 w-full">
            <View className="flex-row items-center gap-3">
               <View className="w-10 h-10 rounded-2xl bg-primary/10 items-center justify-center">
                  <MaterialCommunityIcons name="account-group" size={24} color="#F59E0B" />
               </View>
               <View>
                  <Typography className="text-white text-lg font-bold">{activeGroup?.name || "Bachelor House"}</Typography>
                  <Typography className="text-secondary text-[10px] uppercase font-bold tracking-widest">Active Group</Typography>
               </View>
            </View>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-surface-container items-center justify-center active:scale-95">
               <MaterialCommunityIcons name="cog-outline" size={24} color="#94A3B8" />
            </TouchableOpacity>
         </View>

         <View className="px-6 mt-6 mb-8">
            <Card className="bg-surface-container-high rounded-3xl p-6 border-l-4 border-primary">
               <View className="flex-row justify-between items-center mb-6">
                  <View>
                     <Typography className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mb-1">Invite Code</Typography>
                     <View className="flex-row items-center gap-3 bg-background/50 px-4 py-2 rounded-xl">
                        <Typography className="text-primary font-mono text-lg font-bold">BH-4290</Typography>
                        <MaterialCommunityIcons name="content-copy" size={20} color="#F59E0B" />
                     </View>
                  </View>
                  <TouchableOpacity className="bg-primary px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95">
                     <Typography className="text-on-primary font-bold">Invite</Typography>
                  </TouchableOpacity>
               </View>
               
               <View className="flex-row justify-between pt-6 border-t border-outline-variant/10">
                  <View className="items-center">
                     <Typography className="text-xl font-bold text-white">12</Typography>
                     <Typography className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tight">Members</Typography>
                  </View>
                  <View className="w-[1px] h-8 bg-outline-variant/20 self-center" />
                  <View className="items-center">
                     <Typography className="text-xl font-bold text-tertiary">9</Typography>
                     <Typography className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tight">Active</Typography>
                  </View>
                  <View className="w-[1px] h-8 bg-outline-variant/20 self-center" />
                  <View className="items-center">
                     <Typography className="text-xl font-bold text-orange-400">3</Typography>
                     <Typography className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tight">Pending</Typography>
                  </View>
               </View>
            </Card>
         </View>

         {/* Member List */}
         <View className="px-6">
            <View className="flex-row items-center justify-between mb-6">
               <Typography variant="h2" className="text-xl font-bold text-white">Members</Typography>
               <Typography className="text-primary text-xs font-bold uppercase tracking-widest">Manage</Typography>
            </View>

            <View className="space-y-4">
               {[
                  { name: "Rahim Ahmed", role: "Owner", status: "Active", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5NJNLVaBEsRdfdndSTECeIiJyvpxb9o8JJLWLD6j65_ZqqGPuNPyHRlpzoA2peyOIwWuMQ-arUw-6ALc7HzN6PNGGHSkvYQPZH9DPJQYKsZBL45wau6GkK17mSScjEp_3IO_u-joF51SoapGo-eoTD0JMXtGMLpeOLCpEjFFFdw_k4WzocGx0_Utqs9MagYCubWzpvyVFWrqZL1KG1q1ZqiFMXtWrBGSRvsaIiVxGrqzA2GC5mgbnJqBbOqKG2bz6eZmDqeNH8Oo" },
                  { name: "Karim Ullah", role: "Manager", status: "Active", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAugdjCdQ-fMGmJ5g0Qc5CGhizfugdDwZdx80IiTz9mmfcPfBXA1dAr-MedMcABjlQk8MAJF1LvAVlqt9fhPtZktYhZI8ocBJPa_Edie1dLAfqb255oe2BMGrrisxGZ_2afnflzSV55r5tR_DsY8p_p0Rrg1BrQSbDuc_WkUtz4x6ws8loY-w9joT4kiXH6MuZYtDx_8J3ZOSWfK9JzbHbqdka4MpQvVhQZpO76eRxnXTXmtOwh_qvvurZeWIqmsI5oy69tU1qubq8" },
                  { name: "Jabed Khan", role: "Member", status: "Inactive", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC2YQ4Y9Z2p9I-_M7wPzQZ9O_J7_-9P-h_VzU-L_Y_j_T-V_Z-X-Y-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-" },
               ].map((member, i) => (
                  <Card key={i} className="bg-surface-container rounded-2xl p-4 flex-row items-center gap-4 border border-white/5 active:bg-surface-container-high transition-all">
                     <View className="relative">
                        <Image source={{ uri: member.icon }} className="w-14 h-14 rounded-2xl" />
                        <View className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface-container", member.status === "Active" ? "bg-tertiary" : "bg-outline-variant")} />
                     </View>
                     <View className="flex-1">
                        <Typography className="text-white font-bold text-base">{member.name}</Typography>
                        <View className="flex-row items-center gap-2 mt-1">
                           <View className={cn("px-2 py-0.5 rounded-md", member.role === "Owner" ? "bg-primary/20" : "bg-secondary-container/20")}>
                              <Typography className={cn("text-[8px] font-black uppercase tracking-tighter", member.role === "Owner" ? "text-primary" : "text-secondary")}>{member.role}</Typography>
                           </View>
                           <Typography className="text-on-surface-variant text-[10px] font-bold uppercase">• Active now</Typography>
                        </View>
                     </View>
                     <TouchableOpacity className="w-10 h-10 items-center justify-center">
                        <MaterialCommunityIcons name="dots-vertical" size={20} color="#94A3B8" />
                     </TouchableOpacity>
                  </Card>
               ))}
            </View>
         </View>

         {/* Pending Invites */}
         <View className="px-6 mt-12 pb-20">
            <Typography variant="h2" className="text-xl font-bold text-white mb-6">Pending Invites</Typography>
            <Card className="bg-surface-container-low/40 rounded-2xl p-6 border border-dashed border-outline-variant/30 items-center justify-center border-spacing-4">
               <View className="w-16 h-16 rounded-3xl bg-surface-container items-center justify-center mb-4">
                  <MaterialCommunityIcons name="email-open-outline" size={32} color="#94A3B8" className="opacity-40" />
               </View>
               <Typography className="text-on-surface-variant text-center font-medium">No pending invitations</Typography>
               <Typography className="text-[10px] text-outline/60 text-center uppercase tracking-widest mt-1 font-bold">Invite members to collaborate</Typography>
            </Card>
         </View>
      </Container>
   );
}
