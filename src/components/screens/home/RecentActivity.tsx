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

const ActivityItem = ({ name, action, highlight, time, avatar, onPress }: ActivityItemProps) => (
   <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="flex-row items-center gap-3 bg-surface-container px-4 py-3.5 rounded-2xl border border-outline/10 active:bg-surface"
   >
      <View className="w-10 h-10 rounded-full overflow-hidden bg-surface border border-outline/20">
         <Image source={{ uri: avatar }} className="w-full h-full" resizeMode="cover" />
      </View>
      <View className="flex-1">
         <Typography className="text-sm text-on-surface font-medium leading-snug">
            <Typography className="text-on-surface font-bold text-sm">{name}</Typography> {action}{" "}
            {highlight && (
               <Typography className="text-primary font-bold text-sm">{highlight}</Typography>
            )}
         </Typography>
         <Typography className="text-secondary-400 text-[10px] font-medium mt-0.5">
            {time}
         </Typography>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={16} color="#334155" />
   </TouchableOpacity>
);

const EmptyActivity = () => (
   <View className="bg-surface-container rounded-2xl border border-outline/10 px-4 py-10 items-center gap-3">
      <View className="w-12 h-12 rounded-2xl bg-surface items-center justify-center">
         <MaterialCommunityIcons name="timeline-outline" size={24} color="#334155" />
      </View>
      <Typography className="text-secondary-400 text-sm text-center">
         No activity yet today
      </Typography>
   </View>
);

interface RecentActivityProps {
   activities?: ActivityItemProps[];
   onViewAll?: () => void;
}

export const RecentActivity = ({ activities, onViewAll }: RecentActivityProps) => {
   const items: ActivityItemProps[] = activities || [
      {
         name: "Rahim",
         action: "logged",
         highlight: "Dinner",
         time: "2h ago",
         avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDl711jqMydNZDs9MR4r5IU6X6tIkdXRkpdJGhw9FW7wC5aaXCIz0htr_Z6xfeyFQPjgNPnVad97EMKT7l_jF_KUlroc0U7QixBHDYHKl8gfL15L1flf_DlC50nIhkofmARXCCgwJU1IQw5aIW6vFToIt95VxFoNGIYoRoKn1YGgqf6hOwqDnqxp1z3KXOLCw0FB_MXveGot-scuFK6-dpecNXscA2Kd0QfvV3auR2S-JOaYPLlcvbDmS1yAa6lUlv46QB23e0dfsw",
      },
      {
         name: "Karim",
         action: "added expense",
         highlight: "৳850",
         time: "Yesterday",
         avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCmnaGLcUymCqtbhNMsybCsB1NEtlNmcbPQbTSWPa5VIzEqJv3cb2qbQWxjcmiT5zlLm0Vnjg7lVem1dWwGqa7ltQ8QWGbdF07SND3u7oYE7flB8Y2SL2PE8OquFyPC242FBNEJLvf2oeBU1K4AWzVXhXiPCmfGct_X6Wy4avYaMIYTD5BWEjOiAIFhbnK8mlSLmQRk7UFyZ0Gxuq7jOUjHWYb5oPVsOrsDFFXJf32tWNLPDqaUEn7wyN5YEzk0kHUef5DMnw7zqqg",
      },
   ];

   return (
      <View>
         {/* Section header */}
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
               Recent Activity
            </Typography>
            <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
               <Typography className="text-primary text-[11px] font-bold uppercase tracking-widest">
                  View All
               </Typography>
            </TouchableOpacity>
         </View>

         {items.length === 0 ? (
            <EmptyActivity />
         ) : (
            <View className="gap-2.5">
               {items.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
               ))}
            </View>
         )}
      </View>
   );
};
