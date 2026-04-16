import { View, TouchableOpacity, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

interface MemberBalance {
   name: string;
   meals: number;
   cost: string;
   paid: string;
   amount: string;
   isPositive: boolean;
   avatar: string;
}

interface MemberBalancesProps {
   balances: MemberBalance[];
}

export const MemberBalances = ({ balances }: MemberBalancesProps) => {
   return (
      <View className="px-6 mb-8">
         <View className="flex-row justify-between items-center mb-4">
            <Typography className="text-sm font-bold uppercase tracking-widest text-primary">
               Member Balances
            </Typography>
            <Typography className="text-[11px] font-medium text-on-surface/80">
               Real-time stats
            </Typography>
         </View>

         <View className="space-y-3">
            {balances.map((member, i) => (
               <TouchableOpacity
                  key={i}
                  className={cn(
                     "bg-surface-container rounded-2xl p-4 flex-row items-center justify-between border-l-4 active:bg-surface-container-high transition-all mb-3",
                     member.isPositive ? "border-success" : "border-error"
                  )}
               >
                  <View className="flex-row items-center gap-3">
                     <Image
                        source={{ uri: member.avatar }}
                        className="w-10 h-10 rounded-full border border-outline/60 grayscale"
                     />
                     <View>
                        <Typography className="font-bold text-on-surface leading-tight">
                           {member.name}
                        </Typography>
                        <View className="flex-row items-center gap-2 mt-1">
                           <Typography className="text-[10px] text-on-surface/60 font-medium">
                              Meals: <Typography className="text-on-surface/80">{member.meals}</Typography>
                           </Typography>
                           <Typography className="text-[10px] text-on-surface/70">•</Typography>
                           <Typography className="text-[10px] text-on-surface/60 font-medium">
                              Cost: <Typography className="text-on-surface/80">৳{member.cost}</Typography>
                           </Typography>
                        </View>
                     </View>
                  </View>
                  <View className="items-end">
                     <Typography className="text-[10px] text-on-surface/80 uppercase tracking-tighter mb-0.5">
                        Paid: ৳{member.paid}
                     </Typography>
                     <Typography className={cn("text-lg font-extrabold", member.isPositive ? "text-success" : "text-error")}>
                        {member.amount}
                     </Typography>
                  </View>
               </TouchableOpacity>
            ))}
         </View>
      </View>
   );
};
