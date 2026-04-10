import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, View } from "react-native";

const MealStatusDot = ({ icon, count, colorClass }: any) => (
   <View className="flex-row items-center gap-1 bg-surface-container-highest/40 px-2 py-1 rounded-lg">
      <MaterialCommunityIcons
         name={icon}
         size={10}
         color={colorClass}
      />
      <Typography className="text-[10px] font-bold text-on-surface">
         {count}
      </Typography>
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

const MembersMealParticipation = ({
   members,
}: MembersMealParticipationProps) => {
   return (
      <View>
         <View className="flex-row justify-between items-center mb-5 mt-4">
            <Typography className="text-xs font-black uppercase tracking-[0.2em] text-primary">
               Member Participation
            </Typography>
            <Typography className="text-[10px] font-bold text-on-surface/90 uppercase">
               Total: {members.length}
            </Typography>
         </View>
         {[...members]
            .sort((a, b) => (a.isMe === b.isMe ? 0 : a.isMe ? -1 : 1))
            .map(
               (
                  { name, avatar, breakfast, lunch, dinner, total, isMe },
                  idx,
               ) => (
                  <View
                     key={idx}
                     className={cn(
                        "flex-row items-center justify-between p-4 rounded-3xl mb-3 border",
                        isMe
                           ? "bg-primary/10 border-primary/30 shadow-sm"
                           : "bg-surface-container border-outline/10",
                     )}
                  >
                     <View className="flex-row items-center gap-3">
                        <View className="relative">
                           <Image
                              source={{ uri: avatar }}
                              className="w-10 h-10 rounded-2xl bg-surface-container-highest"
                           />
                           {isMe && (
                              <View className="absolute -right-1 -top-1 bg-primary w-4 h-4 rounded-full items-center justify-center border-2 border-background">
                                 <MaterialCommunityIcons
                                    name="star"
                                    size={8}
                                    color="white"
                                 />
                              </View>
                           )}
                        </View>
                        <View>
                           <View className="flex-row items-center gap-1.5">
                              <Typography className="font-bold text-on-surface leading-tight text-sm">
                                 {isMe ? "You" : name}
                              </Typography>
                              {isMe && (
                                 <Typography className="text-[8px] bg-primary/20 text-primary px-1.5 rounded-full font-black uppercase">
                                    Me
                                 </Typography>
                              )}
                           </View>
                           <View className="flex-row items-center gap-1 mt-1">
                              <MealStatusDot
                                 icon="weather-sunset"
                                 count={breakfast}
                                 colorClass="#F59E0B"
                              />
                              <MealStatusDot
                                 icon="weather-sunny"
                                 count={lunch}
                                 colorClass="#22C55E"
                              />
                              <MealStatusDot
                                 icon="weather-night"
                                 count={dinner}
                                 colorClass="#ADC6FF"
                              />
                           </View>
                        </View>
                     </View>
                     <View
                        className={cn(
                           "px-4 py-2 rounded-2xl items-center justify-center border",
                           isMe
                              ? "bg-primary border-primary/20"
                              : "bg-surface-container-highest border-outline/10",
                        )}
                     >
                        <Typography
                           className={cn(
                              "text-lg font-black",
                              isMe ? "text-on-primary" : "text-primary",
                           )}
                        >
                           {total}
                        </Typography>
                        <Typography
                           className={cn(
                              "text-[8px] font-black uppercase tracking-widest mt-0.5",
                              isMe ? "text-on-primary/60" : "text-primary/60",
                           )}
                        >
                           Total
                        </Typography>
                     </View>
                  </View>
               ),
            )}
      </View>
   );
};

export default MembersMealParticipation;
