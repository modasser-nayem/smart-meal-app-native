import { View, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Colors } from "@/constants/colors";

interface GroupInfoCardProps {
   groupName: string;
   location: string;
   groupCode: string;
   groupPhoto?: string;
   memberCount: number;
   activeCount: number;
   pendingCount: number;
   billingMonth: string;
   isOwner: boolean;
   isMonthOpen?: boolean;
   onEditGroup?: () => void;
   onCopyCode?: () => void;
}

export const GroupInfoCard = ({
   groupName,
   location,
   groupCode,
   groupPhoto,
   memberCount,
   activeCount,
   pendingCount,
   billingMonth,
   isOwner,
   isMonthOpen = true,
   onEditGroup,
   onCopyCode,
}: GroupInfoCardProps) => {
   const { t } = useTranslation("group");
   return (
      <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
         {/* Amber top accent */}
         <View className="h-[3px] bg-primary w-full" />

         <View className="p-5 gap-4">
            {/* Identity row */}
            <View className="flex-row items-start gap-4">
               {/* Group photo or emoji fallback */}
               <View className="w-16 h-16 rounded-2xl overflow-hidden bg-primary/10 border border-primary/20 items-center justify-center flex-shrink-0">
                  {groupPhoto ? (
                     <Image
                        source={{ uri: groupPhoto }}
                        className="w-full h-full"
                        resizeMode="cover"
                     />
                  ) : (
                     <Typography className="text-3xl">🏠</Typography>
                  )}
               </View>

               {/* Name + meta */}
               <View className="flex-1">
                  <View className="flex-row items-start justify-between gap-2">
                     <Typography className="text-on-surface text-xl font-extrabold tracking-tight leading-tight flex-1">
                        {groupName}
                     </Typography>
                     {isOwner && (
                        <TouchableOpacity
                           onPress={onEditGroup}
                           activeOpacity={0.75}
                           className="flex-row items-center gap-1 bg-surface border border-outline/20 px-2.5 py-1.5 rounded-xl active:scale-95"
                        >
                           <MaterialCommunityIcons
                              name="pencil-outline"
                              size={13}
                              color={Colors.icon.subtle}
                           />
                           <Typography className="text-secondary-300 text-[11px] font-bold">
                              {t("info.edit")}
                           </Typography>
                        </TouchableOpacity>
                     )}
                  </View>

                  <View className="flex-row items-center gap-1 mt-1">
                     <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={12}
                        color={Colors.icon.dim}
                     />
                     <Typography className="text-secondary-400 text-xs">{location}</Typography>
                  </View>

                  {/* Status pills row */}
                  <View className="flex-row items-center gap-2 mt-2 flex-wrap">
                     <View className="flex-row items-center gap-1">
                        <View className="w-1.5 h-1.5 rounded-full bg-success" />
                        <Typography className="text-accent text-[10px] font-bold uppercase tracking-widest">
                           {t("info.active")}
                        </Typography>
                     </View>
                     <View className="w-px h-3 bg-outline/30" />
                     <Typography className="text-secondary-400 text-[10px]">
                        {billingMonth}
                     </Typography>
                     <View className="w-px h-3 bg-outline/30" />
                     <View
                        className={`flex-row items-center gap-1 px-2 py-0.5 rounded-full ${
                           isMonthOpen ? "bg-primary/10" : "bg-surface"
                        }`}
                     >
                        <MaterialCommunityIcons
                           name={isMonthOpen ? "lock-open-outline" : "lock-outline"}
                           size={10}
                           color={isMonthOpen ? "#F59E0B" : "#64748B"}
                        />
                        <Typography
                           className={`text-[9px] font-black uppercase tracking-widest ${
                              isMonthOpen ? "text-primary" : "text-secondary-400"
                           }`}
                        >
                           {isMonthOpen ? t("info.open") : t("info.closed")}
                        </Typography>
                     </View>
                  </View>
               </View>
            </View>

            {/* Stats strip */}
            <View className="flex-row bg-surface rounded-2xl overflow-hidden border border-outline/10">
               {[
                  { value: memberCount, label: t("info.members"), color: "text-on-surface" },
                  { value: activeCount, label: t("info.active"), color: "text-success" },
                  { value: pendingCount, label: t("info.pending"), color: "text-primary" },
               ].map((stat, i) => (
                  <View
                     key={stat.label}
                     className={`flex-1 items-center py-3.5 gap-0.5 ${
                        i > 0 ? "border-l border-outline/10" : ""
                     }`}
                  >
                     <Typography className={`text-xl font-extrabold ${stat.color}`}>
                        {stat.value}
                     </Typography>
                     <Typography className="text-secondary-400 text-[10px] font-bold uppercase tracking-widest">
                        {stat.label}
                     </Typography>
                  </View>
               ))}
            </View>

            {/* Group code */}
            <View className="flex-row items-center justify-between bg-surface rounded-2xl px-4 py-3.5 border border-outline/15">
               <View>
                  <Typography className="text-secondary-400 text-[9px] font-bold uppercase tracking-widest mb-0.5">
                     {t("info.groupCode")}
                  </Typography>
                  <Typography className="text-on-surface font-mono text-lg font-extrabold tracking-widest">
                     {groupCode}
                  </Typography>
                  <Typography className="text-secondary-400 text-[10px] mt-0.5">
                     {t("info.groupCodeHint")}
                  </Typography>
               </View>
               <TouchableOpacity
                  onPress={onCopyCode}
                  activeOpacity={0.75}
                  className="flex-row items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-2.5 rounded-xl active:scale-95"
               >
                  <MaterialCommunityIcons
                     name="content-copy"
                     size={15}
                     color={Colors.icon.primary}
                  />
                  <Typography className="text-primary text-xs font-bold">
                     {t("actions.copy")}
                  </Typography>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};
