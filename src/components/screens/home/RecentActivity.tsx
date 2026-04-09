import { View, Image, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ActivityItemProps {
   name: string;
   action: string;
   highlight?: string;
   time: string;
   avatar: string;
   onPress?: () => void;
}

const ActivityItem = ({
   name,
   action,
   highlight,
   time,
   avatar,
   onPress,
}: ActivityItemProps) => {
   return (
      <TouchableOpacity
         onPress={onPress}
         className="flex-row items-center gap-4 bg-surface-container-low p-3 rounded-2xl active:opacity-70"
      >
         <Image
            source={{ uri: avatar }}
            className="w-10 h-10 rounded-full object-cover"
         />
         <View className="flex-1">
            <Typography className="text-sm text-on-surface font-medium leading-tight">
               <Typography className="font-bold">{name}</Typography> {action}{" "}
               {highlight && (
                  <Typography className="text-primary font-bold">
                     {highlight}
                  </Typography>
               )}
            </Typography>
            <Typography className="text-[10px] text-amber-300 font-bold mt-1">
               {time}
            </Typography>
         </View>
         <MaterialCommunityIcons
            name="chevron-right"
            size={16}
            color="#94A3B8"
         />
      </TouchableOpacity>
   );
};

export const RecentActivity = () => {
   const activities = [
      {
         name: "Rahim",
         action: "logged",
         highlight: "Dinner",
         time: "2h ago",
         avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB5NJNLVaBEsRdfdndSTECeIiJyvpxb9o8JJLWLD6j65_ZqqGPuNPyHRlpzoA2peyOIwWuMQ-arUw-6ALc7HzN6PNGGHSkvYQPZH9DPJQYKsZBL45wau6GkK17mSScjEp_3IO_u-joF51SoapGo-eoTD0JMXtGMLpeOLCpEjFFFdw_k4WzocGx0_Utqs9MagYCubWzpvyVFWrqZL1KG1q1ZqiFMXtWrBGSRvsaIiVxGrqzA2GC5mgbnJqBbOqKG2bz6eZmDqeNH8Oo",
      },
      {
         name: "Karim",
         action: "added expense",
         highlight: "৳850",
         time: "Yesterday",
         avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAugdjCdQ-fMGmJ5g0Qc5CGhizfugdDwZdx80IiTz9mmfcPfBXA1dAr-MedMcABjlQk8MAJF1LvAVlqt9fhPtZktYhZI8ocBJPa_Edie1dLAfqb255oe2BMGrrisxGZ_2afnflzSV55r5tR_DsY8p_p0Rrg1BrQSbDuc_WkUtz4x6ws8loY-w9joT4kiXH6MuZYtDx_8J3ZOSWfK9JzbHbqdka4MpQvVhQZpO76eRxnXTXmtOwh_qvvurZeWIqmsI5oy69tU1qubq8",
      },
   ];

   return (
      <View className="space-y-4">
         <View className="flex-row items-center justify-between mb-2">
            <Typography
               variant="h3"
               className="font-semibold text-on-surface text-lg"
            >
               Recent Activity
            </Typography>
            <TouchableOpacity>
               <Typography className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  View All
               </Typography>
            </TouchableOpacity>
         </View>
         <View className="space-y-3">
            {activities.map((activity, index) => (
               <ActivityItem
                  key={index}
                  {...activity}
               />
            ))}
         </View>
      </View>
   );
};
