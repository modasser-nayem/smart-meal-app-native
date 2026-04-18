import { View, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MEAL_ICONS = {
   breakfast: { icon: "weather-sunset", color: "#F59E0B" },
   lunch: { icon: "weather-sunny", color: "#22C55E" },
   dinner: { icon: "weather-night", color: "#3B82F6" },
} as const;

const MealDot = ({ icon, count, color }: { icon: string; count: number; color: string }) => (
   <View className="flex-row items-center gap-1 bg-surface px-2 py-1 rounded-lg border border-outline/15">
      <MaterialCommunityIcons name={icon as any} size={10} color={color} />
      <Typography className="text-[10px] font-bold text-on-surface">{count}</Typography>
   </View>
);

interface MembersMealParticipationProps {
   members: {
      id: string;
      name: string;
      role: string;
      avatar: string;
      total: number;
      breakfast: number;
      lunch: number;
      dinner: number;
      isMe?: boolean;
   }[];
}

const MembersMealParticipation = ({ members }: MembersMealParticipationProps) => {
   return (
      <View>
         <View className="flex-row justify-between items-center mb-4 mt-2">
            <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
               Member Participation
            </Typography>
            <Typography className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">
               {members.length} members
            </Typography>
         </View>

         {[...members]
            .sort((a, b) => (a.isMe === b.isMe ? 0 : a.isMe ? -1 : 1))
            .map(({ id, name, avatar, breakfast, lunch, dinner, total, isMe }) => (
               <View
                  key={id}
                  className={`flex-row items-center justify-between px-4 py-4 rounded-3xl mb-3 border ${
                     isMe
                        ? "bg-primary/5 border-primary/20"
                        : "bg-surface-container border-outline/10"
                  }`}
               >
                  {/* Left — avatar + name + meal dots */}
                  <View className="flex-row items-center gap-3 flex-1">
                     <View className="relative">
                        <View className="w-11 h-11 rounded-2xl overflow-hidden bg-surface border border-outline/20">
                           <Image
                              source={{ uri: avatar }}
                              className="w-full h-full"
                              resizeMode="cover"
                           />
                        </View>
                        {isMe && (
                           <View className="absolute -right-1 -top-1 bg-primary w-4 h-4 rounded-full items-center justify-center border-2 border-background">
                              <MaterialCommunityIcons name="star" size={8} color="#0F172A" />
                           </View>
                        )}
                     </View>

                     <View className="flex-1 min-w-0">
                        <View className="flex-row items-center gap-1.5 mb-1">
                           <Typography
                              className="text-on-surface font-bold text-sm"
                              numberOfLines={1}
                           >
                              {isMe ? "You" : name}
                           </Typography>
                           {isMe && (
                              <View className="bg-primary/15 px-1.5 py-0.5 rounded-full">
                                 <Typography className="text-primary text-[8px] font-black uppercase">
                                    Me
                                 </Typography>
                              </View>
                           )}
                        </View>
                        <View className="flex-row items-center gap-1">
                           <MealDot
                              icon={MEAL_ICONS.breakfast.icon}
                              count={breakfast}
                              color={MEAL_ICONS.breakfast.color}
                           />
                           <MealDot
                              icon={MEAL_ICONS.lunch.icon}
                              count={lunch}
                              color={MEAL_ICONS.lunch.color}
                           />
                           <MealDot
                              icon={MEAL_ICONS.dinner.icon}
                              count={dinner}
                              color={MEAL_ICONS.dinner.color}
                           />
                        </View>
                     </View>
                  </View>

                  {/* Right — total badge */}
                  <View
                     className={`w-12 h-12 rounded-2xl items-center justify-center border ${
                        isMe ? "bg-primary border-primary/30" : "bg-surface border-outline/15"
                     }`}
                  >
                     <Typography
                        className={`text-lg font-extrabold ${isMe ? "text-background" : "text-primary"}`}
                     >
                        {total}
                     </Typography>
                     <Typography
                        className={`text-[8px] font-black uppercase tracking-widest ${
                           isMe ? "text-secondary-600" : "text-secondary-400"
                        }`}
                     >
                        meals
                     </Typography>
                  </View>
               </View>
            ))}
      </View>
   );
};

export default MembersMealParticipation;
