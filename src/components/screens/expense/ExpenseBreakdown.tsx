import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ExpenseBreakdown = () => {
   return (
      <View className="px-6 mb-8">
         <Card className="bg-surface-container rounded-3xl p-6">
            <Typography className="text-sm font-bold uppercase tracking-widest text-[#ffc174] mb-6">
               Expense Breakdown
            </Typography>

            <View className="space-y-4 mb-6">
               {/* Meal Expense */}
               <View>
                  <View className="flex-row justify-between items-end mb-2">
                     <Typography className="text-sm font-medium text-on-surface/80">
                        Meal Expense
                     </Typography>
                     <Typography className="text-lg font-bold text-primary">
                        ৳4,550
                     </Typography>
                  </View>
                  <View className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden">
                     <View
                        className="h-full bg-primary rounded-full"
                        style={{ width: "85%" }}
                     />
                  </View>
               </View>

               {/* Shared / Group Expense */}
               <View>
                  <View className="flex-row justify-between items-end mb-2">
                     <Typography className="text-sm font-medium text-on-surface/80">
                        Shared/Group Expense
                     </Typography>
                     <Typography className="text-lg font-bold text-secondary">
                        ৳815
                     </Typography>
                  </View>
                  <View className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden">
                     <View
                        className="h-full bg-secondary rounded-full"
                        style={{ width: "15%" }}
                     />
                  </View>
               </View>
            </View>

            <View className="bg-surface-container p-4 rounded-2xl flex-row items-center gap-3">
               <MaterialCommunityIcons
                  name="information-outline"
                  size={20}
                  color="rgba(216, 195, 173, 0.4)"
               />
               <Typography className="text-[13px] text-on-surface-variant/60 flex-1">
                  Shared Cost per Member:{" "}
                  <Typography className="text-on-surface font-semibold">
                     ৳101.88
                  </Typography>
               </Typography>
            </View>
         </Card>
      </View>
   );
};
