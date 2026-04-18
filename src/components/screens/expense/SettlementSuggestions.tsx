import { View, TouchableOpacity, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export interface Settlement {
   id: string;
   sender: string;
   senderInitials: string;
   senderAvatar?: string;
   receiver: string;
   receiverInitials: string;
   receiverAvatar?: string;
   amount: number;
   settled: boolean;
}

interface SettlementSuggestionsProps {
   settlements: Settlement[];
   onMarkSettled?: (id: string) => void;
}

export const SettlementSuggestions = ({
   settlements,
   onMarkSettled,
}: SettlementSuggestionsProps) => {
   const pending = settlements.filter((s) => !s.settled);
   const done = settlements.filter((s) => s.settled);
   const totalOutstanding = pending.reduce((sum, s) => sum + s.amount, 0);

   if (settlements.length === 0) return null;

   return (
      <View className="px-5 mt-5">
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
               Settlements
            </Typography>
            {totalOutstanding > 0 && (
               <View className="flex-row items-center gap-1.5 bg-error/10 border border-error/20 px-2.5 py-1 rounded-full">
                  <Typography className="text-error text-[10px] font-black uppercase tracking-widest">
                     ৳{totalOutstanding} outstanding
                  </Typography>
               </View>
            )}
         </View>

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline">
            {pending.map((s, index) => (
               <View
                  key={s.id}
                  className={`px-4 py-4 ${
                     index < pending.length - 1 || done.length > 0 ? "border-b border-outline" : ""
                  }`}
               >
                  {/* Transfer row */}
                  <View className="flex-row items-center mb-3">
                     {/* Sender */}
                     <View className="items-center">
                        {s.senderAvatar ? (
                           <View className="w-10 h-10 rounded-full overflow-hidden border-2 border-error/40 mb-1">
                              <Image
                                 source={{ uri: s.senderAvatar }}
                                 className="w-full h-full"
                                 resizeMode="cover"
                              />
                           </View>
                        ) : (
                           <View className="w-10 h-10 rounded-full bg-error/15 items-center justify-center mb-1">
                              <Typography className="text-error text-sm font-extrabold">
                                 {s.senderInitials}
                              </Typography>
                           </View>
                        )}
                        <Typography className="text-on-surface text-xs font-bold">
                           {s.sender}
                        </Typography>
                        <Typography className="text-error text-[9px] font-bold uppercase tracking-widest">
                           Sends
                        </Typography>
                     </View>

                     {/* Arrow */}
                     <View className="flex-1 items-center px-3">
                        <View className="flex-row items-center gap-1">
                           <View className="flex-1 h-px bg-outline/20" />
                           <MaterialCommunityIcons name="arrow-right" size={18} color={Colors.icon.primary} />
                           <View className="flex-1 h-px bg-outline/20" />
                        </View>
                        <View className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mt-2">
                           <Typography className="text-primary font-extrabold text-base tracking-tight">
                              ৳{s.amount}
                           </Typography>
                        </View>
                     </View>

                     {/* Receiver */}
                     <View className="items-center">
                        {s.receiverAvatar ? (
                           <View className="w-10 h-10 rounded-full overflow-hidden border-2 border-success/40 mb-1">
                              <Image
                                 source={{ uri: s.receiverAvatar }}
                                 className="w-full h-full"
                                 resizeMode="cover"
                              />
                           </View>
                        ) : (
                           <View className="w-10 h-10 rounded-full bg-success/15 items-center justify-center mb-1">
                              <Typography className="text-success text-sm font-extrabold">
                                 {s.receiverInitials}
                              </Typography>
                           </View>
                        )}
                        <Typography className="text-on-surface text-xs font-bold">
                           {s.receiver}
                        </Typography>
                        <Typography className="text-success text-[9px] font-bold uppercase tracking-widest">
                           Receives
                        </Typography>
                     </View>
                  </View>

                  {/* Mark settled button */}
                  <TouchableOpacity
                     onPress={() => onMarkSettled?.(s.id)}
                     activeOpacity={0.8}
                     className="flex-row items-center justify-center gap-2 border border-success/30 bg-success/5 py-2.5 rounded-xl active:bg-accent/10"
                  >
                     <MaterialCommunityIcons
                        name="check-circle-outline"
                        size={16}
                        color={Colors.icon.success}
                     />
                     <Typography className="text-success text-sm font-bold">
                        Mark as Settled
                     </Typography>
                  </TouchableOpacity>
               </View>
            ))}

            {/* Settled items */}
            {done.map((s, index) => (
               <View
                  key={s.id}
                  className={`flex-row items-center gap-3 px-4 py-3 opacity-40 ${
                     index < done.length - 1 ? "border-b border-outline/10" : ""
                  }`}
               >
                  <View className="flex-row items-center gap-2 flex-1">
                     <View className="w-7 h-7 rounded-full bg-surface items-center justify-center">
                        <Typography className="text-secondary-400 text-[10px] font-bold">
                           {s.senderInitials}
                        </Typography>
                     </View>
                     <MaterialCommunityIcons name="arrow-right" size={14} color={Colors.icon.muted} />
                     <View className="w-7 h-7 rounded-full bg-surface items-center justify-center">
                        <Typography className="text-secondary-400 text-[10px] font-bold">
                           {s.receiverInitials}
                        </Typography>
                     </View>
                     <Typography className="text-secondary-400 text-sm">
                        {s.sender} → {s.receiver} · ৳{s.amount}
                     </Typography>
                  </View>
                  <View className="flex-row items-center gap-1">
                     <MaterialCommunityIcons name="check-circle" size={14} color={Colors.icon.success} />
                     <Typography className="text-accent text-[10px] font-bold uppercase tracking-widest">
                        Settled
                     </Typography>
                  </View>
               </View>
            ))}
         </View>
      </View>
   );
};
