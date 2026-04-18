import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Colors } from "@/constants/colors";

interface QuickAction {
   icon: string;
   label: string;
   onPress: () => void;
   color: string;
   bg: string;
   badge?: number;
}

interface GroupQuickActionsProps {
   isOwner: boolean;
   pendingRequests: number;
   onInviteMember: () => void;
   onPostNotice: () => void;
   onViewBilling: () => void;
   onManageRequests: () => void;
}

export const GroupQuickActions = ({
   isOwner,
   pendingRequests,
   onInviteMember,
   onPostNotice,
   onViewBilling,
   onManageRequests,
}: GroupQuickActionsProps) => {
   const actions: QuickAction[] = [
      {
         icon: "account-plus-outline",
         label: "Invite",
         onPress: onInviteMember,
         color: Colors.icon.primary,
         bg: "bg-primary/10",
      },
      {
         icon: "bullhorn-outline",
         label: "Notice",
         onPress: onPostNotice,
         color: Colors.icon.info,
         bg: "bg-info/10",
      },
      {
         icon: "wallet-outline",
         label: "Billing",
         onPress: onViewBilling,
         color: Colors.icon.success,
         bg: "bg-accent/10",
      },
      {
         icon: "account-clock-outline",
         label: "Requests",
         onPress: onManageRequests,
         color: Colors.icon.primary,
         bg: "bg-primary/10",
         badge: pendingRequests,
      },
   ];

   return (
      <View className="flex-row gap-3">
         {actions.map((action) => (
            <TouchableOpacity
               key={action.label}
               onPress={action.onPress}
               activeOpacity={0.75}
               className="flex-1 items-center gap-2 bg-surface-container rounded-2xl py-4 border border-outline/10 active:scale-95"
            >
               <View className={`w-10 h-10 rounded-xl items-center justify-center ${action.bg}`}>
                  <MaterialCommunityIcons
                     name={action.icon as any}
                     size={20}
                     color={action.color}
                  />
                  {/* Badge */}
                  {action.badge !== undefined && action.badge > 0 && (
                     <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary items-center justify-center border border-surface-container">
                        <Typography className="text-background text-[9px] font-black">
                           {action.badge > 9 ? "9+" : action.badge}
                        </Typography>
                     </View>
                  )}
               </View>
               <Typography className="text-secondary-300 text-[10px] font-bold uppercase tracking-widest">
                  {action.label}
               </Typography>
            </TouchableOpacity>
         ))}
      </View>
   );
};
