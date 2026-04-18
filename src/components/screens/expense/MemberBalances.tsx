import { View, TouchableOpacity, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/colors";

export interface MemberBalance {
   id: string;
   name: string;
   initials: string;
   avatar?: string;
   meals: number;
   cost: number;
   paid: number;
   balance: number;
}

export const MemberBalances = ({ balances }: { balances: MemberBalance[] }) => {
   const { t } = useTranslation("expense");

   return (
      <View className="px-5 mt-5">
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
               {t("balances.title")}
            </Typography>
            <Typography className="text-secondary-400 text-[10px] font-bold uppercase tracking-widest">
               {t("balances.members", { count: balances.length })}
            </Typography>
         </View>

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline">
            {balances.map((member, index) => {
               const isSurplus = member.balance >= 0;
               return (
                  <TouchableOpacity
                     key={member.id}
                     activeOpacity={0.75}
                     className={`px-4 py-4 border-l-[3px] active:bg-surface ${isSurplus ? "border-l-success" : "border-l-error"} ${index < balances.length - 1 ? "border-b border-outline" : ""}`}
                  >
                     <View className="flex-row items-center gap-3">
                        {member.avatar ? (
                           <View
                              className={`w-10 h-10 rounded-full overflow-hidden border-2 ${isSurplus ? "border-success/40" : "border-error/40"}`}
                           >
                              <Image
                                 source={{ uri: member.avatar }}
                                 className="w-full h-full"
                                 resizeMode="cover"
                              />
                           </View>
                        ) : (
                           <View
                              className={`w-10 h-10 rounded-full items-center justify-center ${isSurplus ? "bg-success/15" : "bg-error/15"}`}
                           >
                              <Typography
                                 className={`text-sm font-extrabold ${isSurplus ? "text-success" : "text-error"}`}
                              >
                                 {member.initials}
                              </Typography>
                           </View>
                        )}
                        <Typography className="text-on-surface font-bold text-[15px] flex-1">
                           {member.name}
                        </Typography>
                        <View
                           className={`px-3 py-1.5 rounded-xl ${isSurplus ? "bg-accent/10" : "bg-error/10"}`}
                        >
                           <Typography
                              className={`text-base font-extrabold tracking-tight ${isSurplus ? "text-success" : "text-error"}`}
                           >
                              {isSurplus ? "+" : "-"}৳{Math.abs(member.balance)}
                           </Typography>
                        </View>
                     </View>

                     <View className="flex-row justify-between gap-2 mt-3">
                        {[
                           {
                              icon: "silverware-fork-knife",
                              label: t("stats.meals"),
                              value: String(member.meals),
                           },
                           {
                              icon: "calculator-variant-outline",
                              label: t("stats.cost"),
                              value: `৳${member.cost.toLocaleString()}`,
                           },
                           {
                              icon: "cash-check",
                              label: t("stats.paid"),
                              value: `৳${member.paid.toLocaleString()}`,
                           },
                        ].map(({ icon, label, value }) => (
                           <View
                              key={label}
                              className="flex-row items-center gap-1 bg-surface px-2.5 py-1 rounded-lg"
                           >
                              <MaterialCommunityIcons
                                 name={icon as any}
                                 size={11}
                                 color={Colors.icon.dim}
                              />
                              <Typography className="text-secondary-400 text-[11px]">
                                 {label}{" "}
                                 <Typography className="text-secondary-300 text-[11px] font-bold">
                                    {value}
                                 </Typography>
                              </Typography>
                           </View>
                        ))}
                     </View>
                  </TouchableOpacity>
               );
            })}
         </View>
      </View>
   );
};
