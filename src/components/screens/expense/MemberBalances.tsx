import { View, TouchableOpacity, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

interface MemberBalancesProps {
   balances: MemberBalance[];
}

export const MemberBalances = ({ balances }: MemberBalancesProps) => {
   return (
      <View className="px-5 mt-5">
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
               Member Balances
            </Typography>
            <Typography className="text-secondary-400 text-[10px] font-bold uppercase tracking-widest">
               {balances.length} members
            </Typography>
         </View>

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline">
            {balances.map((member, index) => {
               const isSurplus = member.balance >= 0;
               return (
                  <TouchableOpacity
                     key={member.id}
                     activeOpacity={0.75}
                     className={`px-4 py-4 border-l-[3px] active:bg-surface ${
                        isSurplus ? "border-l-success" : "border-l-error"
                     } ${index < balances.length - 1 ? "border-b border-outline" : ""}`}
                  >
                     {/* Top row — avatar + name + balance */}
                     <View className="flex-row items-center gap-3">
                        {/* Avatar — image if available, initials fallback */}
                        {member.avatar ? (
                           <View
                              className={`w-10 h-10 rounded-full overflow-hidden border-2 ${
                                 isSurplus ? "border-success/40" : "border-error/40"
                              }`}
                           >
                              <Image
                                 source={{ uri: member.avatar }}
                                 className="w-full h-full"
                                 resizeMode="cover"
                              />
                           </View>
                        ) : (
                           <View
                              className={`w-10 h-10 rounded-full items-center justify-center ${
                                 isSurplus ? "bg-success/15" : "bg-error/15"
                              }`}
                           >
                              <Typography
                                 className={`text-sm font-extrabold ${
                                    isSurplus ? "text-success" : "text-error"
                                 }`}
                              >
                                 {member.initials}
                              </Typography>
                           </View>
                        )}

                        {/* Name */}
                        <Typography className="text-on-surface font-bold text-[15px] flex-1">
                           {member.name}
                        </Typography>

                        {/* Balance pill */}
                        <View
                           className={`px-3 py-1.5 rounded-xl ${
                              isSurplus ? "bg-success/10" : "bg-error/10"
                           }`}
                        >
                           <Typography
                              className={`text-base font-extrabold tracking-tight ${
                                 isSurplus ? "text-success" : "text-error"
                              }`}
                           >
                              {isSurplus ? "+" : "-"}৳{Math.abs(member.balance)}
                           </Typography>
                        </View>
                     </View>

                     {/* Bottom row — 3 stat chips */}
                     <View className="flex-row justify-between gap-2 mt-3">
                        <View className="flex-row items-center gap-1 bg-surface px-2.5 py-1 rounded-lg">
                           <MaterialCommunityIcons
                              name="silverware-fork-knife"
                              size={11}
                              color="#64748B"
                           />
                           <Typography className="text-secondary-400 text-[11px]">
                              {member.meals}{" "}
                              <Typography className="text-secondary-300 text-[11px] font-bold">
                                 meals
                              </Typography>
                           </Typography>
                        </View>
                        <View className="flex-row items-center gap-1 bg-surface px-2.5 py-1 rounded-lg">
                           <MaterialCommunityIcons
                              name="calculator-variant-outline"
                              size={11}
                              color="#64748B"
                           />
                           <Typography className="text-secondary-400 text-[11px]">
                              Cost{" "}
                              <Typography className="text-secondary-300 text-[11px] font-bold">
                                 ৳{member.cost.toLocaleString()}
                              </Typography>
                           </Typography>
                        </View>
                        <View className="flex-row items-center gap-1 bg-surface px-2.5 py-1 rounded-lg">
                           <MaterialCommunityIcons name="cash-check" size={11} color="#64748B" />
                           <Typography className="text-secondary-400 text-[11px]">
                              Paid{" "}
                              <Typography className="text-secondary-300 text-[11px] font-bold">
                                 ৳{member.paid.toLocaleString()}
                              </Typography>
                           </Typography>
                        </View>
                     </View>
                  </TouchableOpacity>
               );
            })}
         </View>
      </View>
   );
};
